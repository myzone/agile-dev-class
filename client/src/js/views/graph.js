define(['react', 'react-bootstrap', 'ramda', 'three'], function (React, ReactBootstrap, R, Three) {
    return React.createClass({
        componentDidMount: function () {
            var canvas = React.findDOMNode(this.refs.canvas);

            var scene = new Three.Scene();
            var camera = new Three.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

            var renderer = new Three.WebGLRenderer({
                canvas: canvas
            });
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

            var geometry = new Three.SphereGeometry(1, 32, 32);
            var material = new Three.MeshBasicMaterial({color: 0xff0000});
            var cube = new Three.Mesh(geometry, material);


            scene.add(cube);

            camera.position.z = 5;

            var render = function () {
                requestAnimationFrame(render);

                cube.rotation.x += 0.1;
                cube.rotation.y += 0.1;

                renderer.render(scene, camera);
            };

            render();
        },
        render: function () {
            return React.DOM.canvas({'ref': 'canvas', className: 'fillParent'});
        }
    });
});