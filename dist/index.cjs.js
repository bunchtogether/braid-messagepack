"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.decode = exports.Unsubscribe = exports.Unpublish = exports.Unpeer = exports.SubscribeResponse = exports.SubscribeRequest = exports.ReceiverDump = exports.PublisherPeerMessage = exports.PublisherOpen = exports.PublisherMessage = exports.PublisherClose = exports.PublishResponse = exports.PublishRequest = exports.ProviderDump = exports.PeerSyncResponse = exports.PeerSync = exports.PeerSubscriptionDump = exports.PeerResponse = exports.PeerRequest = exports.PeerPublisherDump = exports.PeerDump = exports.MultipartContainer = exports.MergeChunksPromise = exports.EventUnsubscribe = exports.EventSubscribeResponse = exports.EventSubscribeRequest = exports.DataSyncInsertions = exports.DataSyncDeletions = exports.DataDump = exports.CustomSetDump = exports.CustomMapDump = exports.CredentialsResponse = exports.Credentials = exports.BraidSocketEvent = exports.BraidEvent = exports.ActiveProviderDump = void 0;
Object.defineProperty(exports, "isNativeAccelerationEnabled", {
  enumerable: true,
  get: function get() {
    return _msgpackr.isNativeAccelerationEnabled;
  }
});

var _msgpackr = require("msgpackr");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defaultEncode(o) {
  return o.value;
}

function encodeEmpty() {
  return [];
}

var Credentials = /*#__PURE__*/_createClass(function Credentials(value) {
  _classCallCheck(this, Credentials);

  this.value = value;
});

exports.Credentials = Credentials;

function decodeCredentials(value) {
  return new Credentials(value);
}

var CredentialsResponse = /*#__PURE__*/_createClass(function CredentialsResponse(value) {
  _classCallCheck(this, CredentialsResponse);

  this.value = value;
});

exports.CredentialsResponse = CredentialsResponse;

function decodeCredentialsResponse(value) {
  return new CredentialsResponse(value);
}

var PeerSync = /*#__PURE__*/_createClass(function PeerSync(id, peers, providers, receivers, activeProviders, peerSubscriptions, customMapDumps, customSetDumps) {
  _classCallCheck(this, PeerSync);

  this.id = id;
  this.peers = peers;
  this.providers = providers;
  this.receivers = receivers;
  this.activeProviders = activeProviders;
  this.peerSubscriptions = peerSubscriptions;
  this.customMapDumps = customMapDumps;
  this.customSetDumps = customSetDumps;
});

exports.PeerSync = PeerSync;

function decodePeerSync(decoded) {
  return new PeerSync(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5], decoded[6], decoded[7]);
}

function encodePeerSync(peerSync) {
  return [peerSync.id, peerSync.peers, peerSync.providers, peerSync.receivers, peerSync.activeProviders, peerSync.peerSubscriptions, peerSync.customMapDumps, peerSync.customSetDumps];
}

var PeerSyncResponse = /*#__PURE__*/_createClass(function PeerSyncResponse(value) {
  _classCallCheck(this, PeerSyncResponse);

  this.value = value;
});

exports.PeerSyncResponse = PeerSyncResponse;

function decodePeerSyncResponse(value) {
  return new PeerSyncResponse(value);
}

var incrementedChunkId = Math.random() * 4294967296 >>> 0;

var MergeChunksPromise = /*#__PURE__*/function (_Promise, _Symbol$species, _Symbol$toStringTag) {
  _inherits(MergeChunksPromise, _Promise);

  var _super = _createSuper(MergeChunksPromise);

  function MergeChunksPromise(timeoutDuration) {
    var _this;

    _classCallCheck(this, MergeChunksPromise);

    var chunkCallbacks = [];
    _this = _super.call(this, function (resolve, reject) {
      var id;
      var merged;
      var bytesReceived = 0;

      var timeoutHandler = function timeoutHandler() {
        reject(new Error("MultipartContainer chunk timeout error after ".concat(timeoutDuration, "ms")));
      };

      var timeout = setTimeout(timeoutHandler, timeoutDuration);

      var addChunk = function addChunk(multipartContainer) {
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
    _this.chunkCallbacks = chunkCallbacks;
    return _this;
  }

  _createClass(MergeChunksPromise, [{
    key: "push",
    value: function push(multipartContainer) {
      var _iterator = _createForOfIteratorHelper(this.chunkCallbacks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var chunkCallback = _step.value;
          chunkCallback(multipartContainer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // $FlowFixMe

  }, {
    key: _Symbol$toStringTag,
    get: // $FlowFixMe
    function get() {
      return 'MergeChunksPromise';
    }
  }], [{
    key: _Symbol$species,
    get: function get() {
      return Promise;
    }
  }]);

  return MergeChunksPromise;
}( /*#__PURE__*/_wrapNativeSuper(Promise), Symbol.species, Symbol.toStringTag);

exports.MergeChunksPromise = MergeChunksPromise;

var MultipartContainer = /*#__PURE__*/_createClass(function MultipartContainer(id, position, length, buffer) {
  _classCallCheck(this, MultipartContainer);

  this.id = id;
  this.position = position;
  this.length = length;
  this.buffer = buffer;
});

exports.MultipartContainer = MultipartContainer;

_defineProperty(MultipartContainer, "chunk", void 0);

_defineProperty(MultipartContainer, "getMergeChunksPromise", void 0);

MultipartContainer.chunk = function (buffer, size) {
  var chunks = [];

  for (var i = 0; i * size < buffer.length; i += 1) {
    var slice = buffer.slice(i * size, (i + 1) * size);
    chunks.push((0, _msgpackr.pack)(new MultipartContainer(incrementedChunkId, i * size, buffer.length, slice)));
  }

  incrementedChunkId += 1;

  if (incrementedChunkId > 4294967294) {
    incrementedChunkId = 0;
  }

  return chunks;
};

MultipartContainer.getMergeChunksPromise = function (timeoutDuration) {
  return new MergeChunksPromise(timeoutDuration);
};

function decodeMultipartContainer(buffer) {
  var id = buffer.readUInt32BE(0);
  var position = buffer.readUInt32BE(4);
  var length = buffer.readUInt32BE(8);
  return new MultipartContainer(id, position, length, buffer.slice(12));
}

function encodeMultipartContainer(multipartContainer) {
  var buffer = Buffer.allocUnsafe(multipartContainer.buffer.length + 12);
  buffer.writeUInt32BE(multipartContainer.id, 0);
  buffer.writeUInt32BE(multipartContainer.position, 4);
  buffer.writeUInt32BE(multipartContainer.length, 8);
  multipartContainer.buffer.copy(buffer, 12);
  return buffer;
}

var DataDump = /*#__PURE__*/_createClass(function DataDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, DataDump);

  this.queue = queue;
  this.ids = ids;
});

exports.DataDump = DataDump;

function decodeDataDump(decoded) {
  return new DataDump(decoded[0], decoded[1]);
}

function encodeDataDump(dump) {
  return [dump.queue, dump.ids];
}

var DataSyncInsertions = /*#__PURE__*/_createClass(function DataSyncInsertions(insertions) {
  _classCallCheck(this, DataSyncInsertions);

  this.insertions = insertions;
});

exports.DataSyncInsertions = DataSyncInsertions;

function decodeDataSyncInsertions(decoded) {
  return new DataSyncInsertions(decoded);
}

function encodeDataSyncInsertions(dataSync) {
  return dataSync.insertions;
}

var DataSyncDeletions = /*#__PURE__*/_createClass(function DataSyncDeletions(deletions) {
  _classCallCheck(this, DataSyncDeletions);

  this.deletions = deletions;
});

exports.DataSyncDeletions = DataSyncDeletions;

function decodeDataSyncDeletions(decoded) {
  return new DataSyncDeletions(decoded);
}

function encodeDataSyncDeletions(dataSync) {
  return dataSync.deletions;
}

var PeerDump = /*#__PURE__*/_createClass(function PeerDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, PeerDump);

  this.queue = queue;
  this.ids = ids;
});

exports.PeerDump = PeerDump;

function decodePeerDump(decoded) {
  return new PeerDump(decoded[0], decoded[1]);
}

function encodePeerDump(dump) {
  return [dump.queue, dump.ids];
}

var ProviderDump = /*#__PURE__*/_createClass(function ProviderDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, ProviderDump);

  this.queue = queue;
  this.ids = ids;
});

exports.ProviderDump = ProviderDump;

function decodeProviderDump(decoded) {
  return new ProviderDump(decoded[0], decoded[1]);
}

function encodeProviderDump(dump) {
  return [dump.queue, dump.ids];
}

var ActiveProviderDump = /*#__PURE__*/_createClass(function ActiveProviderDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, ActiveProviderDump);

  this.queue = queue;
  this.ids = ids;
});

exports.ActiveProviderDump = ActiveProviderDump;

function decodeActiveProviderDump(decoded) {
  return new ActiveProviderDump(decoded[0], decoded[1]);
}

function encodeActiveProviderDump(dump) {
  return [dump.queue, dump.ids];
}

var PeerSubscriptionDump = /*#__PURE__*/_createClass(function PeerSubscriptionDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, PeerSubscriptionDump);

  this.queue = queue;
  this.ids = ids;
});

exports.PeerSubscriptionDump = PeerSubscriptionDump;

function decodePeerSubscriptionDump(decoded) {
  return new PeerSubscriptionDump(decoded[0], decoded[1]);
}

function encodePeerSubscriptionDump(dump) {
  return [dump.queue, dump.ids];
}

var PeerRequest = /*#__PURE__*/_createClass(function PeerRequest(value) {
  _classCallCheck(this, PeerRequest);

  this.value = value;
});

exports.PeerRequest = PeerRequest;

function decodePeerRequest(value) {
  return new PeerRequest(value);
}

var PeerResponse = /*#__PURE__*/_createClass(function PeerResponse(value) {
  _classCallCheck(this, PeerResponse);

  this.value = value;
});

exports.PeerResponse = PeerResponse;

function decodePeerResponse(value) {
  return new PeerResponse(value);
}

var Unpeer = /*#__PURE__*/_createClass(function Unpeer() {
  _classCallCheck(this, Unpeer);
});

exports.Unpeer = Unpeer;

function decodeUnpeer() {
  return new Unpeer();
}

var SubscribeRequest = /*#__PURE__*/_createClass(function SubscribeRequest(value) {
  _classCallCheck(this, SubscribeRequest);

  this.value = value;
});

exports.SubscribeRequest = SubscribeRequest;

function decodeSubscribeRequest(value) {
  return new SubscribeRequest(value);
}

var SubscribeResponse = /*#__PURE__*/_createClass(function SubscribeResponse(value) {
  _classCallCheck(this, SubscribeResponse);

  this.value = value;
});

exports.SubscribeResponse = SubscribeResponse;

function decodeSubscribeResponse(value) {
  return new SubscribeResponse(value);
}

var Unsubscribe = /*#__PURE__*/_createClass(function Unsubscribe(value) {
  _classCallCheck(this, Unsubscribe);

  this.value = value;
});

exports.Unsubscribe = Unsubscribe;

function decodeUnsubscribe(value) {
  return new Unsubscribe(value);
}

var EventSubscribeRequest = /*#__PURE__*/_createClass(function EventSubscribeRequest(value) {
  _classCallCheck(this, EventSubscribeRequest);

  this.value = value;
});

exports.EventSubscribeRequest = EventSubscribeRequest;

function decodeEventSubscribeRequest(value) {
  return new EventSubscribeRequest(value);
}

var EventSubscribeResponse = /*#__PURE__*/_createClass(function EventSubscribeResponse(value) {
  _classCallCheck(this, EventSubscribeResponse);

  this.value = value;
});

exports.EventSubscribeResponse = EventSubscribeResponse;

function decodeEventSubscribeResponse(value) {
  return new EventSubscribeResponse(value);
}

var EventUnsubscribe = /*#__PURE__*/_createClass(function EventUnsubscribe(value) {
  _classCallCheck(this, EventUnsubscribe);

  this.value = value;
});

exports.EventUnsubscribe = EventUnsubscribe;

function decodeEventUnsubscribe(value) {
  return new EventUnsubscribe(value);
}

var BraidEvent = /*#__PURE__*/_createClass(function BraidEvent(name, args, id) {
  var ids = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  _classCallCheck(this, BraidEvent);

  this.name = name;
  this.args = args;
  this.id = id;
  this.ids = ids;
});

exports.BraidEvent = BraidEvent;

function decodeBraidEvent(decoded) {
  return new BraidEvent(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeBraidEvent(event) {
  return [event.name, event.args, event.id, event.ids];
}

var BraidSocketEvent = /*#__PURE__*/_createClass(function BraidSocketEvent(name, args, peerId, socketId, id) {
  var ids = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

  _classCallCheck(this, BraidSocketEvent);

  this.name = name;
  this.args = args;
  this.peerId = peerId;
  this.socketId = socketId;
  this.id = id;
  this.ids = ids;
});

exports.BraidSocketEvent = BraidSocketEvent;

function decodeBraidSocketEvent(decoded) {
  return new BraidSocketEvent(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5]);
}

function encodeBraidSocketEvent(event) {
  return [event.name, event.args, event.peerId, event.socketId, event.id, event.ids];
}

var ReceiverDump = /*#__PURE__*/_createClass(function ReceiverDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, ReceiverDump);

  this.queue = queue;
  this.ids = ids;
});

exports.ReceiverDump = ReceiverDump;

function decodeReceiverDump(decoded) {
  return new ReceiverDump(decoded[0], decoded[1]);
}

function encodeReceiverDump(dump) {
  return [dump.queue, dump.ids];
}

var PeerPublisherDump = /*#__PURE__*/_createClass(function PeerPublisherDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, PeerPublisherDump);

  this.queue = queue;
  this.ids = ids;
});

exports.PeerPublisherDump = PeerPublisherDump;

function decodePeerPublisherDump(decoded) {
  return new PeerPublisherDump(decoded[0], decoded[1]);
}

function encodePeerPublisherDump(dump) {
  return [dump.queue, dump.ids];
}

var PublishRequest = /*#__PURE__*/_createClass(function PublishRequest(value) {
  _classCallCheck(this, PublishRequest);

  this.value = value;
});

exports.PublishRequest = PublishRequest;

function decodePublishRequest(value) {
  return new PublishRequest(value);
}

var PublishResponse = /*#__PURE__*/_createClass(function PublishResponse(value) {
  _classCallCheck(this, PublishResponse);

  this.value = value;
});

exports.PublishResponse = PublishResponse;

function decodePublishResponse(value) {
  return new PublishResponse(value);
}

var Unpublish = /*#__PURE__*/_createClass(function Unpublish(value) {
  _classCallCheck(this, Unpublish);

  this.value = value;
});

exports.Unpublish = Unpublish;

function decodeUnpublish(value) {
  return new Unpublish(value);
}

var PublisherOpen = /*#__PURE__*/_createClass(function PublisherOpen(regexString, key, serverId, socketId, credentials) {
  _classCallCheck(this, PublisherOpen);

  this.regexString = regexString;
  this.key = key;
  this.serverId = serverId;
  this.socketId = socketId;
  this.credentials = credentials;
});

exports.PublisherOpen = PublisherOpen;

function decodePublisherOpen(decoded) {
  return new PublisherOpen(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4]);
}

function encodePublisherOpen(message) {
  return [message.regexString, message.key, message.serverId, message.socketId, message.credentials];
}

var PublisherClose = /*#__PURE__*/_createClass(function PublisherClose(key, serverId, socketId) {
  _classCallCheck(this, PublisherClose);

  this.key = key;
  this.serverId = serverId;
  this.socketId = socketId;
});

exports.PublisherClose = PublisherClose;

function decodePublisherClose(decoded) {
  return new PublisherClose(decoded[0], decoded[1], decoded[2]);
}

function encodePublisherClose(message) {
  return [message.key, message.serverId, message.socketId];
}

var PublisherMessage = /*#__PURE__*/_createClass(function PublisherMessage(key, message) {
  _classCallCheck(this, PublisherMessage);

  this.key = key;
  this.message = message;
});

exports.PublisherMessage = PublisherMessage;

function decodePublisherMessage(decoded) {
  return new PublisherMessage(decoded[0], decoded[1]);
}

function encodePublisherMessage(message) {
  return [message.key, message.message];
}

var PublisherPeerMessage = /*#__PURE__*/_createClass(function PublisherPeerMessage(key, serverId, socketId, message) {
  _classCallCheck(this, PublisherPeerMessage);

  this.key = key;
  this.serverId = serverId;
  this.socketId = socketId;
  this.message = message;
});

exports.PublisherPeerMessage = PublisherPeerMessage;

function decodePublisherPeerMessage(decoded) {
  return new PublisherPeerMessage(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodePublisherPeerMessage(message) {
  return [message.key, message.serverId, message.socketId, message.message];
}

var CustomMapDump = /*#__PURE__*/_createClass(function CustomMapDump(name, queue) {
  var ids = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  _classCallCheck(this, CustomMapDump);

  this.name = name;
  this.queue = queue;
  this.ids = ids;
});

exports.CustomMapDump = CustomMapDump;

function decodeCustomMapDump(decoded) {
  return new CustomMapDump(decoded[0], decoded[1], decoded[2]);
}

function encodeCustomMapDump(dump) {
  return [dump.name, dump.queue, dump.ids];
}

var CustomSetDump = /*#__PURE__*/_createClass(function CustomSetDump(name, queue) {
  var ids = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  _classCallCheck(this, CustomSetDump);

  this.name = name;
  this.queue = queue;
  this.ids = ids;
});

exports.CustomSetDump = CustomSetDump;

function decodeCustomSetDump(decoded) {
  return new CustomSetDump(decoded[0], decoded[1], decoded[2]);
}

function encodeCustomSetDump(dump) {
  return [dump.name, dump.queue, dump.ids];
}

(0, _msgpackr.addExtension)({
  Class: Credentials,
  type: 0x1,
  write: defaultEncode,
  read: decodeCredentials
});
(0, _msgpackr.addExtension)({
  Class: CredentialsResponse,
  type: 0x2,
  write: defaultEncode,
  read: decodeCredentialsResponse
});
(0, _msgpackr.addExtension)({
  Class: DataDump,
  type: 0x3,
  write: encodeDataDump,
  read: decodeDataDump
});
(0, _msgpackr.addExtension)({
  Class: ProviderDump,
  type: 0x4,
  write: encodeProviderDump,
  read: decodeProviderDump
});
(0, _msgpackr.addExtension)({
  Class: ActiveProviderDump,
  type: 0x5,
  write: encodeActiveProviderDump,
  read: decodeActiveProviderDump
});
(0, _msgpackr.addExtension)({
  Class: PeerDump,
  type: 0x6,
  write: encodePeerDump,
  read: decodePeerDump
});
(0, _msgpackr.addExtension)({
  Class: PeerSubscriptionDump,
  type: 0x7,
  write: encodePeerSubscriptionDump,
  read: decodePeerSubscriptionDump
});
(0, _msgpackr.addExtension)({
  Class: PeerSync,
  type: 0x8,
  write: encodePeerSync,
  read: decodePeerSync
});
(0, _msgpackr.addExtension)({
  Class: PeerSyncResponse,
  type: 0x9,
  write: defaultEncode,
  read: decodePeerSyncResponse
});
(0, _msgpackr.addExtension)({
  Class: PeerRequest,
  type: 0x10,
  write: defaultEncode,
  read: decodePeerRequest
});
(0, _msgpackr.addExtension)({
  Class: PeerResponse,
  type: 0x11,
  write: defaultEncode,
  read: decodePeerResponse
});
(0, _msgpackr.addExtension)({
  Class: Unpeer,
  type: 0x12,
  write: encodeEmpty,
  read: decodeUnpeer
});
(0, _msgpackr.addExtension)({
  Class: SubscribeRequest,
  type: 0x20,
  write: defaultEncode,
  read: decodeSubscribeRequest
});
(0, _msgpackr.addExtension)({
  Class: SubscribeResponse,
  type: 0x21,
  write: defaultEncode,
  read: decodeSubscribeResponse
});
(0, _msgpackr.addExtension)({
  Class: Unsubscribe,
  type: 0x22,
  write: defaultEncode,
  read: decodeUnsubscribe
});
(0, _msgpackr.addExtension)({
  Class: EventSubscribeRequest,
  type: 0x23,
  write: defaultEncode,
  read: decodeEventSubscribeRequest
});
(0, _msgpackr.addExtension)({
  Class: EventSubscribeResponse,
  type: 0x24,
  write: defaultEncode,
  read: decodeEventSubscribeResponse
});
(0, _msgpackr.addExtension)({
  Class: EventUnsubscribe,
  type: 0x25,
  write: defaultEncode,
  read: decodeEventUnsubscribe
});
(0, _msgpackr.addExtension)({
  Class: BraidEvent,
  type: 0x26,
  write: encodeBraidEvent,
  read: decodeBraidEvent
});
(0, _msgpackr.addExtension)({
  Class: ReceiverDump,
  type: 0x30,
  write: encodeReceiverDump,
  read: decodeReceiverDump
});
(0, _msgpackr.addExtension)({
  Class: PeerPublisherDump,
  type: 0x31,
  write: encodePeerPublisherDump,
  read: decodePeerPublisherDump
});
(0, _msgpackr.addExtension)({
  Class: PublishRequest,
  type: 0x32,
  write: defaultEncode,
  read: decodePublishRequest
});
(0, _msgpackr.addExtension)({
  Class: PublishResponse,
  type: 0x33,
  write: defaultEncode,
  read: decodePublishResponse
});
(0, _msgpackr.addExtension)({
  Class: Unpublish,
  type: 0x34,
  write: defaultEncode,
  read: decodeUnpublish
});
(0, _msgpackr.addExtension)({
  Class: PublisherOpen,
  type: 0x35,
  write: encodePublisherOpen,
  read: decodePublisherOpen
});
(0, _msgpackr.addExtension)({
  Class: PublisherClose,
  type: 0x36,
  write: encodePublisherClose,
  read: decodePublisherClose
});
(0, _msgpackr.addExtension)({
  Class: PublisherMessage,
  type: 0x37,
  write: encodePublisherMessage,
  read: decodePublisherMessage
});
(0, _msgpackr.addExtension)({
  Class: PublisherPeerMessage,
  type: 0x38,
  write: encodePublisherPeerMessage,
  read: decodePublisherPeerMessage
});
(0, _msgpackr.addExtension)({
  Class: MultipartContainer,
  type: 0x40,
  pack: encodeMultipartContainer,
  unpack: decodeMultipartContainer
});
(0, _msgpackr.addExtension)({
  Class: DataSyncInsertions,
  type: 0x41,
  write: encodeDataSyncInsertions,
  read: decodeDataSyncInsertions
});
(0, _msgpackr.addExtension)({
  Class: DataSyncDeletions,
  type: 0x42,
  write: encodeDataSyncDeletions,
  read: decodeDataSyncDeletions
});
(0, _msgpackr.addExtension)({
  Class: CustomMapDump,
  type: 0x43,
  write: encodeCustomMapDump,
  read: decodeCustomMapDump
});
(0, _msgpackr.addExtension)({
  Class: BraidSocketEvent,
  type: 0x44,
  write: encodeBraidSocketEvent,
  read: decodeBraidSocketEvent
});
(0, _msgpackr.addExtension)({
  Class: CustomSetDump,
  type: 0x45,
  write: encodeCustomSetDump,
  read: decodeCustomSetDump
});
var encode = _msgpackr.pack;
exports.encode = encode;
var decode = _msgpackr.unpack;
exports.decode = decode;

//# sourceMappingURL=index.cjs.js.map