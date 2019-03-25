// @flow

const crypto = require('crypto');
const uuid = require('uuid');
const { ObservedRemoveMap, ObservedRemoveSet } = require('observed-remove');
const {
  Credentials,
  CredentialsResponse,
  PeerRequest,
  PeerResponse,
  Unpeer,
  SubscribeRequest,
  SubscribeResponse,
  Unsubscribe,
  EventSubscribeRequest,
  EventSubscribeResponse,
  EventUnsubscribe,
  BraidEvent,
  DataDump,
  ProviderDump,
  ActiveProviderDump,
  PeerDump,
  PeerSubscriptionDump,
  PeerSync,
  PeerSyncResponse,
  encode,
  decode,
} = require('../src');

function randomInteger() {
  return crypto.randomBytes(4).readUInt32BE(0, true);
}

describe('Messagepack', () => {
  test('Should encode and decode credentials', async () => {
    const value = {
      [uuid.v4()]: uuid.v4(),
    };
    const credentials = new Credentials(value);
    const encoded = encode(credentials);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(Credentials);
    expect(value).toEqual(decoded.value);
  });
  test('Should encode and decode credentials responses', async () => {
    const success = Math.random() > 0.5;
    const code = Math.floor(Math.random() * 1000);
    const message = uuid.v4();
    const credentialsResponse = new CredentialsResponse({ success, code, message });
    const encoded = encode(credentialsResponse);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(CredentialsResponse);
    expect({ success, code, message }).toEqual(decoded.value);
  });
  test('Should encode and decode peer requests', async () => {
    const peerId = randomInteger();
    const peerRequest = new PeerRequest(peerId);
    const encoded = encode(peerRequest);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerRequest);
    expect(peerId).toEqual(decoded.value);
  });
  test('Should encode and decode peer responses', async () => {
    const id = randomInteger();
    const success = Math.random() > 0.5;
    const code = Math.floor(Math.random() * 1000);
    const message = uuid.v4();
    const peerResponse = new PeerResponse({ id, success, code, message });
    const encoded = encode(peerResponse);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerResponse);
    expect({ id, success, code, message }).toEqual(decoded.value);
  });
  test('Should encode and decode unpeers', async () => {
    const unpeer = new Unpeer();
    const encoded = encode(unpeer);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(Unpeer);
  });
  test('Should encode and decode subscribe requests', async () => {
    const key = uuid.v4();
    const subscribeRequest = new SubscribeRequest(key);
    const encoded = encode(subscribeRequest);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(SubscribeRequest);
    expect(key).toEqual(decoded.value);
  });
  test('Should encode and decode subscribe responses', async () => {
    const key = uuid.v4();
    const success = Math.random() > 0.5;
    const code = Math.floor(Math.random() * 1000);
    const message = uuid.v4();
    const subscribeResponse = new SubscribeResponse({ key, success, code, message });
    const encoded = encode(subscribeResponse);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(SubscribeResponse);
    expect({ key, success, code, message }).toEqual(decoded.value);
  });
  test('Should encode and decode unsubscribes', async () => {
    const key = uuid.v4();
    const unsubscribe = new Unsubscribe(key);
    const encoded = encode(unsubscribe);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(Unsubscribe);
    expect(key).toEqual(decoded.value);
  });
  test('Should encode and decode event subscribe requests', async () => {
    const name = uuid.v4();
    const eventSubscribeRequest = new EventSubscribeRequest(name);
    const encoded = encode(eventSubscribeRequest);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(EventSubscribeRequest);
    expect(name).toEqual(decoded.value);
  });
  test('Should encode and decode event subscribe responses', async () => {
    const name = uuid.v4();
    const success = Math.random() > 0.5;
    const code = Math.floor(Math.random() * 1000);
    const message = uuid.v4();
    const eventSubscribeResponse = new EventSubscribeResponse({ name, success, code, message });
    const encoded = encode(eventSubscribeResponse);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(EventSubscribeResponse);
    expect({ name, success, code, message }).toEqual(decoded.value);
  });
  test('Should encode and decode event unsubscribes', async () => {
    const name = uuid.v4();
    const eventUnsubscribe = new EventUnsubscribe(name);
    const encoded = encode(eventUnsubscribe);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(EventUnsubscribe);
    expect(name).toEqual(decoded.value);
  });
  test('Should encode and decode events', async () => {
    const name = uuid.v4();
    const value = uuid.v4();
    const ids = [randomInteger()];
    const braidEvent = new BraidEvent(name, value, ids);
    const encoded = encode(braidEvent);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(BraidEvent);
    expect(decoded.name).toEqual(name);
    expect(decoded.value).toEqual(value);
    expect(decoded.ids).toEqual(ids);
  });
  test('Should encode and decode data dumps', async () => {
    const alice = new ObservedRemoveMap();
    const bob = new ObservedRemoveMap();
    const key = uuid.v4();
    const value = {
      [uuid.v4()]: uuid.v4(),
    };
    alice.set(key, value);
    const ids = [randomInteger()];
    const dataDump = new DataDump(alice.dump(), ids);
    const encoded = encode(dataDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(DataDump);
    bob.process(decoded.queue);
    expect(bob.get(key)).toEqual(value);
    expect(ids).toEqual(decoded.ids);
  });
  test('Should encode and decode provider dumps', async () => {
    const alice = new ObservedRemoveMap();
    const bob = new ObservedRemoveMap();
    const key = uuid.v4();
    const value = {
      [uuid.v4()]: uuid.v4(),
    };
    alice.set(key, value);
    const ids = [randomInteger()];
    const providerDump = new ProviderDump(alice.dump(), ids);
    const encoded = encode(providerDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(ProviderDump);
    bob.process(decoded.queue);
    expect(bob.get(key)).toEqual(value);
    expect(ids).toEqual(decoded.ids);
  });
  test('Should encode and decode active provider dumps', async () => {
    const alice = new ObservedRemoveMap();
    const bob = new ObservedRemoveMap();
    const key = uuid.v4();
    const value = {
      [uuid.v4()]: uuid.v4(),
    };
    alice.set(key, value);
    const ids = [randomInteger()];
    const activeProviderDump = new ActiveProviderDump(alice.dump(), ids);
    const encoded = encode(activeProviderDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(ActiveProviderDump);
    bob.process(decoded.queue);
    expect(bob.get(key)).toEqual(value);
    expect(ids).toEqual(decoded.ids);
  });
  test('Should encode and decode peer dumps', async () => {
    const alice = new ObservedRemoveMap();
    const bob = new ObservedRemoveMap();
    const key = uuid.v4();
    const value = {
      [uuid.v4()]: uuid.v4(),
    };
    alice.set(key, value);
    const ids = [randomInteger()];
    const peerDump = new PeerDump(alice.dump(), ids);
    const encoded = encode(peerDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerDump);
    bob.process(decoded.queue);
    expect(bob.get(key)).toEqual(value);
    expect(ids).toEqual(decoded.ids);
  });
  test('Should encode and decode subscriber dumps', async () => {
    const alice = new ObservedRemoveSet();
    const bob = new ObservedRemoveSet();
    const key = uuid.v4();
    alice.add(key);
    const ids = [randomInteger()];
    const peerSubscriptionDump = new PeerSubscriptionDump(alice.dump(), ids);
    const encoded = encode(peerSubscriptionDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerSubscriptionDump);
    bob.process(decoded.queue);
    expect(bob.has(key)).toEqual(true);
    expect(ids).toEqual(decoded.ids);
  });
  test('Should encode and decode peer syncs', async () => {
    const id = randomInteger();
    const dataDump = new DataDump([[], []], []);
    const peerDump = new PeerDump([[], []], []);
    const providerDump = new ProviderDump([[], []], []);
    const activeProviderDump = new ActiveProviderDump([[], []], []);
    const peerSubscriptionDump = new PeerSubscriptionDump([[], []], []);
    const peerSync = new PeerSync(id, dataDump, peerDump, providerDump, activeProviderDump, peerSubscriptionDump);
    const encoded = encode(peerSync);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerSync);
    expect(decoded.id).toEqual(id);
    expect(decoded.data).toBeInstanceOf(DataDump);
    expect(decoded.peers).toBeInstanceOf(PeerDump);
    expect(decoded.providers).toBeInstanceOf(ProviderDump);
    expect(decoded.activeProviders).toBeInstanceOf(ActiveProviderDump);
    expect(decoded.peerSubscriptions).toBeInstanceOf(PeerSubscriptionDump);
  });
  test('Should encode and decode peer sync responses', async () => {
    const id = randomInteger();
    const peerSyncResponse = new PeerSyncResponse(id);
    const encoded = encode(peerSyncResponse);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerSyncResponse);
    expect(id).toEqual(decoded.value);
  });
});
