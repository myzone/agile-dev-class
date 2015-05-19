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
            //console.log(collection2Read);


            network = null;
            var layoutMethod = "direction";

            function destroy() {
                if (network !== null) {
                    network.destroy();
                    network = null;
                }
            }
            destroy();

            var nodes = [], _tempNodes = [], edges = [], betaNodes = [];

            _.each(collection2Read, function (dependence){
                if(dependence.dependent || dependence.basic)
                {
                    _tempNodes.push({
                        id: dependence.basic.courseId,
                        label: dependence.basic.courseName
                    });
                    _tempNodes.push({
                        id: dependence.dependent.courseId,
                        label: dependence.dependent.courseName
                    });
                }
            });
            _.each(_tempNodes, function(node){
                betaNodes[node.id] = node;
            });

            _.mapObject(betaNodes, function(node){
                nodes.push(node);
            });


            _.each(collection2Read, function (dependence){
                //edges = [];
                if(dependence.dependent || dependence.basic)
                {
                    edges.push({
                        from: dependence.basic.courseId,
                        to: dependence.dependent.courseId
                        //label: depend.label
                    });
                }
            });

            console.log(edges);


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
                        levelSeparation: 150,
                        nodeSpacing: 3000
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
