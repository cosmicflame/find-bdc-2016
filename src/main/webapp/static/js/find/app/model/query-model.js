define([
    'backbone'
], function(Backbone) {

    var EventsProxy = function(queryModel) {
        this.model = queryModel;

        this.listenTo(this.model, 'all', function(event) {
            if (event !== 'change' || (this.model.get('queryText') && !_.isEmpty(this.model.get('indexes')))) {
                this.trigger.apply(this, arguments);
            }
        });
    };

    _.extend(EventsProxy.prototype, Backbone.Events);

    _.each(['get', 'set', 'getFieldTextString', 'setParametricFieldText'], function(methodName) {
        EventsProxy.prototype[methodName] = function() {
            return this.model[methodName].apply(this.model, arguments);
        }
    });

    return EventsProxy;
});

