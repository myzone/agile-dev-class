define(['react',
        'react-bootstrap',
        'ramda',
        'vis',
        'backbone-react',
        'backbone'
        ], function(React, ReactBootstrap, R, vis, BackboneReact, Backbone){
    topics = [];

    return React.createClass({
        mixins: [Backbone.React.Component.mixin],

        componentDidMount: function () {
            network = null;
            var layoutMethod = "direction";

            function destroy() {
                if (network !== null) {
                    network.destroy();
                    network = null;
                }
            }
            destroy();
            //topics = this.props.onSearch('data');
            topics.push(this.props.model);

            var collection2Read = this.state.collection;
            console.log(collection2Read);


            degrees = [
                {
                    id: '1',
                    degree: 'Software engineering',
                    courses: [
                        {
                            id: '2',
                            name: 'Data Science',
                            topics: [
                                {
                                    id: '5',
                                    name: 'The Data Scientist’s Toolbox'
                                },
                                {
                                    id: '6',
                                    name: 'R Programming'
                                }
                            ]
                        },
                        {
                            id: '3',
                            name: 'Data Mining'
                        },
                        {
                            id: '4',
                            name: 'Principles of Computing'
                        }
                    ]
                }
            ];
            edgesData = {
                1: {
                    //from: '55375b1f65b4c34d1e1fd165',
                    //to: '55375b1f65b4c34d1e1fd166',
                    from: 1,
                    to: 2,
                    label: 'topic'
                },
                2: {
                    from: 1,
                    to: 3,
                    label: 'course'
                },
                3: {
                    from: 1,
                    to: 4,
                    label: 'course'
                },
                4: {
                    from: 2,
                    to: 5,
                    label: 'topic'
                },
                5: {
                    from: 2,
                    to: 6,
                    label: 'topic'
                }
            };

            var nodes = [];
            var edges = [];

            //_.each(topics, function (topic){
            //    nodes.push({
            //        id: topic._id,
            //        label: topic.name
            //    });
            //});
            _.each(degrees, function (degree) {
                nodes.push({
                    id: degree.id,
                    label: degree.degree,
                });
                _.each(degree.courses, function (course) {
                    nodes.push({
                        id: course.id,
                        label: course.name
                    });
                    _.each(course.topics, function (topic) {
                        nodes.push({
                            id: topic.id,
                            label: topic.name
                        });
                    });
                });
            });

            _.each(edgesData, function (edge) {
                edges.push({
                    from: edge.from,
                    to: edge.to,
                    label: edge.label
                });
            });

            // create a network
            var container = React.findDOMNode(this.refs.visDiv);
            var data = {
                nodes: nodes,
                edges: edges
            };

            var options = {
                hierarchicalLayout: {
                    layout: layoutMethod,
                    nodeSpacing: 300
                },
                dragNodes: false,
                nodes: {
                    shape: 'dot',
                    radius: 20,
                    color: {
                        background: "orange",
                        border: "blue"
                        //highlight: {
                        //    background: 'pink',
                        //    border: 'red'
                        //}
                    }
                },
                edges: {
                    style: "arrow"
                    //color: "red"
                },
                smoothCurves: false,
                width: '100%',
                height: '600px'

            };
            network = new vis.Network(container, data, options);
            // add event listeners
            //network.on('select', function(params) {
            //    document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
            //});

            //network.redraw();
        },
        render: function () {
            var collection2Read = this.state.collection;
            console.log(collection2Read);
            return React.DOM.div({'ref': 'visDiv', className: 'fillParent'});
        }
    });

});
