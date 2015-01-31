var app = angular.module('leagueMontage',
  ['ngRoute', 'appRoutes', 'MainController','ng-admin']);

app.config(function (NgAdminConfigurationProvider, Application, Entity, Field, Reference, ReferencedList, ReferenceMany) {
    var app = new Application('ng-admin backend demo') // application main title
        .baseApiUrl('http://localhost:1337/api/v1.0/');
        
});