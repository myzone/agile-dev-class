define(['react', 'react-bootstrap', 'ramda'], function (React, ReactBootstrap, R) {
    return React.createClass({
        render: function () {
            var DOM = React.DOM;
            var course = this.props.model;

            return React.createElement(ReactBootstrap.Well, {}, [
                DOM.h1({key: 'name'}, course.name),

                DOM.div({key: 'topics'}, [
                    DOM.h2({key: -1}, 'Income'),
                    R.map(function (topic, i) {
                        return DOM.span({key: i}, [
                            React.createElement(ReactBootstrap.Badge, {key: 'topic'}, topic.name),
                            DOM.span({key: 'space'}, ' ')
                        ])
                    }, course.topics)
                ]),

                DOM.div({key: 'milestones'}, [
                    DOM.h2({key: -1}, 'Milestones'),
                    R.map(function (milestone, i) {
                        return DOM.span({key: i}, [
                            React.createElement(ReactBootstrap.Badge, {key: 'milestone'}, milestone.name),
                            DOM.span({key: 'space'}, ' ')
                        ])
                    }, course.milestones)
                ])
            ]);
        }
    });
});