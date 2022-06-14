var assert = require('node:assert/strict');
var courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];
var requiredRange1 = [null, 200];
var requiredRange2 = [100, 350];
var requiredRange3 = [200, null];
var requiredRange4 = [200, 300]; // добавил свой вариант
var requiredRange5 = [null, 60]; // добавил свой вариант
var filterCourses = function (arrayOfCourses, requiredRange) {
    var minRequiredPrice = requiredRange[0], maxRequiredPrice = requiredRange[1];
    var filterCallback = function (course) {
        var maxCoursePrice = course.prices[1];
        var minCoursePrice = course.prices[0];
        if (minCoursePrice === null && maxCoursePrice === null) {
            return false;
        }
        if (minRequiredPrice === null) {
            return maxRequiredPrice >= minCoursePrice;
        }
        else if (maxRequiredPrice === null) {
            return (minRequiredPrice <= maxCoursePrice || minCoursePrice >= minRequiredPrice);
        }
        else {
            return minCoursePrice > maxRequiredPrice ||
                minRequiredPrice > maxCoursePrice
                ? false
                : true;
        }
    };
    var result = arrayOfCourses.filter(filterCallback);
    return result;
};
var result1 = filterCourses(courses, requiredRange1);
var result2 = filterCourses(courses, requiredRange2);
var result3 = filterCourses(courses, requiredRange3);
var result4 = filterCourses(courses, requiredRange4);
var result5 = filterCourses(courses, requiredRange5);
var expected1 = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
], expected2 = [
    { name: 'Courses in Germany', prices: [500, null] },
    { name: 'Courses in Italy', prices: [100, 200] },
    { name: 'Courses in Russia', prices: [null, 400] },
    { name: 'Courses in China', prices: [50, 250] },
    { name: 'Courses in USA', prices: [200, null] },
    { name: 'Courses in Kazakhstan', prices: [56, 324] }
];
assert.deepStrictEqual(result1, expected1);
assert.deepStrictEqual(result2, expected2);
// console.log(result1, result2, result3, result4, result5);
