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
  constructor(id       , data         , peers         , providers             , activeProviders                    , peerSubscriptions                      ) {
    this.id = id;
    this.data = data;
    this.peers = peers;
    this.providers = providers;
    this.activeProviders = activeProviders;
    this.peerSubscriptions = peerSubscriptions;
  }
             
                 
                  
                          
                                      
                                          
}

function decodePeerSync(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new PeerSync(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5]);
}

function encodePeerSync(peerSync          ) {
  return msgpack.encode([peerSync.id, peerSync.data, peerSync.peers, peerSync.providers, peerSync.activeProviders, peerSync.peerSubscriptions]);
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
  constructor(name        , value    , ids                = []) {
    this.name = name;
    this.value = value;
    this.ids = ids;
  }
               
             
                    
}

function decodeBraidEvent(buffer        ) {
  const decoded = msgpack.decode(buffer);
  return new BraidEvent(decoded[0], decoded[1], decoded[2]);
}

function encodeBraidEvent(event            ) {
  return msgpack.encode([event.name, event.value, event.ids]);
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
module.exports.encode = msgpack.encode;
module.exports.decode = msgpack.decode;
module.exports.getArrayBuffer = (b        ) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
