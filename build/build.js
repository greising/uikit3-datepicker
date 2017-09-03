var fs = require('fs');
var path = require('path');
var glob = require('glob');
var util = require('./util');

Promise.all([

    util.compile('src/js/uikit-datepicker.js', 'dist/js/uikit-datepicker', ['jquery'], {jquery: 'jQuery'}, undefined, undefined, true),
    util.compile('tests/js/index.js', 'tests/js/test', ['jquery'], {jquery: 'jQuery'}, 'test')

]);
