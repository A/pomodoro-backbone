'use strict';

var Backbone = require('backbone');
var debug    = require('debug')('app:pomodoro');


module.exports = Backbone.Model.extend({
  // expose attributes
  defaults: {
    session: 25 * 60 * 1000,
    value: null,
    start: null,
    finish: null,
    distracted: false,
    finished: false
  },
  initialize: function() {
    this.set('value', this.get('session'));
  },
  // start ticking
  start: function () {
    debug('start');
    this.set('start', Number(new Date()));
    this.set('finish', this.get('start') + this.get('session'));
    var pomodoro = this;
    (function countdown() {
      if (pomodoro.get('distracted')) { return; }
      if (!pomodoro.isFinished()) {
        debug('tick');
        setTimeout(countdown, 1000);
      } else {
        debug('finished');
        pomodoro.set('finished', true);
      }
      pomodoro.update();
    })();
  },
  update: function() {
    this.set('value', this.getOffset());
  },
  getOffset: function() {
    var now = Number(new Date());
    var offset = (this.get('finish') - now);
    debug('offset:', offset);
    return offset;
  },
  // logic to make pomodoro finished
  finish: function () {
    return this;
  },
  // check if pomodoro is finished
  isFinished: function () {
    if (this.get('finished')) { return true; }
    var now = Number(new Date());
    return this.getOffset() < 0;
  },
  // logic to make pomodoro distracted
  distract: function () {
    this.set('distracted', true);
    return this;
  }
});
