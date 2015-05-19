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

        render: function () {
            var collection2Read = this.state.collection;
            console.log(collection2Read);


            network = null;
            var layoutMethod = "direction";

            function destroy() {
                if (network !== null) {
                    network.destroy();
                    network = null;
                }
            }
            destroy();

            var nodes = [];
            var edges = [];

            _.each(collection2Read, function (topic){
                nodes = [];
                if(topic.dependent)
                {
                    nodes.push({
                        id: topic.dependent.courseId,
                        label: topic.dependent.courseName
                    });
                    nodes.push({
                        id: topic.dependent.topicId,
                        label: topic.dependent.topicName
                    });
                }
            });

            _.each(collection2Read, function (topic){
                edges = [];
                if(topic.dependent)
                {
                    edges.push({
                        from: topic.dependent.courseId,
                        to: topic.dependent.topicId
                        //label: depend.label
                    });
                }
            });

            // create a network
            if(React.findDOMNode(this.refs.visDiv)) {
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
            }
            return React.DOM.div({'ref': 'visDiv', className: 'fillParent'});
        }
    });

});
