define(['react', 'react-bootstrap', 'ramda'], function (React, ReactBootstrap, R) {
    return React.createClass({
        render: function () {
            var DOM = React.DOM;
            var degree = this.props.model;

            return React.createElement(ReactBootstrap.Well, {}, [
                DOM.h1({key: 'name'}, degree.name),

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