define(['react', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, R, $, BackboneReact, Backbone) {
    return React.createClass({
        mixins: [Backbone.React.Component.mixin],
        render: function () {
            var DOM = React.DOM;
            var collection2Read = this.state.collection;
            var view = this.props.view;

            return DOM.div({}, [
                R.map(function (course, i) {
                    return React.createElement(view, {key: i, model: course});
                }, collection2Read)
            ]);
        }
    });
});