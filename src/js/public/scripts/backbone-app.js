var app = {
    Collections: {}
};
// we need to define model before the collection
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
    model: CourseModel, //define class of models in collection
    initialize: function(){ 
        
        // by default show all courses
        this.searchStr = '';
        
        // set view of collection
        this.view = new CoursesListView({collection: this}); 
        
        // bind render of model on reset collection
        this.on('reset',this.view.render, this.view);
        
        // fetch data from url with reset
        this.fetch({reset: true});
    }
});

// view of collection
var CoursesListView = Backbone.View.extend({
    el: $('#content'), // DOM-element of widget'а
    
    events: { 
        'click #search_courses_btn': 'searchCourses'
    },
        
    initialize: function() {
        this.$list = $('#list',this.$el); // set $list where will be rendered search results (inside $el)
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
        // костыль пока (пока нет view у sidebar)
        $('ul.sidebar-nav li a#a_f1').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if(app.Collections.courses_collection){
            app.Collections.courses_collection.view.notFound(); // заглушка пока
        }
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
    },
    
    function3: function(){
        $('ul.sidebar-nav li a#a_f3').addClass('bg-primary').parent().siblings().find('a.bg-primary').removeClass('bg-primary');
        if(app.Collections.courses_collection){
            app.Collections.courses_collection.view.notFound();
        }
    }
});

app.router = new Router();

