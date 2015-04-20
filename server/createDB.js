var ObjectId = require('mongodb').ObjectId;
var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var async = require('async');
var gen = require('random-seed').create('degree');
gen.initState();

// Connection URL
var url = 'mongodb://localhost:27017/degree';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  var descriptions = [
  'Фразы и демонстрации внешнего вида контента просмотра. В различных языках те или иные буквы встречаются с языками, использующими латинский. Планируется использовать при запуске проекта чему. Использующими латинский алфавит, могут возникнуть. Некоторые вопросы, связанные с языками, использующими латинский алфавит, могут возникнуть небольшие. Книгопечатник вырвал отдельные фразы и т.д демонстрационная, то и проектах. При оценке качества восприятия макета еще в различных языках.',
  'Благодаря чему появляется возможность получить более длинный неповторяющийся набор. Веб-разработчик знает, что все. К обитателям водоемов книгопечатании еще в длине наиболее. Считается, что такое текст-рыба планируется использовать. По сей день веб-дизайнерами для вставки на сайтах и. Языке, который планируется использовать. Название, не имеет никакого отношения к обитателям водоемов отдельные фразы и смысловую. Зла средневековый книгопечатник вырвал отдельные.',
  'Руку при оценке качества восприятия макета вывод, что все же лучше. Кириллице значительно различается нечитабельность текста сыграет. Ориентированных на латыни и проектах, ориентированных на том языке, который планируется использовать. Используется он веб-дизайнерами для вставки на сайтах и даже. Ipsum на кириллице значительно различается древнеримскому философу цицерону, ведь именно из. В xvi веке внешнего вида. Вывод, что все же лучше использовать в качестве рыбы.',
  'Символов на латыни и демонстрации внешнего вида. Философу цицерону, ведь именно из его применили в различных. Никакого отношения к обитателям водоемов смысловую нагрузку ему нести совсем необязательно внешнего. Является знаменитый lorem ipsum обязан. Связанные с разной частотой, имеется разница в книгопечатании. Трактата о пределах добра и по сей день. Известным рыбным текстом является знаменитый lorem который планируется. Считается, что впервые его трактата о пределах добра и проектах.',
  'Могут возникнуть небольшие проблемы: в различных языках. Иные буквы встречаются с использованием lorem ipsum обязан древнеримскому философу цицерону ведь. Добра и по сей день вырвал. Ipsum на латыни и смысловую нагрузку. Собственные варианты текста исключительно демонстрационная, то и т.д своим появлением lorem название. Веб-разработчик знает, что впервые его трактата о пределах добра и слова. Имеется разница в качестве рыбы текст.',
  'Проектах, ориентированных на руку при запуске проекта исключительно демонстрационная. Отсюда напрашивается вывод, что такое текст-рыба более того нечитабельность. Длинный неповторяющийся набор слов. трактата, благодаря чему появляется возможность получить более того. Ведь именно из его трактата о пределах. Планируется использовать в xvi веке отдельные фразы и по. С использованием lorem трактата, благодаря чему появляется возможность. Собственные варианты текста на интернет-страницы и демонстрации внешнего вида контента, просмотра шрифтов.',
  'Книгопечатании еще в качестве рыбы текст на основе оригинального трактата. Так как цель применения такого текста исключительно. Фразы и по сей день. Даже с языками, использующими латинский алфавит могут. Каждый веб-разработчик знает, что такое текст-рыба возникают некоторые. Ipsum на том языке, который планируется использовать при запуске проекта длине наиболее. Сайтах и проектах, ориентированных на том языке который. Нести совсем необязательно абзацев, отступов и смысловую нагрузку ему нести совсем.',
  'Применения такого текста на название. Цель применения такого текста сыграет. Веб-разработчик знает, что впервые его применили. Такое текст-рыба демонстрации внешнего вида. Использовать при запуске проекта ему нести совсем необязательно текст-рыбу. Внешнего вида контента, просмотра шрифтов, абзацев, отступов и слова. Ему нести совсем необязательно некоторые. Использовать при запуске проекта небольшие проблемы: в книгопечатании. Вариантов lorem ipsum на основе оригинального трактата, благодаря чему появляется возможность получить.',
  'Языке, который планируется использовать в качестве рыбы текст на кириллице значительно различается. Обязан древнеримскому философу цицерону, ведь именно из его трактата. Различных языках те или иные буквы встречаются с языками, использующими латинский алфавит. Lorem ipsum, кроме того, есть специальные генераторы, создающие собственные варианты. Контента, просмотра шрифтов, абзацев отступов. Длинный неповторяющийся набор слов. своим появлением lorem ipsum. Из его применили в книгопечатании еще в различных.',
  'Абзацев, отступов и демонстрации внешнего. Же лучше использовать при оценке качества восприятия. То и зла средневековый книгопечатник вырвал отдельные фразы и на латыни. Исключительно демонстрационная, то и по сей день. Текста на том языке, который планируется использовать в длине наиболее распространенных слов. Нечитабельность текста сыграет на кириллический контент – написание символов на основе оригинального. Фразы и зла средневековый книгопечатник вырвал отдельные.'
  ];
  
  var courses = [
    {
      _id: ObjectId(),
      name: 'Data Science',
	  description: descriptions[0],
      topics: [
        {
          _id: ObjectId(),
          name: 'The Data Scientist’s Toolbox',
	      description: descriptions[1] 
        },
        {
          _id: ObjectId(),
          name: 'R Programming',
	      description: descriptions[2]
        },
        {
          _id: ObjectId(),
          name: 'Getting and Cleaning Data',
	      description: descriptions[3]
        },
        {
          _id: ObjectId(),
          name: 'Exploratory Data Analysis',
	      description: descriptions[4]
        },
        {
          _id: ObjectId(),
          name: 'Reproducible Research',
	      description: descriptions[5]
        },
        {
          _id: ObjectId(),
          name: 'Statistical Inference',
	      description: descriptions[6]
        },
        {
          _id: ObjectId(),
          name: 'Regression Models',
	      description: descriptions[7]
        },
        {
          _id: ObjectId(),
          name: 'Practical Machine Learning',
	      description: descriptions[8]
        }
      ],
      milestones: [
        {
          _id: ObjectId(),
          name: 'Milestone 1',
	      description: descriptions[9]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 2',
	      description: descriptions[0]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 3',
	      description: descriptions[1]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 4',
	      description: descriptions[2]
        }
      ]
    },
    {
      _id: ObjectId(),
      name: 'Data Mining',
	  description: descriptions[3],
      topics: [
        {
          _id: ObjectId(),
          name: 'Pattern Discovery in Data Mining',
	      description: descriptions[4]
        },
        {
          _id: ObjectId(),
          name: 'Text Retrieval and Search Engines',
	      description: descriptions[5]
        },
        {
          _id: ObjectId(),
          name: 'Cluster Analysis in Data Mining',
	      description: descriptions[6]
        },
        {
          _id: ObjectId(),
          name: 'Text Mining and Analytics',
	      description: descriptions[7]
        },
        {
          _id: ObjectId(),
          name: 'Data Visualization',
	      description: descriptions[8]
        }
      ],
      milestones: [
        {
          _id: ObjectId(),
          name: 'Milestone 1',
	      description: descriptions[9]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 2',
	      description: descriptions[0]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 3',
	      description: descriptions[1]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 4',
	      description: descriptions[2]
        }
      ]
    },
    {
      _id: ObjectId(),
      name: 'An Introduction to Interactive Programming in Python',
	  description: descriptions[3],
      topics: [
        {
          _id: ObjectId(),
          name: 'Statements, expressions, variables',
	      description: descriptions[4]
        },
        {
          _id: ObjectId(),
          name: 'Functions, logic, conditionals',
	      description: descriptions[5]
        },
        {
          _id: ObjectId(),
          name: 'Event-driven programming, local and global variables, buttons and input fields',
	      description: descriptions[6]
        },
        {
          _id: ObjectId(),
          name: 'The canvas, static drawing, timers, interactive drawing',
	      description: descriptions[7]
        },
        {
          _id: ObjectId(),
          name: 'Lists, keyboard input, motion, positional/velocity control',
	      description: descriptions[8]
        },
        {
          _id: ObjectId(),
          name: 'Mouse input, more lists, dictionaries, images',
	      description: descriptions[9]
        },
        {
          _id: ObjectId(),
          name: 'Classes, tiled images',
	      description: descriptions[0]
        },
        {
          _id: ObjectId(),
          name: 'Acceleration and friction, spaceship class, sprite class, sound',
	      description: descriptions[1]
        },
        {
          _id: ObjectId(),
          name: 'Sets, groups of sprites, collisions, sprite animation',
	      description: descriptions[2]
        }
      ],
      milestones: [
        {
          _id: ObjectId(),
          name: 'Milestone 1',
	      description: descriptions[3]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 2',
	      description: descriptions[4]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 3',
	      description: descriptions[5]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 4',
	      description: descriptions[6]
        }
      ]
    },
    {
      _id: ObjectId(),
      name: 'Principles of Computing',
	  description: descriptions[7],
      topics: [
        {
          _id: ObjectId(),
          name: 'Introduction, coding standards',
	      description: descriptions[8]
        },
        {
          _id: ObjectId(),
          name: 'Testing, plotting',
	      description: descriptions[9]
        },
        {
          _id: ObjectId(),
          name: 'Probability, randomness, objects/references',
	      description: descriptions[0]
        },
        {
          _id: ObjectId(),
          name: 'Combinatorics, generators, debugging',
	      description: descriptions[1]
        },
        {
          _id: ObjectId(),
          name: 'Counting, growth of functions, higher-order functions',
	      description: descriptions[2]
        },
        {
          _id: ObjectId(),
          name: 'Searching, data structures, inheritance',
	      description: descriptions[3]
        },
        {
          _id: ObjectId(),
          name: 'Recursion, sorting, reading files',
	      description: descriptions[4]
        },
        {
          _id: ObjectId(),
          name: 'Trees, game solvers, testing',
	      description: descriptions[5]
        },
        {
          _id: ObjectId(),
          name: 'Design of abstractions, invariants, models',
	      description: descriptions[6]
        }
      ],
      milestones: [
        {
          _id: ObjectId(),
          name: 'Milestone 1',
	      description: descriptions[7]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 2',
	      description: descriptions[8]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 3',
	      description: descriptions[9]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 4',
	      description: descriptions[0]
        }
      ]
    },
    {
      _id: ObjectId(),
      name: 'Algorithmic Thinking',
	  description: descriptions[1],
      topics: [
        {
          _id: ObjectId(),
          name: 'Graphs and brute-force algorithms',
	      description: descriptions[2]
        },
        {
          _id: ObjectId(),
          name: 'Algorithmic efficiency and BFS',
	      description: descriptions[3]
        },
        {
          _id: ObjectId(),
          name: 'Divide and conquer',
	      description: descriptions[4]
        },
        {
          _id: ObjectId(),
          name: 'Dynamic programming',
	      description: descriptions[5]
        },
        {
          _id: ObjectId(),
          name: 'Degree distributions for graphs',
	      description: descriptions[6]
        },
        {
          _id: ObjectId(),
          name: 'Connected components and graph resilience',
	      description: descriptions[7]
        },
        {
          _id: ObjectId(),
          name: 'Closest pairs and clustering algorithms',
	      description: descriptions[8]
        }
      ],
      milestones: [
        {
          _id: ObjectId(),
          name: 'Milestone 1',
	      description: descriptions[9]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 2',
	      description: descriptions[0]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 3',
	      description: descriptions[1]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 4',
	      description: descriptions[2]
        }
      ]
    },
    {
      _id: ObjectId(),
      name: 'Text Retrieval and Search Engines',
	  description: descriptions[3],
      topics: [
        {
          _id: ObjectId(),
          name: 'Introduction to text data mining',
	      description: descriptions[4]
        },
        {
          _id: ObjectId(),
          name: 'Basic concepts in text retrieval',
	      description: descriptions[5]
        },
        {
          _id: ObjectId(),
          name: 'Information retrieval models',
	      description: descriptions[6]
        },
        {
          _id: ObjectId(),
          name: 'Implementation of a search engine',
	      description: descriptions[7]
        },
        {
          _id: ObjectId(),
          name: 'Evaluation of search engines',
	      description: descriptions[8]
        },
        {
          _id: ObjectId(),
          name: 'Advanced search engine technologies',
	      description: descriptions[9]
        }
      ],
      milestones: [
        {
          _id: ObjectId(),
          name: 'Milestone 1',
	      description: descriptions[0]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 2',
	      description: descriptions[1]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 3',
	      description: descriptions[2]
        },
        {
          _id: ObjectId(),
          name: 'Milestone 4',
	      description: descriptions[3]
        }
      ]
    }
  ];

  var degree = {
    _id: ObjectId(),
    name: 'Software engineering',
	description: descriptions[1],
    courses: []
  };
  var allTopics = [];
  var coverage = [];
  var dependencies = [];
  _.each( courses, function( course ){

    _.each(course.topics, function(topic) {
      var extendedTopic = _.clone(topic);
      extendedTopic.degreeId = degree._id;
      extendedTopic.courseId = course._id;
      extendedTopic.courseName = course.name;
      allTopics.push(extendedTopic);
    });

    var someTopics = _.filter(course.topics, function(topic) {
      return Math.round(gen.random());
    });

    var courseCoverage = [];
    _.each(course.milestones, function(milestone) {
      courseCoverage = courseCoverage.concat(_.map(someTopics, function(topic) {
        return {
          _id: ObjectId(),
          degreeId: degree._id,
          courseId: course._id,
          topicId: topic._id,
          milestoneId: milestone._id,
          weight: gen.random()
        };
      }));
    });

    coverage = coverage.concat(courseCoverage);

    degree.courses.push({
      _id: course._id,
      name: course.name
    });
  });

  _.each(allTopics, function(topic) {
    var otherTopics = _.filter(allTopics, function(item) {
      return topic.courseId !== item.courseId;
    });
    var someTopics = _.filter(otherTopics, function(item) {
      return Math.round(gen.random());
    });
    _.each(someTopics, function(item) {
      var dependency = {
        _id: ObjectId(),
        degreeId: degree._id,
        basic: {
          courseId: item.courseId,
          courseName: item.courseName,
          topicId: item._id,
          topicName: item.name
        },
        dependent: {
          courseId: topic.courseId,
          courseName: topic.courseName,
          topicId: topic._id,
          topicName: topic.name
        }
      };
      dependencies.push(dependency);
    });
  });

  var index = 1;
  _.each(allTopics, function(topic) {
    topic.description = "Some awesome description " + index;
    delete topic.courseName;
    ++index;
  });

  var coursesCollection = db.collection( 'courses' );
  var degreesCollection = db.collection( 'degrees' );
  var topicsCollection = db.collection( 'topics' );
  var coverageCollection = db.collection( 'coverage' );
  var dependencyCollection = db.collection( 'dependencies' );

  var asyncTasksData = [];

  asyncTasksData.push({
    collection: coursesCollection,
    data: courses
  });

  asyncTasksData.push({
    collection: degreesCollection,
    data: [degree]
  });

  asyncTasksData.push({
    collection: topicsCollection,
    data: allTopics
  });

  asyncTasksData.push({
    collection: coverageCollection,
    data: coverage
  });

  asyncTasksData.push({
    collection: dependencyCollection,
    data: dependencies
  });

  var asyncTasks = [];

  _.each(asyncTasksData, function(dataElement) {
    asyncTasks.push(function(callback) {
      dataElement.collection.insert(dataElement.data, function(err,result) {

        if (err) {
          console.log(err.stack);
        } else {
          callback();
        }

      });
    });
  });

  async.parallel(asyncTasks, function() {
    console.log("Data was populated");
    db.close();
  });
});