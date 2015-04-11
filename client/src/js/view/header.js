define(['react', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, R, $, BackboneReact, Backbone) {
    return React.createClass({
        mixins: [Backbone.React.Component.mixin],
        toggleSidebar: function () {
            var newState = !this.state.model.sideBarVisible;

            this.props.model.set('sideBarVisible', newState);
        },
        render: function () {
            var DOM = React.DOM;

            return DOM.nav({className: 'navbar navbar-default navbar-static-top'}, [
                DOM.div({className: 'container'}, [
                    DOM.div({id: 'menu-toggle', className: 'navbar-header', onClick: this.toggleSidebar}, [
                        DOM.img({className: 'navbar-brand', src: this.state.model.appLogoUrl}),
                        DOM.a({className: 'navbar-brand', href: '#'}, this.state.model.appName)
                    ]),
                    DOM.div({id: 'navbar', className: 'navbar-collapse collapse'}, [
                        DOM.ul({className: 'nav navbar-nav navbar-right'}, [
                            DOM.li({className: 'active dropdown user'}, [
                                DOM.a({
                                    className: 'dropdown-toggle',
                                    role: 'button',
                                    'aria-expanded': 'false'
                                }, [
                                    DOM.span({className: 'caret'}),
                                    DOM.ul({className: 'dropdown-menu userbar', role: 'menu'}, [
                                        DOM.li({
                                            className: 'dropdown-header',
                                            role: 'presentation'
                                        }, this.props.userName),
                                        R.map(function(capability) {
                                            return DOM.li({onClick: capability.action}, DOM.a(capability.name));
                                        }, this.state.model.sessionCapabilities)
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        }
    });
});