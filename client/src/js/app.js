require.config({
    paths: {
        'view/header': 'view/header',
        'view/layout': 'view/layout',
        'view/sidebar': 'view/sidebar',

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

define(['backbone', 'react', 'ramda', 'jquery', 'view/header', 'view/layout', 'view/sidebar'], function (Backbone, React, R, $, Header, Layout, Sidebar) {
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
                content: React.DOM.h1(null, 'Degree Summary')
            },
            'course-search': {
                name: 'Course Search',
                content: React.DOM.h1(null, 'Course Search')
            },
            'user-profile': {
                name: 'User Profile',
                content: React.DOM.h1(null, 'User Profile'),
                hidden: true
            }
        },
        activeFeature: null
    });

    application.set('activeFeature', application.get('features')['degree-summary']);

    var header = React.createElement(Header, {
        model: application
    });
    var sidebar = React.createElement(Sidebar, {
        model: application
    });
    var layout = React.createElement(Layout, {
        header: header,
        sidebar: sidebar,
        model: application
    });


    React.render(layout, document.getElementById('root'));


});
