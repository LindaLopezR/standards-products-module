Package.describe({
  name: 'igoandtrack:standards-products-module',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');
  api.use('react-template-helper');
  api.use('blaze-html-templates@1.0.4');
  api.use('react-meteor-data@0.2.16');
  api.use('ecmascript');
  api.use('templating');
  api.use('igoandtrack:standards-products-collection');
  api.mainModule('standards-products-module.js', 'client');
});

Npm.depends({
  'react' : '16.8.6',
  'react-table' : '6.10.0'
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('standards-products-module');
  api.mainModule('standards-products-module-tests.js');
});
