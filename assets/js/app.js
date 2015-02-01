var adminApp = angular.module('leagueAdmin',
  ['ngRoute', 'appRoutes', 'AdminCtrl', 'ng-admin']);

adminApp.config(function (NgAdminConfigurationProvider, Application, Entity, Field, Reference, ReferencedList, ReferenceMany, RestangularProvider) {
    
    // use the custom query parameters function to format the API request correctly
    //RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {

    //}

    var app = new Application('ng-admin backend demo') // application main title
        .baseApiUrl('http://localhost:1337/api/v1.0/');

    var user = new Entity('user').identifier(new Field('id'));
    var submission = new Entity('Submission').readOnly();
    var comment = new Entity('Comment');
    var user_type = new Entity('User_type');
    
    app.addEntity(user)
        .addEntity(submission)
        .addEntity(comment);

    user.menuView()
        .icon('<span class="glyphicon glyphicon-file"></span>');

    user.dashboardView()
        .title('Recent user')
        .order(1)
        .limit(5)
        .fields([new Field('createdAt')]);

    user.listView()
        .title('All users')
        .description('List of users')
        .infinitePagination(true)
        .fields([
            new Field('id').label('ID'),
            new Field('createdAt').type('date'),
            new Reference('user_type')
                .targetEntity(user_type)
                .targetField(new Field('utype')),
            new ReferenceMany('submissions')
                .targetEntity(submission)
                .targetField(new Field('title'))
        ])
        .listActions(['show','edit','delete']);

    //create user
    //user.creationView()
    //    .field([

    //        ])
    //edit user
    //user.editionView()
    //    .title('Edit user name "{{ entnty.values.display_name }}"')
    //    .action(['list', 'show', 'delete',])

    user.showView()
        .fields([
            user.listView().fields(),
            new ReferenceMany('comments')
                .targetEntity(comment)
                .targetField(new Field('text'))
        ]);

    NgAdminConfigurationProvider.configure(app);
});

var mainApp = angular.module('leagueMontage',
    ['ngRoute', 'appRoutes', 'MainController']);