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
  BraidSocketEvent,
  DataDump,
  ProviderDump,
  ActiveProviderDump,
  PeerDump,
  PeerSubscriptionDump,
  PeerSync,
  PeerSyncResponse,
  ReceiverDump,
  PeerPublisherDump,
  PublishRequest,
  PublishResponse,
  Unpublish,
  PublisherOpen,
  PublisherClose,
  PublisherMessage,
  PublisherPeerMessage,
  MultipartContainer,
  DataSyncInsertions,
  DataSyncDeletions,
  CustomMapDump,
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
    const args = [uuid.v4(), uuid.v4()];
    const id = uuid.v4();
    const ids = [randomInteger()];
    const braidEvent = new BraidEvent(name, args, id, ids);
    const encoded = encode(braidEvent);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(BraidEvent);
    expect(decoded.name).toEqual(name);
    expect(decoded.args).toEqual(args);
    expect(decoded.ids).toEqual(ids);
    expect(decoded.id).toEqual(id);
  });
  test('Should encode and decode socket events', async () => {
    const name = uuid.v4();
    const args = [uuid.v4(), uuid.v4()];
    const peerId = randomInteger();
    const socketId = randomInteger();
    const id = uuid.v4();
    const ids = [randomInteger()];
    const braidSocketEvent = new BraidSocketEvent(name, args, peerId, socketId, id, ids);
    const encoded = encode(braidSocketEvent);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(BraidSocketEvent);
    expect(decoded.name).toEqual(name);
    expect(decoded.args).toEqual(args);
    expect(decoded.peerId).toEqual(peerId);
    expect(decoded.socketId).toEqual(socketId);
    expect(decoded.ids).toEqual(ids);
    expect(decoded.id).toEqual(id);
  });
  test('Should encode and decode data dumps', async () => {
    const alice = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveMap([], { bufferPublishing: 0 });
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
    const alice = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveMap([], { bufferPublishing: 0 });
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
    const alice = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveMap([], { bufferPublishing: 0 });
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
    const alice = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveMap([], { bufferPublishing: 0 });
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
    const alice = new ObservedRemoveSet([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveSet([], { bufferPublishing: 0 });
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
    const peerDump = new PeerDump([[], []], []);
    const providerDump = new ProviderDump([[], []], []);
    const receiverDump = new ReceiverDump([[], []], []);
    const activeProviderDump = new ActiveProviderDump([[], []], []);
    const peerSubscriptionDump = new PeerSubscriptionDump([[], []], []);
    const customMapDumps = [new CustomMapDump(uuid.v4(), [[], []], [])];
    const peerSync = new PeerSync(id, peerDump, providerDump, receiverDump, activeProviderDump, peerSubscriptionDump, customMapDumps);
    const encoded = encode(peerSync);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerSync);
    expect(decoded.id).toEqual(id);
    expect(decoded.peers).toBeInstanceOf(PeerDump);
    expect(decoded.providers).toBeInstanceOf(ProviderDump);
    expect(decoded.receivers).toBeInstanceOf(ReceiverDump);
    expect(decoded.activeProviders).toBeInstanceOf(ActiveProviderDump);
    expect(decoded.peerSubscriptions).toBeInstanceOf(PeerSubscriptionDump);
    expect(decoded.customMapDumps[0]).toBeInstanceOf(CustomMapDump);
    expect(decoded.customMapDumps[0].name).toEqual(customMapDumps[0].name);
  });
  test('Should encode and decode peer sync responses', async () => {
    const id = randomInteger();
    const peerSyncResponse = new PeerSyncResponse(id);
    const encoded = encode(peerSyncResponse);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerSyncResponse);
    expect(id).toEqual(decoded.value);
  });
  test('Should encode and decode receiver dumps', async () => {
    const alice = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const key = uuid.v4();
    const value = {
      [uuid.v4()]: uuid.v4(),
    };
    alice.set(key, value);
    const ids = [randomInteger()];
    const receiverDump = new ReceiverDump(alice.dump(), ids);
    const encoded = encode(receiverDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(ReceiverDump);
    bob.process(decoded.queue);
    expect(bob.get(key)).toEqual(value);
    expect(ids).toEqual(decoded.ids);
  });
  test('Should encode and decode publisher dumps', async () => {
    const alice = new ObservedRemoveSet([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveSet([], { bufferPublishing: 0 });
    const key = uuid.v4();
    alice.add(key);
    const ids = [randomInteger()];
    const peerPublisherDump = new PeerPublisherDump(alice.dump(), ids);
    const encoded = encode(peerPublisherDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PeerPublisherDump);
    bob.process(decoded.queue);
    expect(bob.has(key)).toEqual(true);
    expect(ids).toEqual(decoded.ids);
  });
  test('Should encode and decode publish requests', async () => {
    const key = uuid.v4();
    const publishRequest = new PublishRequest(key);
    const encoded = encode(publishRequest);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PublishRequest);
    expect(key).toEqual(decoded.value);
  });
  test('Should encode and decode publish responses', async () => {
    const key = uuid.v4();
    const success = Math.random() > 0.5;
    const code = Math.floor(Math.random() * 1000);
    const message = uuid.v4();
    const publishResponse = new PublishResponse({ key, success, code, message });
    const encoded = encode(publishResponse);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PublishResponse);
    expect({ key, success, code, message }).toEqual(decoded.value);
  });
  test('Should encode and decode unpublishes', async () => {
    const key = uuid.v4();
    const unpublish = new Unpublish(key);
    const encoded = encode(unpublish);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(Unpublish);
    expect(key).toEqual(decoded.value);
  });
  test('Should encode and decode publisher open events', async () => {
    const regexString = uuid.v4();
    const key = uuid.v4();
    const socketId = randomInteger();
    const credentials = {
      [uuid.v4()]: uuid.v4(),
    };
    const publisherOpen = new PublisherOpen(regexString, key, socketId, credentials);
    const encoded = encode(publisherOpen);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PublisherOpen);
    expect(decoded.regexString).toEqual(regexString);
    expect(decoded.key).toEqual(key);
    expect(decoded.socketId).toEqual(socketId);
    expect(decoded.credentials).toEqual(credentials);
  });
  test('Should encode and decode publisher close events', async () => {
    const key = uuid.v4();
    const socketId = randomInteger();
    const publisherClose = new PublisherClose(key, socketId);
    const encoded = encode(publisherClose);
    const decoded = decode(encoded);
    expect(decoded.key).toEqual(key);
    expect(decoded).toBeInstanceOf(PublisherClose);
    expect(decoded.socketId).toEqual(socketId);
  });
  test('Should encode and decode publisher message events', async () => {
    const key = uuid.v4();
    const message = {
      [uuid.v4()]: uuid.v4(),
    };
    const publisherMessage = new PublisherMessage(key, message);
    const encoded = encode(publisherMessage);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PublisherMessage);
    expect(decoded.key).toEqual(key);
    expect(decoded.message).toEqual(message);
  });
  test('Should encode and decode publisher message events', async () => {
    const key = uuid.v4();
    const socketId = randomInteger();
    const message = {
      [uuid.v4()]: uuid.v4(),
    };
    const publisherPeerMessage = new PublisherPeerMessage(key, socketId, message);
    const encoded = encode(publisherPeerMessage);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(PublisherPeerMessage);
    expect(decoded.key).toEqual(key);
    expect(decoded.socketId).toEqual(socketId);
    expect(decoded.message).toEqual(message);
  });
  test('Should encode and decode multipart containers', async () => {
    const id = randomInteger();
    const position = Math.round(100 * Math.random());
    const length = 100 + Math.round(100 * Math.random());
    const buffer = crypto.randomBytes(Math.round(100 * Math.random()));
    const multipartContainer = new MultipartContainer(id, position, length, buffer);
    const encoded = encode(multipartContainer);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(MultipartContainer);
    expect(decoded.position).toEqual(position);
    expect(decoded.length).toEqual(length);
    expect(decoded.buffer.equals(buffer)).toEqual(true);
  });
  test('Should chunk and combine', async () => {
    const data = crypto.randomBytes(1024 * 1024);
    const buffer = encode({ data: data.buffer });
    const chunks = MultipartContainer.chunk(buffer, Math.round(Math.random() * 1024 * 1024));
    expect(chunks.reduce((acc, chunk) => acc + decode(chunk).buffer.length, 0)).toEqual(buffer.length);
    const mergeChunksPromise = MultipartContainer.getMergeChunksPromise(1000);
    for (const chunk of chunks) {
      mergeChunksPromise.push(decode(chunk));
    }
    const mergedChunksBuffer = await mergeChunksPromise;
    expect(buffer.equals(mergedChunksBuffer)).toEqual(true);
    const x = decode(mergedChunksBuffer);
    expect(x.data).toEqual(data);
  });
  test('Should encode and decode data sync insertions', async () => {
    const insertions = [
      [uuid.v4(), [uuid.v4(), uuid.v4()]],
      [uuid.v4(), [uuid.v4(), uuid.v4()]],
      [uuid.v4(), [uuid.v4(), uuid.v4()]],
    ];
    const dataSyncInsertions = new DataSyncInsertions(insertions);
    const encoded = encode(dataSyncInsertions);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(DataSyncInsertions);
    expect(decoded.insertions).toEqual(insertions);
  });
  test('Should encode and decode data sync deletions', async () => {
    const deletions = [
      [uuid.v4(), uuid.v4()],
      [uuid.v4(), uuid.v4()],
      [uuid.v4(), uuid.v4()],
    ];
    const dataSyncDeletions = new DataSyncDeletions(deletions);
    const encoded = encode(dataSyncDeletions);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(DataSyncDeletions);
    expect(decoded.deletions).toEqual(deletions);
  });

  test('Should encode and decode custom map dumps', async () => {
    const name = uuid.v4();
    const alice = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const bob = new ObservedRemoveMap([], { bufferPublishing: 0 });
    const key = uuid.v4();
    const value = {
      [uuid.v4()]: uuid.v4(),
    };
    alice.set(key, value);
    const ids = [randomInteger()];
    const customMapDump = new CustomMapDump(name, alice.dump(), ids);
    const encoded = encode(customMapDump);
    const decoded = decode(encoded);
    expect(decoded).toBeInstanceOf(CustomMapDump);
    expect(decoded.name).toEqual(name);
    bob.process(decoded.queue);
    expect(bob.get(key)).toEqual(value);
    expect(ids).toEqual(decoded.ids);
  });
});
