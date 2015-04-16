var app = angular.module("OnlineUniversity", []);

app.controller("OnlineUniversityController", function ($scope, $http) {

    // initial load of all courses
    $http.get("/api/courses")
    .success(function(response) {
        $scope.courses = response;
    });

    // delete a course
    $scope.deleteCourse = function (index) {
        bootbox.confirm({
            title: "Remove Course",
            message: "Remove this course?",
            callback: function (result) {
                if (result) {
                    $http.delete('/api/course/' + index)
                    .success(function (response) {
                        $scope.courses = response;
                    });
                }
            }
        });
    };

    // show modal when add course button is clicked
    $scope.addCourse = function () {
        $scope.add = true;
        $scope.newCourse = { name: "", category: "", dateCreated: new Date(), description: "" };
        $scope.selectedcourseindex = null;
        $("#add-modal").modal();
    };

    // show modal for editing
    $scope.editCourse = function (course, index) {
        $scope.add = false;
        course.dateCreated = new Date(course.dateCreated);
        $scope.newCourse = course;
        $scope.selectedcourseindex = index;
        $("#add-modal").modal();
    };

    // save edited course
    $scope.saveCourse = function (course) {
        if ($scope.add) {
            $http.post("/api/course/", course)
            .success(function (response) {
                $scope.courses = response;
            });
        } else {
            $http.put("/api/course/" + $scope.selectedcourseindex, course)
            .success(function (response) {
                $scope.courses = response;
            });
        }

        $("#add-modal").modal('hide');
    };

    $scope.formatDate = function (date) {
        var formatteddate = new Date(date).toISOString().substring(0, 10);
        return formatteddate;
    };

});