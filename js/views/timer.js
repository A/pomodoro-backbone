'use stcict';

var Backbone = require('backbone');
var moment   = require('moment');

module.exports = Backbone.View.extend({
  initialize: function() {
    this.model.on('change', this.render.bind(this));
  },
  render: function() {
    var time = this.model.get('value');
    var str = this.presenter(time);
    this.$el.text(str);
    return this;
  },
  // convert inner data to use it in templates
  presenter: function(time) {
    time = time / 1000; // convert to seconds
    var min = parseInt(time / 60);
    var sec = parseInt(time - (min * 60));
    if (min < 10) { min = '0' + min.toString(); }
    if (sec < 10) { sec = '0' + sec.toString(); }
    return min + ':' + sec;
  }
});
