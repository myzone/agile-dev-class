require.config({
    paths: {
        'view/header': 'views/header',
        'view/layout': 'views/layout',
        'view/sidebar': 'views/sidebar',
        'view/search': 'views/search',
        'view/collection': 'views/collection',
        'view/course': 'views/course',

        'models/courses': 'models/courses-collection',

        'react': 'libs/react-0.13.1',
        'react-bootstrap': 'libs/react-bootstrap-0.20.3',
        'hogan': 'libs/hogan-3.0.1',
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',
        'underscore': 'libs/underscore-1.8.3',
        'backbone': 'libs/backbone-1.1.2',
        'backbone-react': 'libs/backbone-react-component-0.8.0'
    }
});

define(['backbone', 'react', 'react-bootstrap', 'ramda', 'jquery', 'views/header', 'views/layout', 'views/sidebar', 'views/search', 'views/collection', 'views/course', 'models/courses'], function (Backbone, React, ReactBootstrap, R, $, HeaderView, LayoutView, SidebarView, SearchView, CollectionView, CourseView, CoursesCollection) {
    var coursesCollection = new CoursesCollection();

    var application = new Backbone.Model({
        sideBarVisible: true,

        userName: "myzone",

        stylesheets: ['css/style.css', 'css/bootstrap.css', 'css/simple-sidebar.css'],
        appLogoUrl: 'resources/open-book-clipart.png',
        appName: 'Degree Overview',

        sessionCapabilities: [{
            name: "Profile",
            action: function (application) {
                application.set('activeFeature', application.get('features')['user-profile']);
            }
        }],

        features: {
            'degree-summary': {
                name: 'Degree Summary',
                content: React.DOM.h1({key: 'degree-summary'}, 'Degree Summary')
            },
            'course-search': {
                name: 'Course Search',
                content: React.DOM.div({key: 'course-search'}, [
                    React.createElement(SearchView, {
                        key: 'search',
                        onSearch: function (query) {
                            var data = query
                                ? {search: query}
                                : {};

                            coursesCollection.fetch({
                                reset: true,
                                wait: true,
                                data: $.param(data)
                            });
                        }
                    }),
                    React.createElement(CollectionView, {
                        key: 'search-result',
                        collection: coursesCollection,
                        view: CourseView
                    })
                ])
            },
            'user-profile': {
                name: 'User Profile',
                content: React.DOM.h1({key: 'user-profile'}, 'User Profile'),
                hidden: true
            }
        },
        activeFeature: null
    });

    application.set('activeFeature', application.get('features')['course-search']);

    var header = React.createElement(HeaderView, {
        key: 'header',
        model: application
    });
    var sidebar = React.createElement(SidebarView, {
        key: 'sidebar',
        model: application
    });
    var layout = React.createElement(LayoutView, {
        key: 'layout',
        header: header,
        sidebar: sidebar,
        model: application
    });

    React.render(layout, document.getElementById('root'));
});
