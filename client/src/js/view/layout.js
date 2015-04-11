define(['react', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, R, $, BackboneReact, Backbone) {
    return React.createClass({
        mixins: [Backbone.React.Component.mixin],
        render: function () {
            var DOM = React.DOM;

            return DOM.div({}, [
                R.map(function(stylesheet) {
                    return DOM.link({rel: 'stylesheet', href: stylesheet});
                }, this.state.model.stylesheets),

                DOM.div({id: 'wrapper', className: !this.state.model.sideBarVisible ? 'toggled' : ''}, [
                    this.props.sidebar,
                    this.props.header,
                    DOM.div({className: 'container-fluid'}, [
                        DOM.div({className: 'row'}, [
                            DOM.div({id: 'content', className: 'col-lg-12'}, [
                                this.state.model.activeFeature.content
                            ])
                        ])
                    ])
                ])
            ]);
        }
    });
});