var app = {
    Models: {},
    Views: {},
    Collections: {}
};

var CourseModel = Backbone.Model.extend({
    defaults: {
        name: ''
    },
    initialize: function(){
        this.view = new CourseView({model: this });
    }
});

var CourseView = Backbone.View.extend({
    template: _.template($('#course_view').html()),
    initialize: function(){
       this.setElement(this.template({ course: this.model.toJSON() }) );
   } 
});

var CoursesCollection = Backbone.Collection.extend({
    url: function(){ 
        return '/v1/courses?search='+this.searchStr+'&inTopics=true&inMilestones=true';
    },
    model: CourseModel,
    initialize: function(){ 
        this.searchStr = '';
        this.view = new CoursesListView({collection: this}); 
        this.on('reset',this.view.render, this.view);
        this.fetch({reset: true});
    }
});

var CoursesListView = Backbone.View.extend({
    el: $('#content'), // DOM элемент widget'а
    
    events: { 
        'click #search_courses_btn': 'searchCourses',
//        'change #search_courses_input': 'updateAttr'
    },
        
    initialize: function() {
        this.$list = $('#list',this.$el);
    },

    render: function () {            
        var self = this;
        this.$list.html('');
        if(this.collection.models.length == 0){
            this.notFound();
        } else {
            _.each(this.collection.models,function(model){ self.$list.append( model.view.$el ); });  
        }
    },
    
    notFound: function(){
        this.$list.html('<h2>Нет результатов</h2>');
    },
    
    searchCourses: function(e){
        var searchVal = $('#search_courses_input',this.$el).val();
        this.collection.searchStr = searchVal;
        this.collection.fetch({reset: true});
    }
});

var Router = Backbone.Router.extend({
    
    routes: {
        '': 'index',
        'course_search': 'course_search',
        '2': 'function2',
        '3': 'function3'
    },
    
    initialize: function(){
        Backbone.history.start();
    },
    
    index: function(){
        $('ul.sidebar-nav li a#a_f1').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if(app.Collections.courses_collection){
            app.Collections.courses_collection.view.notFound();
        }
        console.log('indexdd');
    },
    
    course_search: function(){
        $('ul.sidebar-nav li a#a_cs').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if(app.Collections.courses_collection){ 
            app.Collections.courses_collection.fetch({reset: true}); 
        } else {
            app.Collections['courses_collection'] = new CoursesCollection();
        }
    },
    
    function2: function(){
        $('ul.sidebar-nav li a#a_f2').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if(app.Collections.courses_collection){
            app.Collections.courses_collection.view.notFound();
        }
        console.log('func2');
    },
    
    function3: function(){
        $('ul.sidebar-nav li a#a_f3').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if(app.Collections.courses_collection){
            app.Collections.courses_collection.view.notFound();
        }
        console.log('func3');
    }
});
app.router = new Router();

