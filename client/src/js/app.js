require.config({
    paths: {
        'view/header': 'view/header',
        'view/layout': 'view/layout',
        'view/sidebar': 'view/sidebar',
        'view/search': 'view/search',

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

define(['backbone', 'react', 'ramda', 'jquery', 'view/header', 'view/layout', 'view/sidebar', 'view/search'], function (Backbone, React, R, $, Header, Layout, Sidebar, Search) {
    var CourseModel = Backbone.Model.extend({});

    var CoursesCollection = Backbone.Collection.extend({
        url: '/v1/courses',
        model: CourseModel
    });

    var CoursesResult = React.createClass({
        mixins: [Backbone.React.Component.mixin],
        render: function () {
            var DOM = React.DOM;
            var collection2Read = this.state.collection;

            return DOM.div({}, [
                R.map(function (course) {
                    return DOM.h2({}, course.name);
                }, collection2Read)
            ]);
        }
    });


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
                    React.createElement(Search, {
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
                    React.createElement(CoursesResult, {
                        key: 'search-result',
                        collection: coursesCollection
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

    var header = React.createElement(Header, {
        key: 'header',
        model: application
    });
    var sidebar = React.createElement(Sidebar, {
        key: 'sidebar',
        model: application
    });
    var layout = React.createElement(Layout, {
        key: 'layout',
        header: header,
        sidebar: sidebar,
        model: application
    });

    React.render(layout, document.getElementById('root'));
});
