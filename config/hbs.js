const hbs = require('hbs');
var hbs_config = function(app) {
  hbs.registerPartial('layouts/frame', '{{frame}}')
}

module.exports = hbs_config;
