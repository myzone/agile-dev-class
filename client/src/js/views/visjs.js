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

            var nodes = [], _tempNodes = [], edges = [], _tempEdges = [], betaNodes = [], betaEdges = [];

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


            /*******************************/

            _.each(collection2Read, function (dependence){
                //edges = [];
                if(dependence.dependent || dependence.basic)
                {
                    _tempEdges.push({
                        from: dependence.basic.courseId,
                        to: dependence.dependent.courseId
                        //label: depend.label
                    });
                }
            });

            _.each(_tempEdges, function(edge){
                betaEdges[edge.from+'_'+edge.to] = edge;
            });

            _.mapObject(betaEdges, function(edge){
                edges.push(edge);
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
                        enabled: true,
                        layout: layoutMethod,
                        levelSeparation: 350,
                        direction: 'LR',
                        nodeSpacing: 3000
                    },
                    dragNodes: false,
                    nodes: {
                        borderWidth: 0.1,
                        shape: 'dot',
                        radius: 15,
                        fontSize: 14,
                        scaleFontWithValue: true,
                        fontDrawThreshold: 11,
                        color: {
                            background: "#ABABAB",
                            border: "#337AB7",
                            highlight: {
                                background: '#D1D1D1'
                                //border: 'red'
                            }
                        }
                    },
                    edges: {
                        style: "arrow",
                        color: "#999AFD"
                    },
                    smoothCurves: false,
                    width: '1400px',
                    height: '600px'

                };
                network = new vis.Network(container, data, options);

                network.on('hoverNode', function (properties) {
                    console.log(properties);
                });
            }
            return React.DOM.div({'ref': 'visDiv', className: 'fillParent'});
        }
    });

});
