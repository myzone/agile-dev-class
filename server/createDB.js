var ObjectId = require('mongodb').ObjectId;
var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var async = require('async');
var gen = require('random-seed').create('degree');
gen.initState();

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

var fs = require('fs');
var path = require('path');
var realData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config/db_real_data.json'), 'utf8'));

var degreeId = ObjectId();
realData.degrees[0]._id = degreeId;
realData.degrees[0].description = descriptions[gen(descriptions.length - 1)];

var topicsIdsMap = {};
var courseIdsMap = {};

_.each(realData.topics, function(topic) {
  var objId = ObjectId();
  topicsIdsMap[topic._id] = objId;
  topic._id = objId;
  topic.degreeId = degreeId;
  topic.description = descriptions[gen(descriptions.length - 1)];
});

_.each(realData.courses, function(course) {
  var objId = ObjectId();
  courseIdsMap[course._id] = objId;
  course._id = objId;
  course.description = descriptions[gen(descriptions.length - 1)];
  var count = gen.intBetween(3, 10);
  var total = count;
  while( count > 0 )
  {
    course.milestones.push({
      _id: ObjectId(),
      name: "Milestone " + (total - count + 1),
      description: descriptions[gen(descriptions.length - 1)]
    });
    --count;
  }
  _.each(course.topics, function(topic) {
    topic.originId = topicsIdsMap[topic.originId];
    topic.description = descriptions[gen(descriptions.length - 1)];
  });
});

_.each(realData.topics, function(topic) {
  topic.courseId = courseIdsMap[topic.courseId];
});

_.each(realData.degrees[0].courses, function(course) {
  course._id = courseIdsMap[course._id];
});

_.each(realData.dependencies, function(dependency) {
  dependency._id = ObjectId();
  dependency.degreeId = degreeId;
  dependency.basic.courseId = courseIdsMap[dependency.basic.courseId];
  dependency.basic.topicId = topicsIdsMap[dependency.basic.topicId];
  dependency.dependent.courseId = courseIdsMap[dependency.dependent.courseId];
  dependency.dependent.topicId = topicsIdsMap[dependency.dependent.topicId];
});

// Connection URL
var url = 'mongodb://localhost:27017/degree';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  var coursesCollection = db.collection( 'courses' );
  var degreesCollection = db.collection( 'degrees' );
  var topicsCollection = db.collection( 'topics' );
  var coverageCollection = db.collection( 'coverage' );
  var dependencyCollection = db.collection( 'dependencies' );

  var asyncTasksData = [];

  asyncTasksData.push({
    collection: coursesCollection,
    data: realData.courses
  });

  asyncTasksData.push({
    collection: degreesCollection,
    data: realData.degrees
  });

  asyncTasksData.push({
    collection: topicsCollection,
    data: realData.topics
  });

  /*asyncTasksData.push({
    collection: coverageCollection,
    data: []
  });*/

  asyncTasksData.push({
    collection: dependencyCollection,
    data: realData.dependencies
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