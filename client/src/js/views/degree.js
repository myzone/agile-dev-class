define(['react', 'react-bootstrap', 'ramda', 'three'], function (React, ReactBootstrap, R, Three) {
    var ThreeView = React.createClass({
        componentDidMount: function () {
            var canvas = React.findDOMNode(this.refs.canvas);

            var scene = new Three.Scene();
            var camera = new Three.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

            var renderer = new Three.WebGLRenderer({
                canvas: canvas
            });
            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

            var geometry = new Three.BoxGeometry(1, 1, 1);
            var material = new Three.MeshBasicMaterial({color: 0x00ff00});
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
            },  React.createElement(ReactBootstrap.Glyphicon, {
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
                React.createElement(ThreeView, {}),
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