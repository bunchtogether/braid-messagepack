// @flow

import {
  addExtension,
  pack,
  unpack,
  isNativeAccelerationEnabled,
} from 'msgpackr';

function defaultEncode(o: {value: any}) {
  return o.value;
}

function encodeEmpty() {
  return [];
}

export class Credentials {
  constructor(value:Object) {
    this.value = value;
  }
  declare value: Object;
}

function decodeCredentials(value: Object) {
  return new Credentials(value);
}

export class CredentialsResponse {
  constructor(value:{success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {success: boolean, code: number, message: string};
}

function decodeCredentialsResponse(value: {success: boolean, code: number, message: string}) {
  return new CredentialsResponse(value);
}

export class PeerSync {
  constructor(id:number, peers:PeerDump, providers:ProviderDump, receivers:ReceiverDump, activeProviders: ActiveProviderDump, peerSubscriptions: PeerSubscriptionDump) {
    this.id = id;
    this.peers = peers;
    this.providers = providers;
    this.receivers = receivers;
    this.activeProviders = activeProviders;
    this.peerSubscriptions = peerSubscriptions;
  }
  declare id: number;
  declare peers: PeerDump;
  declare providers: ProviderDump;
  declare receivers: ReceiverDump;
  declare activeProviders: ActiveProviderDump;
  declare peerSubscriptions: PeerSubscriptionDump;
}

function decodePeerSync(decoded: [number, PeerDump, ProviderDump, ReceiverDump, ActiveProviderDump, PeerSubscriptionDump]) {
  return new PeerSync(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5]);
}

function encodePeerSync(peerSync: PeerSync) {
  return [peerSync.id, peerSync.peers, peerSync.providers, peerSync.receivers, peerSync.activeProviders, peerSync.peerSubscriptions];
}

export class PeerSyncResponse {
  constructor(value:number) {
    this.value = value;
  }
  declare value: number;
}

function decodePeerSyncResponse(value:number) {
  return new PeerSyncResponse(value);
}

let incrementedChunkId = (Math.random() * 4294967296) >>> 0;

export class MergeChunksPromise extends Promise<Buffer> {
  declare chunkCallbacks: Array<(MultipartContainer) => void>;
  constructor(timeoutDuration: number) {
    const chunkCallbacks = [];
    super((resolve, reject) => {
      let id;
      let merged;
      let bytesReceived = 0;
      const timeoutHandler = () => {
        reject(new Error(`MultipartContainer chunk timeout error after ${timeoutDuration}ms`));
      };
      let timeout = setTimeout(timeoutHandler, timeoutDuration);
      const addChunk = (multipartContainer:MultipartContainer) => {
        if (typeof id === 'undefined' || typeof merged === 'undefined') {
          id = multipartContainer.id;
          merged = Buffer.alloc(multipartContainer.length);
        } else if (multipartContainer.id !== id) {
          return;
        }
        clearTimeout(timeout);
        multipartContainer.buffer.copy(merged, multipartContainer.position);
        bytesReceived += multipartContainer.buffer.length;
        if (bytesReceived < multipartContainer.length) {
          timeout = setTimeout(timeoutHandler, timeoutDuration);
          return;
        }
        resolve(merged);
      };
      chunkCallbacks.push(addChunk);
    });
    this.chunkCallbacks = chunkCallbacks;
  }

  push(multipartContainer:MultipartContainer) {
    for (const chunkCallback of this.chunkCallbacks) {
      chunkCallback(multipartContainer);
    }
  }

  // $FlowFixMe
  static get [Symbol.species]() {
    return Promise;
  }

  // $FlowFixMe
  get [Symbol.toStringTag]() {
    return 'MergeChunksPromise';
  }
}

export class MultipartContainer {
  static chunk: (Buffer, number) => Array<Buffer>;
  static getMergeChunksPromise: (number) => MergeChunksPromise;

  constructor(id:number, position:number, length: number, buffer:Buffer) {
    this.id = id;
    this.position = position;
    this.length = length;
    this.buffer = buffer;
  }
  declare id:number;
  declare position:number;
  declare length:number;
  declare buffer:Buffer;
}

MultipartContainer.chunk = (buffer:Buffer, size:number) => {
  const chunks = [];
  for (let i = 0; i * size < buffer.length; i += 1) {
    const slice = buffer.slice(i * size, (i + 1) * size);
    chunks.push(pack(new MultipartContainer(incrementedChunkId, i * size, buffer.length, slice)));
  }
  incrementedChunkId += 1;
  if (incrementedChunkId > 4294967294) {
    incrementedChunkId = 0;
  }
  return chunks;
};

MultipartContainer.getMergeChunksPromise = (timeoutDuration: number) => new MergeChunksPromise(timeoutDuration);

function decodeMultipartContainer(buffer: Buffer) {
  const id = buffer.readUInt32BE(0);
  const position = buffer.readUInt32BE(4);
  const length = buffer.readUInt32BE(8);
  return new MultipartContainer(id, position, length, buffer.slice(12));
}

function encodeMultipartContainer(multipartContainer: MultipartContainer) {
  const buffer = Buffer.allocUnsafe(multipartContainer.buffer.length + 12);
  buffer.writeUInt32BE(multipartContainer.id, 0);
  buffer.writeUInt32BE(multipartContainer.position, 4);
  buffer.writeUInt32BE(multipartContainer.length, 8);
  multipartContainer.buffer.copy(buffer, 12);
  return buffer;
}

export class DataDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeDataDump(decoded: [[Array<*>, Array<*>], Array<number>]) {
  return new DataDump(decoded[0], decoded[1]);
}

function encodeDataDump(dump: DataDump) {
  return [dump.queue, dump.ids];
}

export class DataSyncInsertions {
  constructor(insertions: Array<*>) {
    this.insertions = insertions;
  }
  declare insertions:Array<*>;
}

function decodeDataSyncInsertions(decoded: Array<*>) {
  return new DataSyncInsertions(decoded);
}

function encodeDataSyncInsertions(dataSync: DataSyncInsertions) {
  return dataSync.insertions;
}

export class DataSyncDeletions {
  constructor(deletions: Array<*>) {
    this.deletions = deletions;
  }
  declare deletions:Array<*>;
}

function decodeDataSyncDeletions(decoded: Array<*>) {
  return new DataSyncDeletions(decoded);
}

function encodeDataSyncDeletions(dataSync: DataSyncDeletions) {
  return dataSync.deletions;
}

export class PeerDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodePeerDump(decoded:[[Array<*>, Array<*>], Array<number>]) {
  return new PeerDump(decoded[0], decoded[1]);
}

function encodePeerDump(dump: PeerDump) {
  return [dump.queue, dump.ids];
}

export class ProviderDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeProviderDump(decoded:[[Array<*>, Array<*>], Array<number>]) {
  return new ProviderDump(decoded[0], decoded[1]);
}

function encodeProviderDump(dump: ProviderDump) {
  return [dump.queue, dump.ids];
}

export class ActiveProviderDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeActiveProviderDump(decoded:[[Array<*>, Array<*>], Array<number>]) {
  return new ActiveProviderDump(decoded[0], decoded[1]);
}

function encodeActiveProviderDump(dump: ActiveProviderDump) {
  return [dump.queue, dump.ids];
}

export class PeerSubscriptionDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodePeerSubscriptionDump(decoded:[[Array<*>, Array<*>], Array<number>]) {
  return new PeerSubscriptionDump(decoded[0], decoded[1]);
}

function encodePeerSubscriptionDump(dump: PeerSubscriptionDump) {
  return [dump.queue, dump.ids];
}

export class PeerRequest {
  constructor(value:number) {
    this.value = value;
  }
  declare value: number;
}

function decodePeerRequest(value:number) {
  return new PeerRequest(value);
}

export class PeerResponse {
  constructor(value:{id?:number, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {id?:number, success: boolean, code: number, message: string};
}

function decodePeerResponse(value: {id?:number, success: boolean, code: number, message: string}) {
  return new PeerResponse(value);
}

export class Unpeer {}

function decodeUnpeer() {
  return new Unpeer();
}

export class SubscribeRequest {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeSubscribeRequest(value:string) {
  return new SubscribeRequest(value);
}

export class SubscribeResponse {
  constructor(value:{key:string, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {key:string, success: boolean, code: number, message: string};
}

function decodeSubscribeResponse(value: {key:string, success: boolean, code: number, message: string}) {
  return new SubscribeResponse(value);
}

export class Unsubscribe {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeUnsubscribe(value:string) {
  return new Unsubscribe(value);
}

export class EventSubscribeRequest {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeEventSubscribeRequest(value:string) {
  return new EventSubscribeRequest(value);
}

export class EventSubscribeResponse {
  constructor(value:{name:string, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {name:string, success: boolean, code: number, message: string};
}

function decodeEventSubscribeResponse(value:{name:string, success: boolean, code: number, message: string}) {
  return new EventSubscribeResponse(value);
}

export class EventUnsubscribe {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeEventUnsubscribe(value:string) {
  return new EventUnsubscribe(value);
}

export class BraidEvent {
  constructor(name: string, args:Array<any>, id:string, ids?:Array<number> = []) {
    this.name = name;
    this.args = args;
    this.id = id;
    this.ids = ids;
  }
  declare name: string;
  declare args: Array<any>;
  declare id: string;
  declare ids:Array<number>;
}

function decodeBraidEvent(decoded: [string, Array<any>, string, Array<number>]) {
  return new BraidEvent(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeBraidEvent(event: BraidEvent) {
  return [event.name, event.args, event.id, event.ids];
}

export class ReceiverDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeReceiverDump(decoded: [[Array<*>, Array<*>], Array<number>]) {
  return new ReceiverDump(decoded[0], decoded[1]);
}

function encodeReceiverDump(dump: ReceiverDump) {
  return [dump.queue, dump.ids];
}

export class PeerPublisherDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodePeerPublisherDump(decoded: [[Array<*>, Array<*>], Array<number>]) {
  return new PeerPublisherDump(decoded[0], decoded[1]);
}

function encodePeerPublisherDump(dump: PeerPublisherDump) {
  return [dump.queue, dump.ids];
}

export class PublishRequest {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodePublishRequest(value:string) {
  return new PublishRequest(value);
}

export class PublishResponse {
  constructor(value:{key:string, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {key:string, success: boolean, code: number, message: string};
}

function decodePublishResponse(value:{key:string, success: boolean, code: number, message: string}) {
  return new PublishResponse(value);
}

export class Unpublish {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeUnpublish(value:string) {
  return new Unpublish(value);
}

export class PublisherOpen {
  constructor(regexString:string, key:string, socketId:number, credentials: any) {
    this.regexString = regexString;
    this.key = key;
    this.socketId = socketId;
    this.credentials = credentials;
  }
  declare regexString:string;
  declare key:string;
  declare socketId:number;
  declare credentials:any;
}

function decodePublisherOpen(decoded: [string, string, number, any]) {
  return new PublisherOpen(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodePublisherOpen(message: PublisherOpen) {
  return [message.regexString, message.key, message.socketId, message.credentials];
}

export class PublisherClose {
  constructor(key:string, socketId:number) {
    this.key = key;
    this.socketId = socketId;
  }
  declare key:string;
  declare socketId:number;
}

function decodePublisherClose(decoded: [string, number]) {
  return new PublisherClose(decoded[0], decoded[1]);
}

function encodePublisherClose(message: PublisherClose) {
  return [message.key, message.socketId];
}

export class PublisherMessage {
  constructor(key:string, message: any) {
    this.key = key;
    this.message = message;
  }
  declare key:string;
  declare message:any;
}

function decodePublisherMessage(decoded: [string, any]) {
  return new PublisherMessage(decoded[0], decoded[1]);
}

function encodePublisherMessage(message: PublisherMessage) {
  return [message.key, message.message];
}

export class PublisherPeerMessage {
  constructor(key:string, socketId:number, message: any) {
    this.key = key;
    this.socketId = socketId;
    this.message = message;
  }
  declare key:string;
  declare socketId:number;
  declare message:any;
}

function decodePublisherPeerMessage(decoded: [string, number, any]) {
  return new PublisherPeerMessage(decoded[0], decoded[1], decoded[2]);
}

function encodePublisherPeerMessage(message: PublisherPeerMessage) {
  return [message.key, message.socketId, message.message];
}

addExtension({
  Class: Credentials,
  type: 0x1,
  write: defaultEncode,
  read: decodeCredentials,
});
addExtension({
  Class: CredentialsResponse,
  type: 0x2,
  write: defaultEncode,
  read: decodeCredentialsResponse,
});
addExtension({
  Class: DataDump,
  type: 0x3,
  write: encodeDataDump,
  read: decodeDataDump,
});
addExtension({
  Class: ProviderDump,
  type: 0x4,
  write: encodeProviderDump,
  read: decodeProviderDump,
});
addExtension({
  Class: ActiveProviderDump,
  type: 0x5,
  write: encodeActiveProviderDump,
  read: decodeActiveProviderDump,
});
addExtension({
  Class: PeerDump,
  type: 0x6,
  write: encodePeerDump,
  read: decodePeerDump,
});
addExtension({
  Class: PeerSubscriptionDump,
  type: 0x7,
  write: encodePeerSubscriptionDump,
  read: decodePeerSubscriptionDump,
});
addExtension({
  Class: PeerSync,
  type: 0x8,
  write: encodePeerSync,
  read: decodePeerSync,
});
addExtension({
  Class: PeerSyncResponse,
  type: 0x9,
  write: defaultEncode,
  read: decodePeerSyncResponse,
});
addExtension({
  Class: PeerRequest,
  type: 0x10,
  write: defaultEncode,
  read: decodePeerRequest,
});
addExtension({
  Class: PeerResponse,
  type: 0x11,
  write: defaultEncode,
  read: decodePeerResponse,
});
addExtension({
  Class: Unpeer,
  type: 0x12,
  write: encodeEmpty,
  read: decodeUnpeer,
});

addExtension({
  Class: SubscribeRequest,
  type: 0x20,
  write: defaultEncode,
  read: decodeSubscribeRequest,
});
addExtension({
  Class: SubscribeResponse,
  type: 0x21,
  write: defaultEncode,
  read: decodeSubscribeResponse,
});
addExtension({
  Class: Unsubscribe,
  type: 0x22,
  write: defaultEncode,
  read: decodeUnsubscribe,
});
addExtension({
  Class: EventSubscribeRequest,
  type: 0x23,
  write: defaultEncode,
  read: decodeEventSubscribeRequest,
});
addExtension({
  Class: EventSubscribeResponse,
  type: 0x24,
  write: defaultEncode,
  read: decodeEventSubscribeResponse,
});
addExtension({
  Class: EventUnsubscribe,
  type: 0x25,
  write: defaultEncode,
  read: decodeEventUnsubscribe,
});
addExtension({
  Class: BraidEvent,
  type: 0x26,
  write: encodeBraidEvent,
  read: decodeBraidEvent,
});
addExtension({
  Class: ReceiverDump,
  type: 0x30,
  write: encodeReceiverDump,
  read: decodeReceiverDump,
});
addExtension({
  Class: PeerPublisherDump,
  type: 0x31,
  write: encodePeerPublisherDump,
  read: decodePeerPublisherDump,
});
addExtension({
  Class: PublishRequest,
  type: 0x32,
  write: defaultEncode,
  read: decodePublishRequest,
});
addExtension({
  Class: PublishResponse,
  type: 0x33,
  write: defaultEncode,
  read: decodePublishResponse,
});
addExtension({
  Class: Unpublish,
  type: 0x34,
  write: defaultEncode,
  read: decodeUnpublish,
});
addExtension({
  Class: PublisherOpen,
  type: 0x35,
  write: encodePublisherOpen,
  read: decodePublisherOpen,
});
addExtension({
  Class: PublisherClose,
  type: 0x36,
  write: encodePublisherClose,
  read: decodePublisherClose,
});
addExtension({
  Class: PublisherMessage,
  type: 0x37,
  write: encodePublisherMessage,
  read: decodePublisherMessage,
});
addExtension({
  Class: PublisherPeerMessage,
  type: 0x38,
  write: encodePublisherPeerMessage,
  read: decodePublisherPeerMessage,
});
addExtension({
  Class: MultipartContainer,
  type: 0x40,
  pack: encodeMultipartContainer,
  unpack: decodeMultipartContainer,
});
addExtension({
  Class: DataSyncInsertions,
  type: 0x41,
  write: encodeDataSyncInsertions,
  read: decodeDataSyncInsertions,
});
addExtension({
  Class: DataSyncDeletions,
  type: 0x42,
  write: encodeDataSyncDeletions,
  read: decodeDataSyncDeletions,
});

export { isNativeAccelerationEnabled };
export const encode = pack;
export const decode = unpack;

