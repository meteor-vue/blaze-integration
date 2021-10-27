Package.describe({
  name: 'vuejs:blaze-integration',
  version: '0.3.2',
  summary: "Vue integration with Meteor's Blaze rendering engine."
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');

  api.use([
    'ecmascript',
    'blaze@2.5.0',
    'templating@1.4.1',
    'ejson',
    'underscore',
    'peerlibrary:data-lookup@0.3.0'
  ]);

  api.use([
    'akryum:vue-router@0.2.2',
    'akryum:vue-router2@0.2.3'
  ], {weak: true});

  api.mainModule('main.js', 'client');
});
