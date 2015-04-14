define(['react', 'react-bootstrap', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, ReactBootstrap, R, $, BackboneReact, Backbone) {
    return React.createClass({
        getInitialState: function() {
            return {
                value: ''
            }
        },
        render: function () {
            var search = function () {
                this.props.onSearch(this.props.value);
            }.bind(this);

            return React.createElement(ReactBootstrap.Input, {
                key: 'input',
                type: 'text',
                ref: 'input',
                value: this.props.value,
                placeholder: this.props.placeholder,
                buttonAfter: React.createElement(ReactBootstrap.Button, {
                    bsStyle: 'primary',
                    onClick: search
                }, "Search"),
                onChange: function () {
                    this.setState({value: this.refs.input.getValue()});
                    this.props.value = this.refs.input.getValue();
                }.bind(this),
                onKeyDown: function (e) {
                    if (e.nativeEvent.keyCode == 13) {
                        search();
                    }
                }
            });
        }
    });
});