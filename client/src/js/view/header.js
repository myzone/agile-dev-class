define(['react', 'react-bootstrap', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, ReactBootstrap, R, $, BackboneReact, Backbone) {
    var Capability = React.createClass({
        render: function () {
            return React.createElement(ReactBootstrap.MenuItem, {onClick: this.props.action}, this.props.name);
        }
    });

    return React.createClass({
        mixins: [Backbone.React.Component.mixin],
        render: function () {
            var DOM = React.DOM;
            var model2Change = this.props.model;
            var model2Read = this.state.model;

            var toggleSidebar = function () {
                var newState = !model2Read.sideBarVisible;

                model2Change.set('sideBarVisible', newState);
            };

            return React.createElement(ReactBootstrap.Navbar, {
                brand: DOM.img({
                    display: 'inline',
                    className: 'navbar-brand',
                    src: model2Read.appLogoUrl,
                    onClick: toggleSidebar
                })
            }, [
                React.createElement(ReactBootstrap.Nav, {navbar: true}, [
                    React.createElement(ReactBootstrap.NavItem, {}, DOM.div({
                        className: 'brand-hack',
                        onClick: toggleSidebar
                    }, model2Read.appName))
                ]),
                React.createElement(ReactBootstrap.Nav, {navbar: true, right: true}, [
                    React.createElement(ReactBootstrap.DropdownButton, {}, [
                        React.createElement(ReactBootstrap.MenuItem, {key: -1, header: true}, model2Read.userName),
                        R.map(function (capability, i) {
                            return React.createElement(Capability, {
                                key: i,
                                name: capability.name,
                                action: function () {
                                    capability.action(model2Change);
                                }
                            });
                        }, model2Read.sessionCapabilities)
                    ])
                ])
            ]);
        }
    });
});