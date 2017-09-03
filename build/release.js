var fs = require('fs');
var archiver = require('archiver');
var util = require('./util');

var info = require('../package.json');
var file = `dist/uikit-${info.version}.zip`;
var output = fs.createWriteStream(file).on('close', () => util.logFile(file));

var archive = archiver('zip');

archive.pipe(output);
archive.file('dist/js/uikit-datepicker.js', {name: '/js/uikit-datepicker.js'});
archive.file('dist/js/uikit-datepicker.min.js', {name: '/js/uikit-datepicker.min.js'});
archive.file('dist/css/uikit-datepicker.css', {name: '/css/uikit-datepicker.css'});
archive.file('dist/css/uikit-datepicker.min.css', {name: '/css/uikit-datepicker.min.css'});
archive.file('dist/css/uikit-datepicker-rtl.css', {name: '/css/uikit-datepicker-rtl.css'});
archive.file('dist/css/uikit-datepicker-rtl.min.css', {name: '/css/uikit-datepicker-rtl.min.css'});
archive.finalize();
