var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var courses = [
    { name: "Java 101", category: "PROG", dateCreated: new Date("2015-01-01T18:06:47-04:00"), description: "Wow" },
    { name: "MongoDB 101", category: "DB", dateCreated: new Date("2015-02-01T18:06:47-04:00"), description: "Good" },
    { name: "Express 101", category: "PROG", dateCreated: new Date("2015-03-01T18:06:47-04:00"), description: "Better" },
    { name: "AngularJS 101", category: "WEB", dateCreated: new Date("2015-04-01T18:06:47-04:00"), description: "Best" },
    { name: "NodeJS 101", category: "PROG", dateCreated: new Date("2015-05-01T18:06:47-04:00"), description: "Awesome" }
];

// gets all courses
app.get('/api/courses', function (req, res) {
    res.json(courses);
});

// gets course at index (used when editing)
app.get('/api/course/:index', function (req, res) {
    var index = req.params.index;
    res.json(courses[index]);
});

// delete course at index
app.delete('/api/course/:index', function (req, res) {
    var index = req.params.index;
    courses.splice(index, 1);
    res.json(courses);
});

// adds course
app.post('/api/course/', function (req, res) {
    var course = req.body;
    courses.push(course);
    res.json(courses);
});

// edit course
app.put('/api/course/:index', function (req, res) {
    var index = req.params.index;
    var updated = req.body;
    courses[index] = updated;
    res.json(courses);
});

app.listen(port, ip)