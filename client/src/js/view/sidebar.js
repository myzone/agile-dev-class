define(['react', 'ramda', 'jquery', 'backbone-react', 'backbone'], function (React, R, $, BackboneReact, Backbone) {
    return React.createClass({
        mixins: [Backbone.React.Component.mixin],
        render: function () {
            var DOM = React.DOM;
            var model2Change = this.props.model;
            var model2Read = this.state.model;

            var SideBarItem = React.createClass({
                render: function () {
                    return DOM.a({
                        className: this.props.active ? 'bg-primary' : '',
                        onClick: function () {
                            model2Change.set('activeFeature', this.props.feature)
                        }.bind(this)
                    }, this.props.feature.name);
                }
            });

            var activeFeature = model2Read.activeFeature;
            var features = R.pipe(
                Object.keys,
                R.map(function(k){return model2Read.features[k]}),
                R.filter(function(feature){return !feature.hidden;})
            )(model2Read.features);

            return DOM.div({id: 'sidebar-wrapper'}, [
                DOM.ul({className: 'sidebar-nav'}, [
                    DOM.li({className: 'sidebar-brand'}),
                    R.map(function (feature, i) {
                        return DOM.li({key: i}, React.createElement(SideBarItem, {
                            active: feature === activeFeature,
                            feature: feature
                        }));
                    }, features)
                ])
            ]);
        }
    });
});
