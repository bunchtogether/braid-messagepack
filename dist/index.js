//      

const msgpack = require('msgpack5')();

function encode(o              ) {
  return msgpack.encode(o.value);
}

function encodeEmpty() {
  return Buffer.from([]);
}

class Credentials {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodeCredentials(buffer        ) {
  const value = msgpack.decode(buffer);
  return new Credentials(value);
}

class CredentialsResponse {
  constructor(value                                                  ) {
    this.value = value;
  }
                                                                   
}

function decodeCredentialsResponse(buffer        ) {
  const value = msgpack.decode(buffer);
  return new CredentialsResponse(value);
}

class PeerSync {
  constructor(id       , data         , peers         , providers             , receivers             , activeProviders                    , peerSubscriptions                      ) {
    this.id = id;
    this.data = data;
    this.peers = peers;
    this.providers = providers;
    this.receivers = receivers;
    this.activeProviders = activeProviders;
    this.peerSubscriptions = peerSubscriptions;
  }
                     
                         
                          
                                  
                                  
                                              
                                                  
}

function decodePeerSync(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PeerSync(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5], decoded[6]);
}

function encodePeerSync(peerSync          ) {
  return msgpack.encode([peerSync.id, peerSync.data, peerSync.peers, peerSync.providers, peerSync.receivers, peerSync.activeProviders, peerSync.peerSubscriptions]);
}

class PeerSyncResponse {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodePeerSyncResponse(buffer        ) {
  const value = msgpack.decode(buffer);
  return new PeerSyncResponse(value);
}

let incrementedChunkId = (Math.random() * 4294967296) >>> 0;

class MergeChunksPromise extends Promise         {
                                                              
  constructor(timeoutDuration        ) {
    const chunkCallbacks = [];
    super((resolve, reject) => {
      let id;
      let merged;
      let bytesReceived = 0;
      const timeoutHandler = () => {
        reject(new Error(`MultipartContainer chunk timeout error after ${timeoutDuration}ms`));
      };
      let timeout = setTimeout(timeoutHandler, timeoutDuration);
      const addChunk = (multipartContainer                   ) => {
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

  push(multipartContainer                   ) {
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

class MultipartContainer {
  static chunk = (buffer       , size       ) => {
    const chunks = [];
    for (let i = 0; i * size < buffer.length; i += 1) {
      const slice = buffer.slice(i * size, (i + 1) * size);
      chunks.push(msgpack.encode(new MultipartContainer(incrementedChunkId, i * size, buffer.length, slice)));
    }
    incrementedChunkId += 1;
    if (incrementedChunkId > 4294967294) {
      incrementedChunkId = 0;
    }
    return chunks;
  }
  static getMergeChunksPromise = (timeoutDuration        ) => new MergeChunksPromise(timeoutDuration)
  constructor(id       , position       , length        , buffer       ) {
    this.id = id;
    this.position = position;
    this.length = length;
    this.buffer = buffer;
  }
                    
                          
                        
                        
}

function decodeMultipartContainer(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new MultipartContainer(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeMultipartContainer(multipartContainer                    ) {
  return msgpack.encode([multipartContainer.id, multipartContainer.position, multipartContainer.length, multipartContainer.buffer]);
}

class DataDump {
  constructor(queue                     , ids                = []) {
    this.queue = queue;
    this.ids = ids;
  }
                                     
                            
}

function decodeDataDump(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new DataDump(decoded[0], decoded[1]);
}

function encodeDataDump(dump          ) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerDump {
  constructor(queue                     , ids                = []) {
    this.queue = queue;
    this.ids = ids;
  }
                                     
                            
}

function decodePeerDump(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PeerDump(decoded[0], decoded[1]);
}

function encodePeerDump(dump          ) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class ProviderDump {
  constructor(queue                     , ids                = []) {
    this.queue = queue;
    this.ids = ids;
  }
                                     
                            
}

function decodeProviderDump(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new ProviderDump(decoded[0], decoded[1]);
}

function encodeProviderDump(dump              ) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class ActiveProviderDump {
  constructor(queue                     , ids                = []) {
    this.queue = queue;
    this.ids = ids;
  }
                                     
                            
}

function decodeActiveProviderDump(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new ActiveProviderDump(decoded[0], decoded[1]);
}

function encodeActiveProviderDump(dump                    ) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerSubscriptionDump {
  constructor(queue                     , ids                = []) {
    this.queue = queue;
    this.ids = ids;
  }
                                     
                            
}

function decodePeerSubscriptionDump(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PeerSubscriptionDump(decoded[0], decoded[1]);
}

function encodePeerSubscriptionDump(dump                      ) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerRequest {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodePeerRequest(buffer        ) {
  const value = msgpack.decode(buffer);
  return new PeerRequest(value);
}

class PeerResponse {
  constructor(value                                                              ) {
    this.value = value;
  }
                                                                               
}

function decodePeerResponse(buffer        ) {
  const value = msgpack.decode(buffer);
  return new PeerResponse(value);
}

class Unpeer {}

function decodeUnpeer() {
  return new Unpeer();
}

class SubscribeRequest {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodeSubscribeRequest(buffer        ) {
  const value = msgpack.decode(buffer);
  return new SubscribeRequest(value);
}

class SubscribeResponse {
  constructor(value                                                              ) {
    this.value = value;
  }
                                                                               
}

function decodeSubscribeResponse(buffer        ) {
  const value = msgpack.decode(buffer);
  return new SubscribeResponse(value);
}

class Unsubscribe {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodeUnsubscribe(buffer        ) {
  const value = msgpack.decode(buffer);
  return new Unsubscribe(value);
}

class EventSubscribeRequest {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodeEventSubscribeRequest(buffer        ) {
  const value = msgpack.decode(buffer);
  return new EventSubscribeRequest(value);
}

class EventSubscribeResponse {
  constructor(value                                                               ) {
    this.value = value;
  }
                                                                                
}

function decodeEventSubscribeResponse(buffer        ) {
  const value = msgpack.decode(buffer);
  return new EventSubscribeResponse(value);
}

class EventUnsubscribe {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodeEventUnsubscribe(buffer        ) {
  const value = msgpack.decode(buffer);
  return new EventUnsubscribe(value);
}

class BraidEvent {
  constructor(name        , args           , id       , ids                = []) {
    this.name = name;
    this.args = args;
    this.id = id;
    this.ids = ids;
  }
                       
                           
                     
                            
}

function decodeBraidEvent(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new BraidEvent(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeBraidEvent(event            ) {
  return msgpack.encode([event.name, event.args, event.id, event.ids]);
}


class ReceiverDump {
  constructor(queue                     , ids                = []) {
    this.queue = queue;
    this.ids = ids;
  }
                                     
                            
}

function decodeReceiverDump(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new ReceiverDump(decoded[0], decoded[1]);
}

function encodeReceiverDump(dump              ) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PeerPublisherDump {
  constructor(queue                     , ids                = []) {
    this.queue = queue;
    this.ids = ids;
  }
                                     
                            
}

function decodePeerPublisherDump(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PeerPublisherDump(decoded[0], decoded[1]);
}

function encodePeerPublisherDump(dump                   ) {
  return msgpack.encode([dump.queue, dump.ids]);
}

class PublishRequest {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodePublishRequest(buffer        ) {
  const value = msgpack.decode(buffer);
  return new PublishRequest(value);
}

class PublishResponse {
  constructor(value                                                              ) {
    this.value = value;
  }
                                                                               
}

function decodePublishResponse(buffer        ) {
  const value = msgpack.decode(buffer);
  return new PublishResponse(value);
}

class Unpublish {
  constructor(value       ) {
    this.value = value;
  }
                        
}

function decodeUnpublish(buffer        ) {
  const value = msgpack.decode(buffer);
  return new Unpublish(value);
}

class PublisherOpen {
  constructor(regexString       , key       , socketId       , credentials     ) {
    this.regexString = regexString;
    this.key = key;
    this.socketId = socketId;
    this.credentials = credentials;
  }
                             
                     
                          
                          
}

function decodePublisherOpen(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PublisherOpen(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodePublisherOpen(message               ) {
  return msgpack.encode([message.regexString, message.key, message.socketId, message.credentials]);
}

class PublisherClose {
  constructor(key       , socketId       ) {
    this.key = key;
    this.socketId = socketId;
  }
                     
                          
}

function decodePublisherClose(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PublisherClose(decoded[0], decoded[1]);
}

function encodePublisherClose(message                ) {
  return msgpack.encode([message.key, message.socketId]);
}

class PublisherMessage {
  constructor(key       , message     ) {
    this.key = key;
    this.message = message;
  }
                     
                      
}

function decodePublisherMessage(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PublisherMessage(decoded[0], decoded[1]);
}

function encodePublisherMessage(message                  ) {
  return msgpack.encode([message.key, message.message]);
}

class PublisherPeerMessage {
  constructor(key       , socketId       , message     ) {
    this.key = key;
    this.socketId = socketId;
    this.message = message;
  }
                     
                          
                      
}

function decodePublisherPeerMessage(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PublisherPeerMessage(decoded[0], decoded[1], decoded[2]);
}

function encodePublisherPeerMessage(message                      ) {
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

msgpack.register(0x40, MultipartContainer, encodeMultipartContainer, decodeMultipartContainer);

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
module.exports.MultipartContainer = MultipartContainer;
module.exports.MergeChunksPromise = MergeChunksPromise;
module.exports.encode = msgpack.encode;
module.exports.decode = msgpack.decode;
module.exports.getArrayBuffer = (b        ) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
