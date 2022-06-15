var assert = require("node:assert/strict");
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
var requiredRange5 = [1000, null]; // добавил свой вариант
var isRangesIntersecting = function (priceRange, requiredRange) {
    var _a, _b, _c, _d;
    var lowLimit = Math.max((_a = priceRange[0]) !== null && _a !== void 0 ? _a : -Infinity, (_b = requiredRange[0]) !== null && _b !== void 0 ? _b : -Infinity);
    var hightLimit = Math.min((_c = priceRange[1]) !== null && _c !== void 0 ? _c : Infinity, (_d = requiredRange[1]) !== null && _d !== void 0 ? _d : Infinity);
    return lowLimit <= hightLimit;
};
var filterCourses = function (arrayOfCourses, requiredRange) { return arrayOfCourses.filter(function (course) {
    var minCoursePrice = course.prices[0];
    var maxCoursePrice = course.prices[1];
    if (minCoursePrice === null && maxCoursePrice === null) {
        return false;
    }
    else {
        return isRangesIntersecting(course.prices, requiredRange);
    }
}); };
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
    { name: 'Courses in England', prices: [0, 100] },
    { name: 'Courses in Italy', prices: [100, 200] },
    { name: 'Courses in Russia', prices: [null, 400] },
    { name: 'Courses in China', prices: [50, 250] },
    { name: 'Courses in USA', prices: [200, null] },
    { name: 'Courses in Kazakhstan', prices: [56, 324] }
], expected3 = [
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
], expected4 = [
    { name: 'Courses in Italy', prices: [100, 200] },
    { name: 'Courses in Russia', prices: [null, 400] },
    { name: 'Courses in China', prices: [50, 250] },
    { name: 'Courses in USA', prices: [200, null] },
    { name: 'Courses in Kazakhstan', prices: [56, 324] }
], expected5 = [];
assert.deepStrictEqual(result1, expected1);
assert.deepStrictEqual(result2, expected2);
assert.deepStrictEqual(result3, expected3);
assert.deepStrictEqual(result4, expected4);
assert.deepStrictEqual(result5, expected5);
