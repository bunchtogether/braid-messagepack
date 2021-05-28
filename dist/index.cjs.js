"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArrayBuffer = exports.decode = exports.encode = exports.PublisherPeerMessage = exports.PublisherMessage = exports.PublisherClose = exports.PublisherOpen = exports.Unpublish = exports.PublishResponse = exports.PublishRequest = exports.PeerPublisherDump = exports.ReceiverDump = exports.BraidEvent = exports.EventUnsubscribe = exports.EventSubscribeResponse = exports.EventSubscribeRequest = exports.Unsubscribe = exports.SubscribeResponse = exports.SubscribeRequest = exports.Unpeer = exports.PeerResponse = exports.PeerRequest = exports.PeerSubscriptionDump = exports.ActiveProviderDump = exports.ProviderDump = exports.PeerDump = exports.DataSyncDeletions = exports.DataSyncInsertions = exports.DataDump = exports.MultipartContainer = exports.MergeChunksPromise = exports.PeerSyncResponse = exports.PeerSync = exports.CredentialsResponse = exports.Credentials = void 0;

var _msgpack = _interopRequireDefault(require("msgpack5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var msgpack = (0, _msgpack["default"])();

function defaultEncode(o) {
  return msgpack.encode(o.value);
}

function encodeEmpty() {
  return Buffer.from([]);
}

var Credentials = function Credentials(value) {
  _classCallCheck(this, Credentials);

  this.value = value;
};

exports.Credentials = Credentials;

function decodeCredentials(buffer) {
  var value = msgpack.decode(buffer);
  return new Credentials(value);
}

var CredentialsResponse = function CredentialsResponse(value) {
  _classCallCheck(this, CredentialsResponse);

  this.value = value;
};

exports.CredentialsResponse = CredentialsResponse;

function decodeCredentialsResponse(buffer) {
  var value = msgpack.decode(buffer);
  return new CredentialsResponse(value);
}

var PeerSync = function PeerSync(id, peers, providers, receivers, activeProviders, peerSubscriptions) {
  _classCallCheck(this, PeerSync);

  this.id = id;
  this.peers = peers;
  this.providers = providers;
  this.receivers = receivers;
  this.activeProviders = activeProviders;
  this.peerSubscriptions = peerSubscriptions;
};

exports.PeerSync = PeerSync;

function decodePeerSync(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PeerSync(decoded[0], decoded[1], decoded[2], decoded[3], decoded[4], decoded[5]);
}

function encodePeerSync(peerSync) {
  return msgpack.encode([peerSync.id, peerSync.peers, peerSync.providers, peerSync.receivers, peerSync.activeProviders, peerSync.peerSubscriptions]);
}

var PeerSyncResponse = function PeerSyncResponse(value) {
  _classCallCheck(this, PeerSyncResponse);

  this.value = value;
};

exports.PeerSyncResponse = PeerSyncResponse;

function decodePeerSyncResponse(buffer) {
  var value = msgpack.decode(buffer);
  return new PeerSyncResponse(value);
}

var incrementedChunkId = Math.random() * 4294967296 >>> 0;

var MergeChunksPromise = /*#__PURE__*/function (_Promise) {
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
    key: Symbol.toStringTag,
    get: // $FlowFixMe
    function get() {
      return 'MergeChunksPromise';
    }
  }], [{
    key: Symbol.species,
    get: function get() {
      return Promise;
    }
  }]);

  return MergeChunksPromise;
}( /*#__PURE__*/_wrapNativeSuper(Promise));

exports.MergeChunksPromise = MergeChunksPromise;

var MultipartContainer = function MultipartContainer(id, position, length, buffer) {
  _classCallCheck(this, MultipartContainer);

  this.id = id;
  this.position = position;
  this.length = length;
  this.buffer = buffer;
};

exports.MultipartContainer = MultipartContainer;

_defineProperty(MultipartContainer, "chunk", function (buffer, size) {
  var chunks = [];

  for (var i = 0; i * size < buffer.length; i += 1) {
    var slice = buffer.slice(i * size, (i + 1) * size);
    chunks.push(msgpack.encode(new MultipartContainer(incrementedChunkId, i * size, buffer.length, slice)));
  }

  incrementedChunkId += 1;

  if (incrementedChunkId > 4294967294) {
    incrementedChunkId = 0;
  }

  return chunks;
});

_defineProperty(MultipartContainer, "getMergeChunksPromise", function (timeoutDuration) {
  return new MergeChunksPromise(timeoutDuration);
});

function decodeMultipartContainer(buffer) {
  var decoded = msgpack.decode(buffer);
  return new MultipartContainer(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeMultipartContainer(multipartContainer) {
  return msgpack.encode([multipartContainer.id, multipartContainer.position, multipartContainer.length, multipartContainer.buffer]);
}

var DataDump = function DataDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, DataDump);

  this.queue = queue;
  this.ids = ids;
};

exports.DataDump = DataDump;

function decodeDataDump(buffer) {
  var decoded = msgpack.decode(buffer);
  return new DataDump(decoded[0], decoded[1]);
}

function encodeDataDump(dump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

var DataSyncInsertions = function DataSyncInsertions(insertions) {
  _classCallCheck(this, DataSyncInsertions);

  this.insertions = insertions;
};

exports.DataSyncInsertions = DataSyncInsertions;

function decodeDataSyncInsertions(buffer) {
  var decoded = msgpack.decode(buffer);
  return new DataSyncInsertions(decoded);
}

function encodeDataSyncInsertions(dataSync) {
  return msgpack.encode(dataSync.insertions);
}

var DataSyncDeletions = function DataSyncDeletions(deletions) {
  _classCallCheck(this, DataSyncDeletions);

  this.deletions = deletions;
};

exports.DataSyncDeletions = DataSyncDeletions;

function decodeDataSyncDeletions(buffer) {
  var decoded = msgpack.decode(buffer);
  return new DataSyncDeletions(decoded);
}

function encodeDataSyncDeletions(dataSync) {
  return msgpack.encode(dataSync.deletions);
}

var PeerDump = function PeerDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, PeerDump);

  this.queue = queue;
  this.ids = ids;
};

exports.PeerDump = PeerDump;

function decodePeerDump(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PeerDump(decoded[0], decoded[1]);
}

function encodePeerDump(dump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

var ProviderDump = function ProviderDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, ProviderDump);

  this.queue = queue;
  this.ids = ids;
};

exports.ProviderDump = ProviderDump;

function decodeProviderDump(buffer) {
  var decoded = msgpack.decode(buffer);
  return new ProviderDump(decoded[0], decoded[1]);
}

function encodeProviderDump(dump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

var ActiveProviderDump = function ActiveProviderDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, ActiveProviderDump);

  this.queue = queue;
  this.ids = ids;
};

exports.ActiveProviderDump = ActiveProviderDump;

function decodeActiveProviderDump(buffer) {
  var decoded = msgpack.decode(buffer);
  return new ActiveProviderDump(decoded[0], decoded[1]);
}

function encodeActiveProviderDump(dump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

var PeerSubscriptionDump = function PeerSubscriptionDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, PeerSubscriptionDump);

  this.queue = queue;
  this.ids = ids;
};

exports.PeerSubscriptionDump = PeerSubscriptionDump;

function decodePeerSubscriptionDump(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PeerSubscriptionDump(decoded[0], decoded[1]);
}

function encodePeerSubscriptionDump(dump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

var PeerRequest = function PeerRequest(value) {
  _classCallCheck(this, PeerRequest);

  this.value = value;
};

exports.PeerRequest = PeerRequest;

function decodePeerRequest(buffer) {
  var value = msgpack.decode(buffer);
  return new PeerRequest(value);
}

var PeerResponse = function PeerResponse(value) {
  _classCallCheck(this, PeerResponse);

  this.value = value;
};

exports.PeerResponse = PeerResponse;

function decodePeerResponse(buffer) {
  var value = msgpack.decode(buffer);
  return new PeerResponse(value);
}

var Unpeer = function Unpeer() {
  _classCallCheck(this, Unpeer);
};

exports.Unpeer = Unpeer;

function decodeUnpeer() {
  return new Unpeer();
}

var SubscribeRequest = function SubscribeRequest(value) {
  _classCallCheck(this, SubscribeRequest);

  this.value = value;
};

exports.SubscribeRequest = SubscribeRequest;

function decodeSubscribeRequest(buffer) {
  var value = msgpack.decode(buffer);
  return new SubscribeRequest(value);
}

var SubscribeResponse = function SubscribeResponse(value) {
  _classCallCheck(this, SubscribeResponse);

  this.value = value;
};

exports.SubscribeResponse = SubscribeResponse;

function decodeSubscribeResponse(buffer) {
  var value = msgpack.decode(buffer);
  return new SubscribeResponse(value);
}

var Unsubscribe = function Unsubscribe(value) {
  _classCallCheck(this, Unsubscribe);

  this.value = value;
};

exports.Unsubscribe = Unsubscribe;

function decodeUnsubscribe(buffer) {
  var value = msgpack.decode(buffer);
  return new Unsubscribe(value);
}

var EventSubscribeRequest = function EventSubscribeRequest(value) {
  _classCallCheck(this, EventSubscribeRequest);

  this.value = value;
};

exports.EventSubscribeRequest = EventSubscribeRequest;

function decodeEventSubscribeRequest(buffer) {
  var value = msgpack.decode(buffer);
  return new EventSubscribeRequest(value);
}

var EventSubscribeResponse = function EventSubscribeResponse(value) {
  _classCallCheck(this, EventSubscribeResponse);

  this.value = value;
};

exports.EventSubscribeResponse = EventSubscribeResponse;

function decodeEventSubscribeResponse(buffer) {
  var value = msgpack.decode(buffer);
  return new EventSubscribeResponse(value);
}

var EventUnsubscribe = function EventUnsubscribe(value) {
  _classCallCheck(this, EventUnsubscribe);

  this.value = value;
};

exports.EventUnsubscribe = EventUnsubscribe;

function decodeEventUnsubscribe(buffer) {
  var value = msgpack.decode(buffer);
  return new EventUnsubscribe(value);
}

var BraidEvent = function BraidEvent(name, args, id) {
  var ids = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  _classCallCheck(this, BraidEvent);

  this.name = name;
  this.args = args;
  this.id = id;
  this.ids = ids;
};

exports.BraidEvent = BraidEvent;

function decodeBraidEvent(buffer) {
  var decoded = msgpack.decode(buffer);
  return new BraidEvent(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodeBraidEvent(event) {
  return msgpack.encode([event.name, event.args, event.id, event.ids]);
}

var ReceiverDump = function ReceiverDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, ReceiverDump);

  this.queue = queue;
  this.ids = ids;
};

exports.ReceiverDump = ReceiverDump;

function decodeReceiverDump(buffer) {
  var decoded = msgpack.decode(buffer);
  return new ReceiverDump(decoded[0], decoded[1]);
}

function encodeReceiverDump(dump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

var PeerPublisherDump = function PeerPublisherDump(queue) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, PeerPublisherDump);

  this.queue = queue;
  this.ids = ids;
};

exports.PeerPublisherDump = PeerPublisherDump;

function decodePeerPublisherDump(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PeerPublisherDump(decoded[0], decoded[1]);
}

function encodePeerPublisherDump(dump) {
  return msgpack.encode([dump.queue, dump.ids]);
}

var PublishRequest = function PublishRequest(value) {
  _classCallCheck(this, PublishRequest);

  this.value = value;
};

exports.PublishRequest = PublishRequest;

function decodePublishRequest(buffer) {
  var value = msgpack.decode(buffer);
  return new PublishRequest(value);
}

var PublishResponse = function PublishResponse(value) {
  _classCallCheck(this, PublishResponse);

  this.value = value;
};

exports.PublishResponse = PublishResponse;

function decodePublishResponse(buffer) {
  var value = msgpack.decode(buffer);
  return new PublishResponse(value);
}

var Unpublish = function Unpublish(value) {
  _classCallCheck(this, Unpublish);

  this.value = value;
};

exports.Unpublish = Unpublish;

function decodeUnpublish(buffer) {
  var value = msgpack.decode(buffer);
  return new Unpublish(value);
}

var PublisherOpen = function PublisherOpen(regexString, key, socketId, credentials) {
  _classCallCheck(this, PublisherOpen);

  this.regexString = regexString;
  this.key = key;
  this.socketId = socketId;
  this.credentials = credentials;
};

exports.PublisherOpen = PublisherOpen;

function decodePublisherOpen(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PublisherOpen(decoded[0], decoded[1], decoded[2], decoded[3]);
}

function encodePublisherOpen(message) {
  return msgpack.encode([message.regexString, message.key, message.socketId, message.credentials]);
}

var PublisherClose = function PublisherClose(key, socketId) {
  _classCallCheck(this, PublisherClose);

  this.key = key;
  this.socketId = socketId;
};

exports.PublisherClose = PublisherClose;

function decodePublisherClose(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PublisherClose(decoded[0], decoded[1]);
}

function encodePublisherClose(message) {
  return msgpack.encode([message.key, message.socketId]);
}

var PublisherMessage = function PublisherMessage(key, message) {
  _classCallCheck(this, PublisherMessage);

  this.key = key;
  this.message = message;
};

exports.PublisherMessage = PublisherMessage;

function decodePublisherMessage(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PublisherMessage(decoded[0], decoded[1]);
}

function encodePublisherMessage(message) {
  return msgpack.encode([message.key, message.message]);
}

var PublisherPeerMessage = function PublisherPeerMessage(key, socketId, message) {
  _classCallCheck(this, PublisherPeerMessage);

  this.key = key;
  this.socketId = socketId;
  this.message = message;
};

exports.PublisherPeerMessage = PublisherPeerMessage;

function decodePublisherPeerMessage(buffer) {
  var decoded = msgpack.decode(buffer);
  return new PublisherPeerMessage(decoded[0], decoded[1], decoded[2]);
}

function encodePublisherPeerMessage(message) {
  return msgpack.encode([message.key, message.socketId, message.message]);
}

msgpack.register(0x1, Credentials, defaultEncode, decodeCredentials);
msgpack.register(0x2, CredentialsResponse, defaultEncode, decodeCredentialsResponse);
msgpack.register(0x3, DataDump, encodeDataDump, decodeDataDump);
msgpack.register(0x4, ProviderDump, encodeProviderDump, decodeProviderDump);
msgpack.register(0x5, ActiveProviderDump, encodeActiveProviderDump, decodeActiveProviderDump);
msgpack.register(0x6, PeerDump, encodePeerDump, decodePeerDump);
msgpack.register(0x7, PeerSubscriptionDump, encodePeerSubscriptionDump, decodePeerSubscriptionDump);
msgpack.register(0x8, PeerSync, encodePeerSync, decodePeerSync);
msgpack.register(0x9, PeerSyncResponse, defaultEncode, decodePeerSyncResponse);
msgpack.register(0x10, PeerRequest, defaultEncode, decodePeerRequest);
msgpack.register(0x11, PeerResponse, defaultEncode, decodePeerResponse);
msgpack.register(0x12, Unpeer, encodeEmpty, decodeUnpeer);
msgpack.register(0x20, SubscribeRequest, defaultEncode, decodeSubscribeRequest);
msgpack.register(0x21, SubscribeResponse, defaultEncode, decodeSubscribeResponse);
msgpack.register(0x22, Unsubscribe, defaultEncode, decodeUnsubscribe);
msgpack.register(0x23, EventSubscribeRequest, defaultEncode, decodeEventSubscribeRequest);
msgpack.register(0x24, EventSubscribeResponse, defaultEncode, decodeEventSubscribeResponse);
msgpack.register(0x25, EventUnsubscribe, defaultEncode, decodeEventUnsubscribe);
msgpack.register(0x26, BraidEvent, encodeBraidEvent, decodeBraidEvent);
msgpack.register(0x30, ReceiverDump, encodeReceiverDump, decodeReceiverDump);
msgpack.register(0x31, PeerPublisherDump, encodePeerPublisherDump, decodePeerPublisherDump);
msgpack.register(0x32, PublishRequest, defaultEncode, decodePublishRequest);
msgpack.register(0x33, PublishResponse, defaultEncode, decodePublishResponse);
msgpack.register(0x34, Unpublish, defaultEncode, decodeUnpublish);
msgpack.register(0x35, PublisherOpen, encodePublisherOpen, decodePublisherOpen);
msgpack.register(0x36, PublisherClose, encodePublisherClose, decodePublisherClose);
msgpack.register(0x37, PublisherMessage, encodePublisherMessage, decodePublisherMessage);
msgpack.register(0x38, PublisherPeerMessage, encodePublisherPeerMessage, decodePublisherPeerMessage);
msgpack.register(0x40, MultipartContainer, encodeMultipartContainer, decodeMultipartContainer);
msgpack.register(0x41, DataSyncInsertions, encodeDataSyncInsertions, decodeDataSyncInsertions);
msgpack.register(0x42, DataSyncDeletions, encodeDataSyncDeletions, decodeDataSyncDeletions);
var encode = msgpack.encode;
exports.encode = encode;
var decode = msgpack.decode;
exports.decode = decode;

var getArrayBuffer = function getArrayBuffer(b) {
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
};

exports.getArrayBuffer = getArrayBuffer;

//# sourceMappingURL=index.cjs.js.map