var ObjectId = require('mongodb').ObjectId;
var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/degree';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var courses = [
        {
            _id: ObjectId(),
            name: 'Data Science',
            topics: [
                {
                    _id: ObjectId(),
                    name: 'The Data Scientist’s Toolbox'
                },
                {
                    _id: ObjectId(),
                    name: 'R Programming'
                },
                {
                    _id: ObjectId(),
                    name: 'Getting and Cleaning Data'
                },
                {
                    _id: ObjectId(),
                    name: 'Exploratory Data Analysis'
                },
                {
                    _id: ObjectId(),
                    name: 'Reproducible Research'
                },
                {
                    _id: ObjectId(),
                    name: 'Statistical Inference'
                },
                {
                    _id: ObjectId(),
                    name: 'Regression Models'
                },
                {
                    _id: ObjectId(),
                    name: 'Practical Machine Learning'
                }
            ],
            milestones: [
                {
                    _id: ObjectId(),
                    name: 'Milestone 1'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 2'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 3'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 4'
                }
            ]
        },
        {
            _id: ObjectId(),
            name: 'Data Mining',
            topics: [
                {
                    _id: ObjectId(),
                    name: 'Pattern Discovery in Data Mining'
                },
                {
                    _id: ObjectId(),
                    name: 'Text Retrieval and Search Engines'
                },
                {
                    _id: ObjectId(),
                    name: 'Cluster Analysis in Data Mining'
                },
                {
                    _id: ObjectId(),
                    name: 'Text Mining and Analytics'
                },
                {
                    _id: ObjectId(),
                    name: 'Data Visualization'
                }
            ],
            milestones: [
                {
                    _id: ObjectId(),
                    name: 'Milestone 1'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 2'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 3'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 4'
                }
            ]
        },
        {
            _id: ObjectId(),
            name: 'An Introduction to Interactive Programming in Python',
            topics: [
                {
                    _id: ObjectId(),
                    name: 'Statements, expressions, variables'
                },
                {
                    _id: ObjectId(),
                    name: 'Functions, logic, conditionals'
                },
                {
                    _id: ObjectId(),
                    name: 'Event-driven programming, local and global variables, buttons and input fields'
                },
                {
                    _id: ObjectId(),
                    name: 'The canvas, static drawing, timers, interactive drawing'
                },
                {
                    _id: ObjectId(),
                    name: 'Lists, keyboard input, motion, positional/velocity control'
                },
                {
                    _id: ObjectId(),
                    name: 'Mouse input, more lists, dictionaries, images'
                },
                {
                    _id: ObjectId(),
                    name: 'Classes, tiled images'
                },
                {
                    _id: ObjectId(),
                    name: 'Acceleration and friction, spaceship class, sprite class, sound'
                },
                {
                    _id: ObjectId(),
                    name: 'Sets, groups of sprites, collisions, sprite animation'
                }
            ],
            milestones: [
                {
                    _id: ObjectId(),
                    name: 'Milestone 1'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 2'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 3'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 4'
                }
            ]
        },
        {
            _id: ObjectId(),
            name: 'Principles of Computing',
            topics: [
                {
                    _id: ObjectId(),
                    name: 'Introduction, coding standards'
                },
                {
                    _id: ObjectId(),
                    name: 'Testing, plotting'
                },
                {
                    _id: ObjectId(),
                    name: 'Probability, randomness, objects/references'
                },
                {
                    _id: ObjectId(),
                    name: 'Combinatorics, generators, debugging'
                },
                {
                    _id: ObjectId(),
                    name: 'Counting, growth of functions, higher-order functions'
                },
                {
                    _id: ObjectId(),
                    name: 'Searching, data structures, inheritance'
                },
                {
                    _id: ObjectId(),
                    name: 'Recursion, sorting, reading files'
                },
                {
                    _id: ObjectId(),
                    name: 'Trees, game solvers, testing'
                },
                {
                    _id: ObjectId(),
                    name: 'Design of abstractions, invariants, models'
                }
            ],
            milestones: [
                {
                    _id: ObjectId(),
                    name: 'Milestone 1'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 2'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 3'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 4'
                }
            ]
        },
        {
            _id: ObjectId(),
            name: 'Algorithmic Thinking',
            topics: [
                {
                    _id: ObjectId(),
                    name: 'Graphs and brute-force algorithms'
                },
                {
                    _id: ObjectId(),
                    name: 'Algorithmic efficiency and BFS'
                },
                {
                    _id: ObjectId(),
                    name: 'Divide and conquer'
                },
                {
                    _id: ObjectId(),
                    name: 'Dynamic programming'
                },
                {
                    _id: ObjectId(),
                    name: 'Degree distributions for graphs'
                },
                {
                    _id: ObjectId(),
                    name: 'Connected components and graph resilience'
                },
                {
                    _id: ObjectId(),
                    name: 'Closest pairs and clustering algorithms'
                }
            ],
            milestones: [
                {
                    _id: ObjectId(),
                    name: 'Milestone 1'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 2'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 3'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 4'
                }
            ]
        },
        {
            _id: ObjectId(),
            name: 'Text Retrieval and Search Engines',
            topics: [
                {
                    _id: ObjectId(),
                    name: 'Introduction to text data mining'
                },
                {
                    _id: ObjectId(),
                    name: 'Basic concepts in text retrieval'
                },
                {
                    _id: ObjectId(),
                    name: 'Information retrieval models'
                },
                {
                    _id: ObjectId(),
                    name: 'Implementation of a search engine'
                },
                {
                    _id: ObjectId(),
                    name: 'Evaluation of search engines'
                },
                {
                    _id: ObjectId(),
                    name: 'Advanced search engine technologies'
                }
            ],
            milestones: [
                {
                    _id: ObjectId(),
                    name: 'Milestone 1'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 2'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 3'
                },
                {
                    _id: ObjectId(),
                    name: 'Milestone 4'
                }
            ]
        }
    ];

    var degree = {
        _id: ObjectId(),
        name: 'Software engineering',
        courses: []
    };

    _.each( courses, function( course ){
        degree.courses.push({
            _id: course._id,
            name: course.name
        });
    } );

    var coursesCollection = db.collection( 'courses' );
    coursesCollection.insert( courses, function(err, result){
        assert.equal(err, null);
        var degreesCollection = db.collection( 'degrees' );
        degreesCollection.insert( [degree], function( err, result ){
            console.log("Data was populated");
            db.close();
        } );
    });
});