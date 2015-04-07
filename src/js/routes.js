module.exports.setup = function (app, handlers)
{
    app.get('/v1/degrees', handlers.degrees.getAll);
    app.get('/v1/degrees/:degreeId', handlers.degrees.getById);
    app.get('/v1/courses', handlers.courses.getAll);
    app.get('/v1/courses/:id', handlers.courses.getById);
    app.get('/v1/topics', handlers.topics.getAll);
    app.get('/v1/topics/:id', handlers.topics.getById);

    app.route('/')
        .get(function(req, res){
            res.render('index');
        })
        .post(function(req, res){
            res.render('index');
    });
};
