Package.describe({
  name: 'esanders25:sfhttp-for-rest',
  version: '1.0.1',
  summary: 'Integration package for the Salesforce REST API',  
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use('ecmascript');
  api.use('http');
  api.mainModule('sfhttp-for-rest.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('esanders25:sfhttp-for-rest');
  api.mainModule('sfhttp-for-rest-tests.js');
});
