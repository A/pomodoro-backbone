'use stcict';

var Backbone = require('backbone');
var Timer    = require('./timer');
var Pomodoro = require('../models/pomodoro');
var debug    = require('debug')('app:app');

module.exports = Backbone.View.extend({
  template: require('../templates/app.jade'),
  events: {
    'click #start': 'start',
    'click #stop': 'stop'
  },
  initialize: function() {
    debug('initialize app');
    this
      .createPomodoro()
      .render()
    ;
  },
  createPomodoro: function() {
    debug('create new pomodoro');
    this.pomodoro = new Pomodoro();
    if (this.timer) this.timer.remove();
    this.timer = new Timer({ model: this.pomodoro });
    this.listenToOnce(this.pomodoro, 'change:finished change:distract', function() {
      this
        .createPomodoro()
        .renderTimer()
      ;
    });
    return this;
  },
  start: function() {
    debug('start pomodoro');
    this.pomodoro.start();
  },
  stop: function() {
    debug('stop pomodoro');
    this.pomodoro.distract();
  },
  render: function() {
    debug('render');
    return this
      .renderTemplate()
      .renderTimer()
    ;
  },
  renderTemplate: function() {
    debug('render template');
    var html = this.template();
    this.$el.empty().append(html);
    return this;
  },
  renderTimer: function() {
    debug('render timer');
    this.$('#timer')
      .append(this.timer.render().$el);
    return this;
  }
});
