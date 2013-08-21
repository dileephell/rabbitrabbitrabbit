// Declare variables used
var MessageView, MessageListView;

// View for messages
MessageView = Backbone.View.extend({
    tagName: 'li',

    render: function () {

        // Create the HTML
        var template = _.template('<%= text %>');
        this.$el.html(template(this.model.toJSON()));

        // Return the object
        return this;
    }
});

// View for message list
MessageListView = Backbone.View.extend({
    intialize: function () {
        // Set up event listeners
        this.collection.on('sync', this.render);
        this.collection.on('create', this.render);
    },

    render: function () {

        // Cache selector
        this.container = $('ul#content');

        // Empty out any existing content
        this.container.empty();

        // Render messages
        this.collection.each(function (message) {
            var view = new MessageView({ model: message });
            this.container.append(view.render().el);
        }, this);
    }
});