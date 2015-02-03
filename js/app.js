'use strict';

// Dependencis
var Backbone = require('backbone');
Backbone.$ = require('jquery');
Backbone._ = require('underscore');


var App = require('./views/app');
new App({ el: '#app' });
