const assert = require("node:assert/strict");

let courses: Course[] = [
  { name: "Courses in England", prices: [0, 100] },
  { name: "Courses in Germany", prices: [500, null] },
  { name: "Courses in Italy", prices: [100, 200] },
  { name: "Courses in Russia", prices: [null, 400] },
  { name: "Courses in China", prices: [50, 250] },
  { name: "Courses in USA", prices: [200, null] },
  { name: "Courses in Kazakhstan", prices: [56, 324] },
  { name: "Courses in France", prices: [null, null] },
];
let requiredRange1: PriceRange = [null, 200];
let requiredRange2: PriceRange = [100, 350];
let requiredRange3: PriceRange = [200, null];
let requiredRange4: PriceRange = [200, 300]; // добавил свой вариант
let requiredRange5: PriceRange = [1000, null]; // добавил свой вариант

type PriceType = number | null;
type PriceRange = [PriceType, PriceType];

interface Course {
  name: string;
  prices: PriceRange;
}

const isRangesIntersecting = (priceRange: PriceRange, requiredRange:PriceRange): boolean => {
    const lowLimit = Math.max(priceRange[0] ?? -Infinity, requiredRange[0] ?? -Infinity);
    const highLimit = Math.min(priceRange[1] ??  Infinity, requiredRange[1] ??  Infinity);

    return lowLimit <= highLimit;
  }
  
  const filterCourses =(arrayOfCourses:Course[], requiredRange:PriceRange):Course[] => arrayOfCourses.filter(course => {
      const minCoursePrice: PriceType = course.prices[0];
      const maxCoursePrice: PriceType = course.prices[1]
      if(minCoursePrice === null && maxCoursePrice === null) {
          return false
      } else {
       return isRangesIntersecting(course.prices, requiredRange)
      }
  });
  


const result1 = filterCourses(courses, requiredRange1);
const result2 = filterCourses(courses, requiredRange2);
const result3 = filterCourses(courses, requiredRange3);
const result4 = filterCourses(courses, requiredRange4);
const result5 = filterCourses(courses, requiredRange5);

const expected1 = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
  ],
  expected2 = [
    { name: 'Courses in England', prices: [ 0, 100 ] },
    { name: 'Courses in Italy', prices: [ 100, 200 ] },
    { name: 'Courses in Russia', prices: [ null, 400 ] },
    { name: 'Courses in China', prices: [ 50, 250 ] },
    { name: 'Courses in USA', prices: [ 200, null ] },
    { name: 'Courses in Kazakhstan', prices: [ 56, 324 ] }
  ],
  expected3 = [
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
  ],
  expected4 = [
    { name: 'Courses in Italy', prices: [ 100, 200 ] },
    { name: 'Courses in Russia', prices: [ null, 400 ] },
    { name: 'Courses in China', prices: [ 50, 250 ] },
    { name: 'Courses in USA', prices: [ 200, null ] },
    { name: 'Courses in Kazakhstan', prices: [ 56, 324 ] }
  ],
  expected5 = [
    { name: 'Courses in Germany', prices: [ 500, null ] },
    { name: 'Courses in USA', prices: [ 200, null ] }
  ];

assert.deepStrictEqual(result1, expected1);
assert.deepStrictEqual(result2, expected2);
assert.deepStrictEqual(result3, expected3);
assert.deepStrictEqual(result4, expected4);
assert.deepStrictEqual(result5, expected5);
