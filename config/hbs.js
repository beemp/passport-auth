var hbs_config = function(app, hbs) {
  hbs.registerPartial('layouts/frame', '{{frame}}')
}

module.exports = hbs_config;
