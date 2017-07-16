Package.describe({
  name: 'vuejs:blaze-integration',
  version: '0.1.0',
  summary: "Vue integration with Meteor's Blaze rendering engine."
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1');

  api.use([
    'ecmascript',
    'blaze',
    'templating',
    'ejson',
    'underscore',
    'peerlibrary:data-lookup@0.1.0'
  ]);

  api.use([
    'akryum:vue-router',
    'akryum:vue-router2'
  ], {weak: true});

  api.mainModule('main.js', 'client');
});