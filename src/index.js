// @flow

const msgpack = require('msgpack5')();

function encode(o: {value: any}) {
  return msgpack.encode(o.value);
}

function encodeEmpty() {
  return Buffer.from([]);
}

class Credentials {
  constructor(value:Object) {
    this.value = value;
  }
  declare value: Object;
}

function decodeCredentials(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new Credentials(value);
}

class CredentialsResponse {
  constructor(value:{success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {success: boolean, code: number, message: string};
}

function decodeCredentialsResponse(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new CredentialsResponse(value);
}

class PeerSync {
  constructor(id:number, data:DataDump, peers:PeerDump, providers:ProviderDump, receivers:ReceiverDump, activeProviders: ActiveProviderDump, peerSubscriptions: PeerSubscriptionDump) {
    this.id = id;
    this.data = data;
    this.peers = peers;
    this.providers = providers;
    this.receivers = receivers;
    this.activeProviders = activeProviders;
    this.peerSubscriptions = peerSubscriptions;
  }
  declare id: number;
  declare data: DataDump;
  declare peers: PeerDump;
  declare providers: ProviderDump;
  declare receivers: ReceiverDump;
  declare activeProviders: ActiveProviderDump;
  declare peerSubscriptions: PeerSubscriptionDump;
}

function decodePeerSync(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PeerSync(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5], decoded[6]);
}

function encodePeerSync(peerSync: PeerSync) {
  return msgpack.encode([peerSync.id, peerSync.data, peerSync.peers, peerSync.providers, peerSync.receivers, peerSync.activeProviders, peerSync.peerSubscriptions]);
}

class PeerSyncResponse {
  constructor(value:number) {
    this.value = value;
  }
  declare value: number;
}

function decodePeerSyncResponse(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new PeerSyncResponse(value);
}

class DataDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeDataDump(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new DataDump(decoded[0], decoded[1]);
}

function encodeDataDump(dump: DataDump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodePeerDump(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PeerDump(decoded[0], decoded[1]);
}

function encodePeerDump(dump: PeerDump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class ProviderDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeProviderDump(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new ProviderDump(decoded[0], decoded[1]);
}

function encodeProviderDump(dump: ProviderDump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class ActiveProviderDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeActiveProviderDump(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new ActiveProviderDump(decoded[0], decoded[1]);
}

function encodeActiveProviderDump(dump: ActiveProviderDump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerSubscriptionDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodePeerSubscriptionDump(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PeerSubscriptionDump(decoded[0], decoded[1]);
}

function encodePeerSubscriptionDump(dump: PeerSubscriptionDump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerRequest {
  constructor(value:number) {
    this.value = value;
  }
  declare value: number;
}

function decodePeerRequest(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new PeerRequest(value);
}

class PeerResponse {
  constructor(value:{id?:number, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {id?:number, success: boolean, code: number, message: string};
}

function decodePeerResponse(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new PeerResponse(value);
}

class Unpeer {}

function decodeUnpeer() {
  return new Unpeer();
}

class SubscribeRequest {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeSubscribeRequest(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new SubscribeRequest(value);
}

class SubscribeResponse {
  constructor(value:{key:string, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {key:string, success: boolean, code: number, message: string};
}

function decodeSubscribeResponse(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new SubscribeResponse(value);
}

class Unsubscribe {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeUnsubscribe(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new Unsubscribe(value);
}

class EventSubscribeRequest {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeEventSubscribeRequest(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new EventSubscribeRequest(value);
}

class EventSubscribeResponse {
  constructor(value:{name:string, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {name:string, success: boolean, code: number, message: string};
}

function decodeEventSubscribeResponse(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new EventSubscribeResponse(value);
}

class EventUnsubscribe {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeEventUnsubscribe(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new EventUnsubscribe(value);
}

class BraidEvent {
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

function decodeBraidEvent(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new BraidEvent(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeBraidEvent(event: BraidEvent) {
  return msgpack.encode([event.name, event.args, event.id, event.ids]);
}


class ReceiverDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodeReceiverDump(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new ReceiverDump(decoded[0], decoded[1]);
}

function encodeReceiverDump(dump: ReceiverDump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerPublisherDump {
  constructor(queue:[Array<*>, Array<*>], ids?:Array<number> = []) {
    this.queue = queue;
    this.ids = ids;
  }
  declare queue:[Array<*>, Array<*>];
  declare ids:Array<number>;
}

function decodePeerPublisherDump(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PeerPublisherDump(decoded[0], decoded[1]);
}

function encodePeerPublisherDump(dump: PeerPublisherDump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PublishRequest {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodePublishRequest(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new PublishRequest(value);
}

class PublishResponse {
  constructor(value:{key:string, success: boolean, code: number, message: string}) {
    this.value = value;
  }
  declare value: {key:string, success: boolean, code: number, message: string};
}

function decodePublishResponse(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new PublishResponse(value);
}

class Unpublish {
  constructor(value:string) {
    this.value = value;
  }
  declare value: string;
}

function decodeUnpublish(buffer: Buffer) {
  const value = msgpack.decode(buffer);
  return new Unpublish(value);
}

class PublisherOpen {
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

function decodePublisherOpen(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PublisherOpen(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodePublisherOpen(message: PublisherOpen) {
  return msgpack.encode([message.regexString, message.key, message.socketId, message.credentials]);
}

class PublisherClose {
  constructor(key:string, socketId:number) {
    this.key = key;
    this.socketId = socketId;
  }
  declare key:string;
  declare socketId:number;
}

function decodePublisherClose(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PublisherClose(decoded[0], decoded[1]);
}

function encodePublisherClose(message: PublisherClose) {
  return msgpack.encode([message.key, message.socketId]);
}

class PublisherMessage {
  constructor(key:string, message: any) {
    this.key = key;
    this.message = message;
  }
  declare key:string;
  declare message:any;
}

function decodePublisherMessage(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PublisherMessage(decoded[0], decoded[1]);
}

function encodePublisherMessage(message: PublisherMessage) {
  return msgpack.encode([message.key, message.message]);
}

class PublisherPeerMessage {
  constructor(key:string, socketId:number, message: any) {
    this.key = key;
    this.socketId = socketId;
    this.message = message;
  }
  declare key:string;
  declare socketId:number;
  declare message:any;
}

function decodePublisherPeerMessage(buffer: Buffer) {
  const decoded = msgpack.decode(buffer);
  return new PublisherPeerMessage(decoded[0], decoded[1], decoded[2]);
}

function encodePublisherPeerMessage(message: PublisherPeerMessage) {
  return msgpack.encode([message.key, message.socketId, message.message]);
}

msgpack.register(0x1, Credentials, encode, decodeCredentials);
msgpack.register(0x2, CredentialsResponse, encode, decodeCredentialsResponse);

msgpack.register(0x3, DataDump, encodeDataDump, decodeDataDump);
msgpack.register(0x4, ProviderDump, encodeProviderDump, decodeProviderDump);
msgpack.register(0x5, ActiveProviderDump, encodeActiveProviderDump, decodeActiveProviderDump);
msgpack.register(0x6, PeerDump, encodePeerDump, decodePeerDump);
msgpack.register(0x7, PeerSubscriptionDump, encodePeerSubscriptionDump, decodePeerSubscriptionDump);

msgpack.register(0x8, PeerSync, encodePeerSync, decodePeerSync);
msgpack.register(0x9, PeerSyncResponse, encode, decodePeerSyncResponse);

msgpack.register(0x10, PeerRequest, encode, decodePeerRequest);
msgpack.register(0x11, PeerResponse, encode, decodePeerResponse);
msgpack.register(0x12, Unpeer, encodeEmpty, decodeUnpeer);

msgpack.register(0x20, SubscribeRequest, encode, decodeSubscribeRequest);
msgpack.register(0x21, SubscribeResponse, encode, decodeSubscribeResponse);
msgpack.register(0x22, Unsubscribe, encode, decodeUnsubscribe);
msgpack.register(0x23, EventSubscribeRequest, encode, decodeEventSubscribeRequest);
msgpack.register(0x24, EventSubscribeResponse, encode, decodeEventSubscribeResponse);
msgpack.register(0x25, EventUnsubscribe, encode, decodeEventUnsubscribe);
msgpack.register(0x26, BraidEvent, encodeBraidEvent, decodeBraidEvent);

msgpack.register(0x30, ReceiverDump, encodeReceiverDump, decodeReceiverDump);
msgpack.register(0x31, PeerPublisherDump, encodePeerPublisherDump, decodePeerPublisherDump);
msgpack.register(0x32, PublishRequest, encode, decodePublishRequest);
msgpack.register(0x33, PublishResponse, encode, decodePublishResponse);
msgpack.register(0x34, Unpublish, encode, decodeUnpublish);
msgpack.register(0x35, PublisherOpen, encodePublisherOpen, decodePublisherOpen);
msgpack.register(0x36, PublisherClose, encodePublisherClose, decodePublisherClose);
msgpack.register(0x37, PublisherMessage, encodePublisherMessage, decodePublisherMessage);
msgpack.register(0x38, PublisherPeerMessage, encodePublisherPeerMessage, decodePublisherPeerMessage);

module.exports.DataDump = DataDump;
module.exports.ProviderDump = ProviderDump;
module.exports.ActiveProviderDump = ActiveProviderDump;
module.exports.PeerDump = PeerDump;
module.exports.PeerSubscriptionDump = PeerSubscriptionDump;
module.exports.PeerSync = PeerSync;
module.exports.PeerSyncResponse = PeerSyncResponse;
module.exports.Credentials = Credentials;
module.exports.CredentialsResponse = CredentialsResponse;
module.exports.SubscribeRequest = SubscribeRequest;
module.exports.SubscribeResponse = SubscribeResponse;
module.exports.Unsubscribe = Unsubscribe;
module.exports.EventSubscribeRequest = EventSubscribeRequest;
module.exports.EventSubscribeResponse = EventSubscribeResponse;
module.exports.EventUnsubscribe = EventUnsubscribe;
module.exports.BraidEvent = BraidEvent;
module.exports.PeerRequest = PeerRequest;
module.exports.PeerResponse = PeerResponse;
module.exports.Unpeer = Unpeer;
module.exports.ReceiverDump = ReceiverDump;
module.exports.PublisherOpen = PublisherOpen;
module.exports.PublisherClose = PublisherClose;
module.exports.PublisherMessage = PublisherMessage;
module.exports.PublisherPeerMessage = PublisherPeerMessage;
module.exports.PeerPublisherDump = PeerPublisherDump;
module.exports.PublishRequest = PublishRequest;
module.exports.PublishResponse = PublishResponse;
module.exports.Unpublish = Unpublish;
module.exports.encode = msgpack.encode;
module.exports.decode = msgpack.decode;
module.exports.getArrayBuffer = (b: Buffer) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
