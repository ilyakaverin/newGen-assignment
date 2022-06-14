const assert = require('node:assert/strict');

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
  let requiredRange5: PriceRange= [null, 60]; // добавил свой вариант

  type PriceType = number | null;
  type PriceRange = [ PriceType,  PriceType]

  interface Course {
      name: string;
      prices: PriceRange
  }
  
  const filterCourses = (arrayOfCourses: Course[], requiredRange: PriceRange): Course[] => {
    const [minRequiredPrice, maxRequiredPrice] = requiredRange;
  
    const filterCallback = (course: Course) => {
      const maxCoursePrice: PriceType = course.prices[1];
      const minCoursePrice: PriceType = course.prices[0];

      if (minCoursePrice === null && maxCoursePrice === null) {
        return false;
      } 
  
      if (minRequiredPrice === null) {
        return maxRequiredPrice >= minCoursePrice; 
      } else if (maxRequiredPrice === null) {
        return (
          minRequiredPrice <= maxCoursePrice || minCoursePrice >= minRequiredPrice
        );
      } else {
        return minCoursePrice > maxRequiredPrice ||
          minRequiredPrice > maxCoursePrice
          ? false
          : true;
      }
    };

    const result: Course[] = arrayOfCourses.filter(filterCallback);
  
    return result;
  };
  
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
  ], expected2  = [
    { name: 'Courses in Germany', prices: [ 500, null ] },
    { name: 'Courses in Italy', prices: [ 100, 200 ] },
    { name: 'Courses in Russia', prices: [ null, 400 ] },
    { name: 'Courses in China', prices: [ 50, 250 ] },
    { name: 'Courses in USA', prices: [ 200, null ] },
    { name: 'Courses in Kazakhstan', prices: [ 56, 324 ] }

  ]

  assert.deepStrictEqual(result1, expected1);
  assert.deepStrictEqual(result2, expected2);
 

  // console.log(result1, result2, result3, result4, result5);
