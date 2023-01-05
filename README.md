# ts_example_parse_dont_validate
My take and code example of this blog: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

---

There are two ways to solve partial function problem: (partial function: functions that were aware of runtime error)

1. (Managing expectations): Let the caller handle the runtime exceptions if it occurred.
2. (Paying it forward): Making sure the function argument takes data that cannot result in runtime error.

example of 1: (Managing Exceptions)

- Use of this solution is not recommended if another solution is viable because it has the burden of managing the error on every function call which also inturn causes performance issue.

```js
function getFirstElementThrowsError(data: any[]) {
  try {
    return data[1]; // possibility of error since array can be empty
  } catch (error) {
    throw error;
  }
}
```

example of 2: (Paying it forward)

- Use of this solution when ever possible is recommended because it reduces the burden of managing the error on every function call and also improves performance by not requiring to check the return data for error.

```js
function getFirstElementWithStrongArgs(data: [string, ...string[]]) {
  return data[1]; // would not throw error since data is not empty
}
```

Based on above solution.

We can create two different ways of validation and they are:

1. (validate): Just validating the value and throwing the error
2. (parse): Validating the value, and change the type of the value to the validated type or throw error.

example of 1: (validate)

- Nothing fancy just validating the data type and throws error if its not same.
- Here the type checking is going waste. We don't preserve the type checking data. (more on this below)

```js
function validateString(data: any): void {
  if (typeof data !== "string") {
    throw new Error("Data is not the type of string");
  }
}
```

example of 2: (parse)

- Here same as above but it has return.
- Here the type checking is preserved through the return data. (more on this below)

```js
function parseString(data: any) {
  if (typeof data !== "string") {
    throw new Error("Data is not the type of string");
  }
  return data;
}
```

Main section:

```js
const data: any = ""; // let this data be unknown

validateString(data); // if no error then data is string
const stringData = parseString(data); // if no error then data is string and also returned data has concrete type.
```
