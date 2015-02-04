
var adminApp = angular.module('leagueAdmin',
  ['ngRoute', 'appRoutes', 'AdminCtrl', 'ng-admin']);

adminApp.config(function (NgAdminConfigurationProvider, Application, Entity, Field, Reference, ReferencedList, ReferenceMany, RestangularProvider) {
    
    function truncate(value) {
        if (!value) 
            return '';
        return value.length > 50 ? value.substr(0, 50) + '...' : value;
    }

    // use the custom query parameters function to format the API request correctly
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        
        if (operation == "getList") {

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
        console.log(url);
        console.log(headers);
        console.log(params);
        return { headers: headers, element: element, params: params };
    });

    var app = new Application('League Montages AdminPanel') // application main title
        .baseApiUrl('http://localhost:1337/api/v1.0/'); //base api endpoint

    var user = new Entity('user');
    var submission = new Entity('submission');
    var comment = new Entity('comment');
    var user_type = new Entity('Usertype');
    var tag = new Entity('tag');
    var champ = new Entity('Champion');
    var champ_role = new Entity('ChampionRole');
    var follower = new Entity('UserFollower');
    var sub_type = new Entity('Submissiontype');
    var state = new Entity('SubmissionState');
    var media = new Entity('Media');

    //add browserable entities
    app.addEntity(user)
        .addEntity(submission)
        .addEntity(comment)
        .addEntity(champ);

    //////////////////////////////////////////////////////////////////////
    //                                                                  //
    //                                                                  //                                  
    //                      User model admin views                      //
    //                                                                  //
    //                                                                  //
    //////////////////////////////////////////////////////////////////////
    //icon of entity in menu
    user.menuView()
        .icon('<span class="glyphicon glyphicon-user"></span>');

    //config dashboard view 
    user.dashboardView()
        .title('Recent user')
        .limit(5)
        .fields([new Field('id'), new Field('display_name').label('User Name')]);

    user.listView()
        .title('Users')
        .infinitePagination(true)
        .fields([
            new Field('id').label('ID'),
            new Field('display_name').label('Name'),
            new Field('user_type').label('Type').map(function(object){
                return object.utype;
            })
            //new ReferenceMany('submissions')
            //    .targetEntity(submission)
            //    .targetField(new Field('title'))
        ])
        .listActions(['show','edit','delete']);


    user.editionView()
        .title('Edit User Information')
        .actions(['list', 'show', 'delete'])
        .fields([
            new Field('display_name'),
            new Reference('user_type')
                .targetEntity(user_type)
                .targetField(new Field('utype')),
        ]);

    user.showView()
        .fields([
            user.listView().fields(),
            new Field('createdAt').label('join date').type('date'),
            new Field('updatedAt').label('last update').type('date'),
            new ReferencedList('User_follower').label('followers')
                .targetEntity(follower)
                .targetReferenceField('following')
                .targetFields([new Field('id'), 
                               new Field('follower').map(function(object){
                                    return object.display_name;
                               })]),
            /*new ReferencedList('User_follower').label('followings')
                .targetEntity(follower)
                .targetReferenceField('follower')
                .targetFields([new Field('id'), 
                               new Field('following').map(function(object){
                                    return object.display_name;
                               })]),
            */
            new ReferencedList('Submission')
                .targetEntity(submission)
                .targetReferenceField('createdBy')
                .targetFields([
                    new Field('title').isDetailLink(true),
                    new Field('url'),
                    new Field('description')
                ]),
            new ReferencedList('Comment')
                .targetEntity(comment)
                .targetReferenceField('written_by')
                .targetFields([
                    new Field('parentID'),
                    new Field('text').isDetailLink(true),
                    new Field('createdAt').type('date'),
                ])
                .cssClasses('col-sm-4')
        ]);

    //////////////////////////////////////////////////////////////////////
    //                                                                  //
    //                                                                  //                                  
    //                Submission model admin views                      //
    //                                                                  //
    //                                                                  //
    //////////////////////////////////////////////////////////////////////
    //submission view config
    submission.menuView()
        .icon('<span class="glyphicon glyphicon-facetime-video"></span>');

    submission.dashboardView()
        .title('Submissions')
        .order(1)
        .limit(5)
        .fields([
            new Field('title'), 
            new Field('createdAt').type('date'), 
            new Field('state').map(function(object){
                return object.state;
            })]);
    
    submission.listView()
        .title('Submissions')
        .infinitePagination(true)
        .fields([
            new Field('title').label('title').isDetailLink(true),
            new Field('createdAt').type('date'),
            new Field('createdBy').map(function(object){
                return object.id;
            }),
            new Field('sub_type').label('Submission type')
                .map(function(object){
                    return object.name;
                }),
            new Field('champ_type').label('Champion')
                .map(function(object){
                    return object.name;
                }),
            new Field('champ_role').label('Champion role')
                .map(function(object){
                    return object.name;
                }),
            new Field('state').label('State')
                .map(function(object){
                    return object.state;
                })
        ])
        .listActions(['show','edit','delete']);
    
    submission.editionView()
        .title('Edit submission')
        .actions(['list', 'show', 'delete'])
        .fields([
            new Field('title'),
            new Field('url'),
            new Field('description'),
            new Field('state'),
            new Reference('sub_type').label('Submission type')
                .targetEntity(sub_type)
                .targetField(new Field('name')),
            new Reference('champ_type').label('Champion')
                .targetEntity(champ)
                .targetField(new Field('name')),
            new Reference('champ_role').label('Champion role')
                .targetEntity(champ_role)
                .targetField(new Field('name')),
            new Reference('state').label('State')
                .targetEntity(state)
                .targetField(new Field('state')),
            new ReferenceMany('tag')
                .targetEntity(tag)
                .targetField(new Field('name'))
                .cssClasses('col-sm-4')
        ]);


    submission.showView()
        .fields([
            submission.listView().fields(),
            new Field('url'),
            new Field('description'),
            new Field('view').type('number'),

            /*new ReferencedList('Comment')
                .targetEntity(comment)
                .targetReferenceField('written_to')
                .targetFields([
                    new Field('written_by').map(function(object){
                        return object.display_name;
                    }),
                    new Field('text')
                ]),
            */
        ]);
        
    //////////////////////////////////////////////////////////////////////
    //                                                                  //
    //                                                                  //                                  
    //                   Comment model admin views                      //
    //                                                                  //
    //                                                                  //
    //////////////////////////////////////////////////////////////////////
    //comment view config
    comment.menuView()
        .icon('<span class="glyphicon glyphicon-comment"></span>');

    comment.dashboardView()
        .title('Comments')
        .limit(5)
        .fields([
            new Field('text').isDetailLink(true).map(truncate)
        ]);

    comment.listView()
        .title('Comments')
        .infinitePagination(true)
        .fields([
            new Field('written_by').label('Created by')
                .map(function(object){
                    return object.display_name;
                }),

            new Field('text').isDetailLink(true)
        ])
        .listActions(['show','delete']);

    comment.showView()
        .fields([
            comment.listView().fields(),
            new Field('written_to').label('comment On')
                .map(function(object){
                    return object.title;
                }),
            new Field('parentId').label('reply to')
                .map(function(object){
                    return truncate(object.text);
                }),
            new Reference('media').label('Media')
                .targetEntity(media)
                .targetField(new Field('media_url'))
        ]);

    //////////////////////////////////////////////////////////////////////
    //                                                                  //
    //                                                                  //                                  
    //                  Champion model admin views                      //
    //                                                                  //
    //                                                                  //
    //////////////////////////////////////////////////////////////////////
    champ.menuView()
        .icon('<span class="glyphicon glyphicon-star"></span>');

    champ.dashboardView()
        .title('Champions list')
        .limit(5)
        .fields([
            new Field('name').label('Champion name').isDetailLink(true)
        ]);

    champ.listView()
        .title('Champions')
        .infinitePagination(true)
        .fields([
            new Field('name').isDetailLink(true)
        ])
        .listActions(['show','delete']);

    champ.showView()
        .fields([
            new Field('id').label('ID'),
            new Field('name').label('Champs name'),
            new ReferencedList('Submission')
                .targetEntity(submission)
                .targetReferenceField('champ_type')
                .targetFields([
                    new Field('title').isDetailLink(true),
                    new Field('view').type('number')
                ])
        ]);

    champ.creationView()
        .fields([
            new Field('name')
        ]);

    //media
    //media type and etc


    NgAdminConfigurationProvider.configure(app);
    console.log("Finish loading admin panel");
});

