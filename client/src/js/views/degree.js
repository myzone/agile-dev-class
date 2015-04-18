define(['react', 'react-bootstrap', 'ramda', 'views/graph'], function (React, ReactBootstrap, R, GraphView) {
    var ModalView = React.createClass({
        mixins: [ReactBootstrap.OverlayMixin],

        getInitialState: function () {
            return {
                isModalOpen: false
            };
        },

        handleToggle: function () {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        },

        render: function () {
            return React.createElement(ReactBootstrap.OverlayTrigger, {
                overlay: React.createElement(ReactBootstrap.Tooltip, {}, 'show dependencies')
            }, React.createElement(ReactBootstrap.Glyphicon, {
                onClick: this.handleToggle,
                glyph: 'education',
                alt: 'show dependecies'
            }))
        },

        renderOverlay: function () {
            if (!this.state.isModalOpen)
                return React.createElement('span', null);


            return React.createElement(ReactBootstrap.Modal, {
                    title: 'Dependencies',
                    onRequestHide: this.handleToggle,
                    className: 'fullscreen'
                },
                React.createElement(GraphView, {}),
                React.createElement('div', {className: 'modal-footer'},
                    React.createElement(ReactBootstrap.Button, {onClick: this.handleToggle}, 'Close')
                )
            );
        }
    });

    return React.createClass({
        render: function () {
            var DOM = React.DOM;
            var degree = this.props.model;

            return React.createElement(ReactBootstrap.Well, {}, [
                DOM.h1({key: 'name'}, [
                    degree.name,
                    DOM.span({}, ' '),
                    DOM.span({className: 'small'}, React.createElement(ModalView, {}))
                ]),

                DOM.div({key: 'courses'}, [
                    DOM.h2({key: -1}, 'Courses'),
                    R.map(function (course, i) {
                        return DOM.span({key: i}, [
                            React.createElement(ReactBootstrap.Badge, {key: 'course'}, course.name),
                            DOM.span({key: 'space'}, ' ')
                        ])
                    }, degree.courses)
                ])
            ]);
        }
    });
});