define(['react', 'react-bootstrap', 'ramda'], function (React, ReactBootstrap, R) {
    return React.createClass({
        render: function () {
            var DOM = React.DOM;
            var topic = this.props.model;

            return React.createElement(ReactBootstrap.Panel, {header: DOM.h2({}, topic.name)}, topic.description);
        }
    });
});