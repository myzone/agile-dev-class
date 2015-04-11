require.config({
    paths: {
        'view/header': 'view/header',
        'view/layout': 'view/layout',
        'view/sideBar': 'view/sidebar',

        'react': 'libs/react-0.13.1',
        'hogan': 'libs/hogan-3.0.1',
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',
        'underscore': 'libs/underscore-1.8.3',
        'backbone': 'libs/backbone-1.1.2',
        'backbone-react': 'libs/backbone-react-component-0.8.0'
    }
});

define(['backbone', 'react', 'ramda', 'jquery', 'view/header', 'view/layout', 'view/sideBar'], function (Backbone, React, R, $, Header, Layout, Sidebar) {
    var application = new Backbone.Model({
        sideBarVisible: true,

        stylesheets: ['css/style.css', 'css/bootstrap.css', 'css/simple-sidebar.css'],
        appLogoUrl: 'resources/open-book-clipart.png',
        appName: 'Degree Overview',

        sessionCapabilities: [],

        features: [{
            name: 'Degree Summary',
            content: React.DOM.h1(null, 'Degree Summary')
        }, {
            name: 'Course Search',
            content: React.DOM.h1(null, 'Course Search')
        }],
        activeFeature: null
    });

    application.set('activeFeature', application.get('features')[0]);
    application.set('activeFeature', application.get('features')[0]);

    React.render(React.createElement(Layout, {
        header: React.createElement(Header, {
            model: application
        }),
        sidebar: React.createElement(Sidebar, {
            model: application
        }),
        model: application
    }), document.getElementById('root'));

});
