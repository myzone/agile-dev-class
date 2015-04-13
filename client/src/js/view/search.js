define(['react', 'react-bootstrap', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, ReactBootstrap, R, $, BackboneReact, Backbone) {
    return React.createClass({
        getInitialState: function() {
            return {
                value: ''
            }
        },
        render: function () {
            return React.createElement(ReactBootstrap.Input, {
                key: 'input',
                type: 'text',
                ref: 'input',
                value: this.state.value,
                placeholder: this.props.placeholder,
                buttonAfter: React.createElement(ReactBootstrap.Button, {
                    bsStyle: 'primary',
                    onClick: function () {
                        this.props.onSearch(this.state.value);
                    }.bind(this)
                }, "Search"),
                onChange: function () {
                    this.setState({value: this.refs.input.getValue()});
                }.bind(this)
            });
        }
    });
});