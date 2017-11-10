'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Popstate = require('./components/Popstate');

Object.defineProperty(exports, 'Popstate', {
  enumerable: true,
  get: function get() {
    return _Popstate.Popstate;
  }
});

var _Route = require('./components/Route');

Object.defineProperty(exports, 'Route', {
  enumerable: true,
  get: function get() {
    return _Route.Route;
  }
});

var _Redirect = require('./components/Redirect');

Object.defineProperty(exports, 'Redirect', {
  enumerable: true,
  get: function get() {
    return _Redirect.Redirect;
  }
});

var _Link = require('./components/Link');

Object.defineProperty(exports, 'Link', {
  enumerable: true,
  get: function get() {
    return _Link.Link;
  }
});

var _Switch = require('./components/Switch');

Object.defineProperty(exports, 'Switch', {
  enumerable: true,
  get: function get() {
    return _Switch.Switch;
  }
});
exports.default = {
  state: {
    path: location.pathname
  },
  actions: {
    update: function update() {
      return { path: location.pathname };
    }
  }
};
