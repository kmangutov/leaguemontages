var adminApp = angular.module('leagueAdmin',
  ['ngRoute', 'appRoutes', 'AdminCtrl', 'ng-admin']);

adminApp.config(function (NgAdminConfigurationProvider, Application, Entity, Field, Reference, ReferencedList, ReferenceMany, RestangularProvider) {
    
    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            // custom pagination params
            //params._start = (params._page - 1) * params._perPage;
            //params._end = params._page * params._perPage;

            //custom pagination for sails
            params.skip = (params._page - 1) * params._perPage;
            params.limit = params._perPage;

            delete params._page;
            delete params._perPage;

            // custom sort params
            if (params._sortField) {
                params.sort = params._sortField + ' ' + params._sortDir;

                delete params._sortDir;
                delete params._sortField;
            }

            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        
        return { element: element, headers: headers, params: params };
    });

    var app = new Application('League Montages AdminPanel') // application main title
        .baseApiUrl('http://localhost:1337/api/v1.0/');

    var user = new Entity('user');
    var submission = new Entity('submission');
    var comment = new Entity('comment');
    var user_type = new Entity('user_type');
    var tag = new Entity('tag');

    //add browserable entities
    app.addEntity(user)
        .addEntity(submission)
        .addEntity(comment)
        .addEntity(user_type)
        .addEntity(tag);

    //icon of entity in menu
    user.menuView()
        .icon('<span class="glyphicon glyphicon-file"></span>');

    //config dashboard view 
    user.dashboardView()
        .title('Recent user')
        .order(1)
        .limit(5)
        .fields([new Field('id'), new Field('display_name').label('user name')]);

    user.listView()
        .title('Users')
        .infinitePagination(true)
        .fields([
            new Field('id').label('ID'),
            new Field('createdAt').type('date').label('Joined date'),
            //new Reference('user_type')
            //    .targetEntity(user_type)
            //    .targetField(new Field('utype')),
            //new ReferenceMany('submissions')
            //    .targetEntity(submission)
            //    .targetField(new Field('title'))
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

    //user.showView()
    //    .fields([
    //        user.listView().fields(),
    //        new ReferenceMany('comments')
    //            .targetEntity(comment)
    //            .targetField(new Field('text'))
    //    ]);
    
    //submission view config

    //comment view config

    //tag view config


    //less important entities 
    //champ role view config
    //champ type view config 
    //media
    //media type and etc


    NgAdminConfigurationProvider.configure(app);
    console.log("Finish loading admin panel");
});

var mainApp = angular.module('leagueMontage',
    ['ngRoute', 'appRoutes', 'MainController']);