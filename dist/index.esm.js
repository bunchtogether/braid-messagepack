function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { addExtension, pack, unpack, isNativeAccelerationEnabled } from 'msgpackr';

function defaultEncode(o) {
  return o.value;
}

function encodeEmpty() {
  return [];
}

export class Credentials {
  constructor(value) {
    this.value = value;
  }

}

function decodeCredentials(value) {
  return new Credentials(value);
}

export class CredentialsResponse {
  constructor(value) {
    this.value = value;
  }

}

function decodeCredentialsResponse(value) {
  return new CredentialsResponse(value);
}

export class PeerSync {
  constructor(id, peers, providers, receivers, activeProviders, peerSubscriptions, customMapDumps, customSetDumps) {
    this.id = id;
    this.peers = peers;
    this.providers = providers;
    this.receivers = receivers;
    this.activeProviders = activeProviders;
    this.peerSubscriptions = peerSubscriptions;
    this.customMapDumps = customMapDumps;
    this.customSetDumps = customSetDumps;
  }

}

function decodePeerSync(decoded) {
  return new PeerSync(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5], decoded[6], decoded[7]);
}

function encodePeerSync(peerSync) {
  return [peerSync.id, peerSync.peers, peerSync.providers, peerSync.receivers, peerSync.activeProviders, peerSync.peerSubscriptions, peerSync.customMapDumps, peerSync.customSetDumps];
}

export class PeerSyncResponse {
  constructor(value) {
    this.value = value;
  }

}

function decodePeerSyncResponse(value) {
  return new PeerSyncResponse(value);
}

let incrementedChunkId = Math.random() * 4294967296 >>> 0;
export class MergeChunksPromise extends Promise {
  constructor(timeoutDuration) {
    const chunkCallbacks = [];
    super((resolve, reject) => {
      let id;
      let merged;
      let bytesReceived = 0;

      const timeoutHandler = () => {
        reject(new Error(`MultipartContainer chunk timeout error after ${timeoutDuration}ms`));
      };

      let timeout = setTimeout(timeoutHandler, timeoutDuration);

      const addChunk = multipartContainer => {
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

  push(multipartContainer) {
    for (const chunkCallback of this.chunkCallbacks) {
      chunkCallback(multipartContainer);
    }
  } // $FlowFixMe


  static get [Symbol.species]() {
    return Promise;
  } // $FlowFixMe


  get [Symbol.toStringTag]() {
    return 'MergeChunksPromise';
  }

}
export class MultipartContainer {
  constructor(id, position, length, buffer) {
    this.id = id;
    this.position = position;
    this.length = length;
    this.buffer = buffer;
  }

}

_defineProperty(MultipartContainer, "chunk", void 0);

_defineProperty(MultipartContainer, "getMergeChunksPromise", void 0);

MultipartContainer.chunk = (buffer, size) => {
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

MultipartContainer.getMergeChunksPromise = timeoutDuration => new MergeChunksPromise(timeoutDuration);

function decodeMultipartContainer(buffer) {
  const id = buffer.readUInt32BE(0);
  const position = buffer.readUInt32BE(4);
  const length = buffer.readUInt32BE(8);
  return new MultipartContainer(id, position, length, buffer.slice(12));
}

function encodeMultipartContainer(multipartContainer) {
  const buffer = Buffer.allocUnsafe(multipartContainer.buffer.length + 12);
  buffer.writeUInt32BE(multipartContainer.id, 0);
  buffer.writeUInt32BE(multipartContainer.position, 4);
  buffer.writeUInt32BE(multipartContainer.length, 8);
  multipartContainer.buffer.copy(buffer, 12);
  return buffer;
}

export class DataDump {
  constructor(queue, ids = []) {
    this.queue = queue;
    this.ids = ids;
  }

}

function decodeDataDump(decoded) {
  return new DataDump(decoded[0], decoded[1]);
}

function encodeDataDump(dump) {
  return [dump.queue, dump.ids];
}

export class DataSyncInsertions {
  constructor(insertions) {
    this.insertions = insertions;
  }

}

function decodeDataSyncInsertions(decoded) {
  return new DataSyncInsertions(decoded);
}

function encodeDataSyncInsertions(dataSync) {
  return dataSync.insertions;
}

export class DataSyncDeletions {
  constructor(deletions) {
    this.deletions = deletions;
  }

}

function decodeDataSyncDeletions(decoded) {
  return new DataSyncDeletions(decoded);
}

function encodeDataSyncDeletions(dataSync) {
  return dataSync.deletions;
}

export class PeerDump {
  constructor(queue, ids = []) {
    this.queue = queue;
    this.ids = ids;
  }

}

function decodePeerDump(decoded) {
  return new PeerDump(decoded[0], decoded[1]);
}

function encodePeerDump(dump) {
  return [dump.queue, dump.ids];
}

export class ProviderDump {
  constructor(queue, ids = []) {
    this.queue = queue;
    this.ids = ids;
  }

}

function decodeProviderDump(decoded) {
  return new ProviderDump(decoded[0], decoded[1]);
}

function encodeProviderDump(dump) {
  return [dump.queue, dump.ids];
}

export class ActiveProviderDump {
  constructor(queue, ids = []) {
    this.queue = queue;
    this.ids = ids;
  }

}

function decodeActiveProviderDump(decoded) {
  return new ActiveProviderDump(decoded[0], decoded[1]);
}

function encodeActiveProviderDump(dump) {
  return [dump.queue, dump.ids];
}

export class PeerSubscriptionDump {
  constructor(queue, ids = []) {
    this.queue = queue;
    this.ids = ids;
  }

}

function decodePeerSubscriptionDump(decoded) {
  return new PeerSubscriptionDump(decoded[0], decoded[1]);
}

function encodePeerSubscriptionDump(dump) {
  return [dump.queue, dump.ids];
}

export class PeerRequest {
  constructor(value) {
    this.value = value;
  }

}

function decodePeerRequest(value) {
  return new PeerRequest(value);
}

export class PeerResponse {
  constructor(value) {
    this.value = value;
  }

}

function decodePeerResponse(value) {
  return new PeerResponse(value);
}

export class Unpeer {}

function decodeUnpeer() {
  return new Unpeer();
}

export class SubscribeRequest {
  constructor(value) {
    this.value = value;
  }

}

function decodeSubscribeRequest(value) {
  return new SubscribeRequest(value);
}

export class SubscribeResponse {
  constructor(value) {
    this.value = value;
  }

}

function decodeSubscribeResponse(value) {
  return new SubscribeResponse(value);
}

export class Unsubscribe {
  constructor(value) {
    this.value = value;
  }

}

function decodeUnsubscribe(value) {
  return new Unsubscribe(value);
}

export class EventSubscribeRequest {
  constructor(value) {
    this.value = value;
  }

}

function decodeEventSubscribeRequest(value) {
  return new EventSubscribeRequest(value);
}

export class EventSubscribeResponse {
  constructor(value) {
    this.value = value;
  }

}

function decodeEventSubscribeResponse(value) {
  return new EventSubscribeResponse(value);
}

export class EventUnsubscribe {
  constructor(value) {
    this.value = value;
  }

}

function decodeEventUnsubscribe(value) {
  return new EventUnsubscribe(value);
}

export class BraidEvent {
  constructor(name, args, id, ids = []) {
    this.name = name;
    this.args = args;
    this.id = id;
    this.ids = ids;
  }

}

function decodeBraidEvent(decoded) {
  return new BraidEvent(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeBraidEvent(event) {
  return [event.name, event.args, event.id, event.ids];
}

export class BraidSocketEvent {
  constructor(name, args, peerId, socketId, id, ids = []) {
    this.name = name;
    this.args = args;
    this.peerId = peerId;
    this.socketId = socketId;
    this.id = id;
    this.ids = ids;
  }

}

function decodeBraidSocketEvent(decoded) {
  return new BraidSocketEvent(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5]);
}

function encodeBraidSocketEvent(event) {
  return [event.name, event.args, event.peerId, event.socketId, event.id, event.ids];
}

export class ReceiverDump {
  constructor(queue, ids = []) {
    this.queue = queue;
    this.ids = ids;
  }

}

function decodeReceiverDump(decoded) {
  return new ReceiverDump(decoded[0], decoded[1]);
}

function encodeReceiverDump(dump) {
  return [dump.queue, dump.ids];
}

export class PeerPublisherDump {
  constructor(queue, ids = []) {
    this.queue = queue;
    this.ids = ids;
  }

}

function decodePeerPublisherDump(decoded) {
  return new PeerPublisherDump(decoded[0], decoded[1]);
}

function encodePeerPublisherDump(dump) {
  return [dump.queue, dump.ids];
}

export class PublishRequest {
  constructor(value) {
    this.value = value;
  }

}

function decodePublishRequest(value) {
  return new PublishRequest(value);
}

export class PublishResponse {
  constructor(value) {
    this.value = value;
  }

}

function decodePublishResponse(value) {
  return new PublishResponse(value);
}

export class Unpublish {
  constructor(value) {
    this.value = value;
  }

}

function decodeUnpublish(value) {
  return new Unpublish(value);
}

export class PublisherOpen {
  constructor(regexString, key, serverId, socketId, credentials) {
    this.regexString = regexString;
    this.key = key;
    this.serverId = serverId;
    this.socketId = socketId;
    this.credentials = credentials;
  }

}

function decodePublisherOpen(decoded) {
  return new PublisherOpen(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4]);
}

function encodePublisherOpen(message) {
  return [message.regexString, message.key, message.serverId, message.socketId, message.credentials];
}

export class PublisherClose {
  constructor(key, serverId, socketId) {
    this.key = key;
    this.serverId = serverId;
    this.socketId = socketId;
  }

}

function decodePublisherClose(decoded) {
  return new PublisherClose(decoded[0], decoded[1], decoded[2]);
}

function encodePublisherClose(message) {
  return [message.key, message.serverId, message.socketId];
}

export class PublisherMessage {
  constructor(key, message) {
    this.key = key;
    this.message = message;
  }

}

function decodePublisherMessage(decoded) {
  return new PublisherMessage(decoded[0], decoded[1]);
}

function encodePublisherMessage(message) {
  return [message.key, message.message];
}

export class PublisherPeerMessage {
  constructor(key, serverId, socketId, message) {
    this.key = key;
    this.serverId = serverId;
    this.socketId = socketId;
    this.message = message;
  }

}

function decodePublisherPeerMessage(decoded) {
  return new PublisherPeerMessage(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodePublisherPeerMessage(message) {
  return [message.key, message.serverId, message.socketId, message.message];
}

export class CustomMapDump {
  constructor(name, queue, ids = []) {
    this.name = name;
    this.queue = queue;
    this.ids = ids;
  }

}

function decodeCustomMapDump(decoded) {
  return new CustomMapDump(decoded[0], decoded[1], decoded[2]);
}

function encodeCustomMapDump(dump) {
  return [dump.name, dump.queue, dump.ids];
}

export class CustomSetDump {
  constructor(name, queue, ids = []) {
    this.name = name;
    this.queue = queue;
    this.ids = ids;
  }

}

function decodeCustomSetDump(decoded) {
  return new CustomSetDump(decoded[0], decoded[1], decoded[2]);
}

function encodeCustomSetDump(dump) {
  return [dump.name, dump.queue, dump.ids];
}

addExtension({
  Class: Credentials,
  type: 0x1,
  write: defaultEncode,
  read: decodeCredentials
});
addExtension({
  Class: CredentialsResponse,
  type: 0x2,
  write: defaultEncode,
  read: decodeCredentialsResponse
});
addExtension({
  Class: DataDump,
  type: 0x3,
  write: encodeDataDump,
  read: decodeDataDump
});
addExtension({
  Class: ProviderDump,
  type: 0x4,
  write: encodeProviderDump,
  read: decodeProviderDump
});
addExtension({
  Class: ActiveProviderDump,
  type: 0x5,
  write: encodeActiveProviderDump,
  read: decodeActiveProviderDump
});
addExtension({
  Class: PeerDump,
  type: 0x6,
  write: encodePeerDump,
  read: decodePeerDump
});
addExtension({
  Class: PeerSubscriptionDump,
  type: 0x7,
  write: encodePeerSubscriptionDump,
  read: decodePeerSubscriptionDump
});
addExtension({
  Class: PeerSync,
  type: 0x8,
  write: encodePeerSync,
  read: decodePeerSync
});
addExtension({
  Class: PeerSyncResponse,
  type: 0x9,
  write: defaultEncode,
  read: decodePeerSyncResponse
});
addExtension({
  Class: PeerRequest,
  type: 0x10,
  write: defaultEncode,
  read: decodePeerRequest
});
addExtension({
  Class: PeerResponse,
  type: 0x11,
  write: defaultEncode,
  read: decodePeerResponse
});
addExtension({
  Class: Unpeer,
  type: 0x12,
  write: encodeEmpty,
  read: decodeUnpeer
});
addExtension({
  Class: SubscribeRequest,
  type: 0x20,
  write: defaultEncode,
  read: decodeSubscribeRequest
});
addExtension({
  Class: SubscribeResponse,
  type: 0x21,
  write: defaultEncode,
  read: decodeSubscribeResponse
});
addExtension({
  Class: Unsubscribe,
  type: 0x22,
  write: defaultEncode,
  read: decodeUnsubscribe
});
addExtension({
  Class: EventSubscribeRequest,
  type: 0x23,
  write: defaultEncode,
  read: decodeEventSubscribeRequest
});
addExtension({
  Class: EventSubscribeResponse,
  type: 0x24,
  write: defaultEncode,
  read: decodeEventSubscribeResponse
});
addExtension({
  Class: EventUnsubscribe,
  type: 0x25,
  write: defaultEncode,
  read: decodeEventUnsubscribe
});
addExtension({
  Class: BraidEvent,
  type: 0x26,
  write: encodeBraidEvent,
  read: decodeBraidEvent
});
addExtension({
  Class: ReceiverDump,
  type: 0x30,
  write: encodeReceiverDump,
  read: decodeReceiverDump
});
addExtension({
  Class: PeerPublisherDump,
  type: 0x31,
  write: encodePeerPublisherDump,
  read: decodePeerPublisherDump
});
addExtension({
  Class: PublishRequest,
  type: 0x32,
  write: defaultEncode,
  read: decodePublishRequest
});
addExtension({
  Class: PublishResponse,
  type: 0x33,
  write: defaultEncode,
  read: decodePublishResponse
});
addExtension({
  Class: Unpublish,
  type: 0x34,
  write: defaultEncode,
  read: decodeUnpublish
});
addExtension({
  Class: PublisherOpen,
  type: 0x35,
  write: encodePublisherOpen,
  read: decodePublisherOpen
});
addExtension({
  Class: PublisherClose,
  type: 0x36,
  write: encodePublisherClose,
  read: decodePublisherClose
});
addExtension({
  Class: PublisherMessage,
  type: 0x37,
  write: encodePublisherMessage,
  read: decodePublisherMessage
});
addExtension({
  Class: PublisherPeerMessage,
  type: 0x38,
  write: encodePublisherPeerMessage,
  read: decodePublisherPeerMessage
});
addExtension({
  Class: MultipartContainer,
  type: 0x40,
  pack: encodeMultipartContainer,
  unpack: decodeMultipartContainer
});
addExtension({
  Class: DataSyncInsertions,
  type: 0x41,
  write: encodeDataSyncInsertions,
  read: decodeDataSyncInsertions
});
addExtension({
  Class: DataSyncDeletions,
  type: 0x42,
  write: encodeDataSyncDeletions,
  read: decodeDataSyncDeletions
});
addExtension({
  Class: CustomMapDump,
  type: 0x43,
  write: encodeCustomMapDump,
  read: decodeCustomMapDump
});
addExtension({
  Class: BraidSocketEvent,
  type: 0x44,
  write: encodeBraidSocketEvent,
  read: decodeBraidSocketEvent
});
addExtension({
  Class: CustomSetDump,
  type: 0x45,
  write: encodeCustomSetDump,
  read: decodeCustomSetDump
});
export { isNativeAccelerationEnabled };
export const encode = pack;
export const decode = unpack;

//# sourceMappingURL=index.esm.js.map