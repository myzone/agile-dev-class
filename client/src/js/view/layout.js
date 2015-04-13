define(['react', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, R, $, BackboneReact, Backbone) {
    return React.createClass({
        mixins: [Backbone.React.Component.mixin],
        render: function () {
            var DOM = React.DOM;

            return DOM.div({key: 'root'}, [
                R.map(function(stylesheet, i) {
                    return DOM.link({key: i, rel: 'stylesheet', href: stylesheet});
                }, this.state.model.stylesheets),

                DOM.div({key: -1, id: 'wrapper', className: !this.state.model.sideBarVisible ? 'toggled' : ''}, [
                    this.props.sidebar,
                    this.props.header,
                    DOM.div({key: 'container-fluid', className: 'container-fluid'}, [
                        DOM.div({key: 'row', className: 'row'}, [
                            DOM.div({id: 'content', key: 'content', className: 'col-lg-12'}, [
                                this.state.model.activeFeature.content
                            ])
                        ])
                    ])
                ])
            ]);
        }
    });
});