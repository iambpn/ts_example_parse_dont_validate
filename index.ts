// Example: parse don't validate => https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

// There are two ways to solve partial function problem: (partial function: functions that were aware of runtime error)
// 1. (Managing expectations): Let the caller handle the runtime exceptions if it occurred.
// 2. (Paying it forward): Making sure the function argument takes data that cannot result in runtime error.

// example of 1: (Managing Exceptions)
/**
 * Use of this solution is recommended if another solution is viable because it has the burden of managing the error on every function call
 * which also inturn causes performance issue.
 */
function getFirstElementThrowsError(data: any[]) {
  try {
    return data[1]; // possibility of error since array can be empty
  } catch (error) {
    throw error;
  }
}
// example of 2: (Paying it forward)
/**
 * Use of this solution when ever possible is recommended because it reduces the burden of managing the error on every function call
 * and also improves performance by not requiring to check the return data for error.
 */
function getFirstElementWithStrongArgs(data: any[] /* Some how making this args to not take empty array. Not possible in js*/) {
  return data[1]; // not possibility of error since data is nto empty
}

/**
 * Based on above solution. We can create two different ways of validation and they are
 */

// Two ways of validating the value:
// 1. (validate): Just validating the value and throwing the error
// 2. (parse): Validating the value, and change the type of the value to the validated type or throw error.

// example of 1: (validate)
/**
 * Nothing fancy just validating the data type and throws error if its not same.
 * Here the type checking is going waste. We don't preserve the type checking data. (more on this below)
 */
function validateString(data: any): void {
  if (typeof data !== "string") {
    throw new Error("Data is not the type of string");
  }
}

//example of 2: (parse)
/**
 * Here same as above but it has return.
 * Here the type checking is preserved through the return data. (more on this below)
 *
 */
function parseSrting(data: any) {
  if (typeof data !== "string") {
    throw new Error("Data is not the type of string");
  }
  return data;
}

// Main section
const data: any = ""; // let this data be unknown

validateString(data); // if no error then data is string
const stringData = parseSrting(data); // if no error then data is string and also returned data has concrete type.
