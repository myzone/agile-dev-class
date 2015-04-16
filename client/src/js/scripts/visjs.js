define(['vis'], function(vis){
    network = null;
    var layoutMethod = "direction";

    function destroy() {
        if (network !== null) {
            network.destroy();
            network = null;
        }
    }

    function draw() {
        if($('#graph-content').length == 0)
            return false;
        destroy();
        degrees=[
            {
                id: '1',
                degree: 'Software engineering',
                courses: [
                    {
                        id: '2',
                        name: 'Data Science',
                        topics:[
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

        edgesData= {
            1:  {
                from: 1,
                to: 2,
                label: 'course'
            },
            2:  {
                from: 1,
                to: 3,
                label: 'course'
            },
            3:  {
                from: 1,
                to: 4,
                label: 'course'
            },
            4:  {
                from: 2,
                to: 5,
                label: 'topic'
            },
            5:  {
                from: 2,
                to: 6,
                label: 'topic'
            }
        };

        var nodes = [];
        var edges = [];

        _.each( degrees, function( degree ){
            nodes.push({
                id: degree.id,
                label: degree.degree
            });
            _.each( degree.courses, function( course ){
                nodes.push({
                    id: course.id,
                    label: course.name
                });
                _.each( course.topics, function( topic ){
                    nodes.push({
                        id: topic.id,
                        label: topic.name
                    });
                });
            });
        });

        //console.log(nodes);
        _.each( edgesData, function( edge ) {
            edges.push({
                from: edge.from,
                to: edge.to,
                label: edge.label
            });
        });

        // create a network
        var container = document.getElementById('graph-content');
        var data = {
            nodes: nodes,
            edges: edges
        };

        var options = {
            hierarchicalLayout: {
                layout: layoutMethod
            },
            edges: {style:"arrow"},
            smoothCurves:false,
            width: '100%',
            height: '600px'

        };
        network = new vis.Network(container, data, options);
        // add event listeners
        //network.on('select', function(params) {
        //    document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
        //});

        //network.redraw();
    }

    return {
        network: network,
        draw: draw
    };

});
