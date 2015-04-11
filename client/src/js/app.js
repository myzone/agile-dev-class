require.config({
    paths: {
        'react': 'libs/react-0.13.1',
        'hogan': 'libs/hogan-3.0.1',
        'ramda': 'libs/ramda-0.13.min',
        'jquery': 'libs/jquery-2.1.3',
        'kefir': 'libs/kefir-1.3.1'
    }
});

define(['react', 'hogan', 'ramda', 'jquery', 'kefir'], function (React, Hogan, R, $, Kefir) {
    var Application = function () {
        var stateEmitter = Kefir.emitter().log();
        var state = stateEmitter.toProperty({
            sideBarVisible: true
        });

        this.getState = function() {
            return state;
        };

        this.setState = function(state) {
            stateEmitter.emit(state);
        };


        return this;
    };

    var application = new Application();

    var Layout = React.createClass({
        getInitialState: function () {
            return {sideBarVisible: application.getState().sideBarVisible}
        },
        componentDidMount: function () {
            var self = this;

            application.getState().changes().onValue(function (state) {
                self.setState({sideBarVisible: state.sideBarVisible})
            })
        },
        render: function () {
            var DOM = React.DOM;

            return DOM.div({}, [
                DOM.link({rel: 'stylesheet', href: 'css/style.css'}),
                DOM.link({rel: 'stylesheet', href: 'css/bootstrap.css'}),
                DOM.link({rel: 'stylesheet', href: 'css/simple-sidebar.css'}),

                DOM.div({id: 'wrapper', className: this.state.sideBarVisible ? 'toggled' : ''}, [
                    this.props.sidebar,
                    this.props.header,
                    DOM.div({className: 'container-fluid'}, [
                        DOM.div({className: 'row'}, [
                            DOM.div({id: 'content', className: 'col-lg-12'}, [
                                this.props.content
                            ])
                        ])
                    ])
                ])
            ]);
        }
    });

    var Sidebar = React.createClass({
        render: function () {
            var DOM = React.DOM;

            var SideBarItem = React.createClass({
                render: function () {
                    return DOM.a({
                        className: this.props.active ? 'bg-primary' : '',
                        href: this.props.link
                    }, this.props.name);
                }
            });

            return DOM.div({id: 'sidebar-wrapper'}, [
                DOM.ul({className: 'sidebar-nav'}, [
                    DOM.li({className: 'sidebar-brand'}),
                    R.map(function (item) {
                        return DOM.li({}, React.createElement(SideBarItem, {
                            active: item.active,
                            link: item.link,
                            name: item.name
                        }));
                    }, this.props.items)
                ])
            ]);
        }
    });

    var Header = React.createClass({
        getInitialState: function () {
            return {sideBarVisible: application.getState().sideBarVisible}
        },
        toggleSidebar: function () {
            var newState = !this.state.sideBarVisible;

            this.setState({sideBarVisible: newState});
            application.setState({sideBarVisible: newState});
        },
        render: function () {
            var DOM = React.DOM;

            return DOM.nav({className: 'navbar navbar-default navbar-static-top'}, [
                DOM.div({className: 'container'}, [
                    DOM.div({id: 'menu-toggle', className: 'navbar-header', onClick: this.toggleSidebar}, [
                        DOM.img({className: 'navbar-brand', src: this.props.appLogoUrl}),
                        DOM.a({className: 'navbar-brand', href: '#'}, this.props.appName)
                    ]),
                    DOM.div({id: 'navbar', className: 'navbar-collapse collapse'}, [
                        DOM.ul({className: 'nav navbar-nav navbar-right'}, [
                            DOM.li({className: 'active dropdown user'}, [
                                DOM.a({
                                    className: 'dropdown-toggle',
                                    //href: '#',
                                    role: 'button',
                                    'aria-expanded': 'false'
                                }, [
                                    DOM.span({className: 'caret'}),
                                    DOM.ul({className: 'dropdown-menu userbar', role: 'menu'}, [
                                        DOM.li({
                                            className: 'dropdown-header',
                                            role: 'presentation'
                                        }, this.props.userName),
                                        this.props.userMenuItems
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        }
    });

    React.render(React.createElement(Layout, {
        header: React.createElement(Header, {
            appLogoUrl: 'resources/open-book-clipart.png',
            appName: 'Degree Overview'
        }),
        sidebar: React.createElement(Sidebar, {
            items: [{
                active: true,
                link: '#degree-summary',
                name: 'Degree Summary'
            }, {
                link: '#course-search',
                name: 'Courses Search'
            }]
        }),
        content: React.DOM.h1(null, 'Hello world!')
    }), document.getElementById('root'));

});
