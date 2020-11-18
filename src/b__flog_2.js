const Benchmark = require("benchmark");

// https://atcoder.jp/contests/dp/tasks/dp_b
// B - Frog 2

/**
 * B - Frog 2
 * @param {number} k
 * @param {Array<number>} xs
 */
function b__frog_2(k, xs) {
  const len = xs.length;
  const dp = Array(len).fill(Math.pow(10, 4));
  dp[0] = 0;
  dp[1] = Math.abs(xs[1] - xs[0]);

  for (let i = 2; i <= len - 1; i++) {
    for (let j = 1; j <= k && j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j] + Math.abs(xs[i] - xs[i - j]));
    }
  }

  return dp[len - 1];
}

console.assert(30 == b__frog_2(3, [10, 30, 40, 50, 20]));
console.assert(20 == b__frog_2(1, [10, 20, 10]));
console.assert(0 == b__frog_2(100, [10, 10]));
console.assert(40 == b__frog_2(4, [40, 10, 20, 70, 80, 10, 20, 70, 80, 60]));

new Benchmark.Suite()
  .add("B - Frog 2 (3, [10, 30, 40, 50, 20])", () => {
    b__frog_2(3, [10, 30, 40, 50, 20]);
  })
  .add("B - Frog 2 (1, [10, 20, 10])", () => {
    b__frog_2(1, [10, 20, 10]);
  })
  .add("B - Frog 2 (100, [10, 10])", () => {
    b__frog_2(100, [10, 10]);
  })
  .add("B - Frog 2 (4, [40, 10, 20, 70, 80, 10, 20, 70, 80, 60])", () => {
    b__frog_2(4, [40, 10, 20, 70, 80, 10, 20, 70, 80, 60]);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .run();
