const Benchmark = require("benchmark");

// https://atcoder.jp/contests/dp/tasks/dp_a
// A - Frog 1

/**
 * A - Frog 1
 * @param {Array<number>} xs
 */
function a__frog_1(xs) {
  function go(n) {
    if (n == 0) {
      return 0;
    } else if (n == 1) {
      return go(n - 1) + Math.abs(xs[n] - xs[n - 1]);
    } else {
      return Math.min(
        go(n - 1) + Math.abs(xs[n] - xs[n - 1]),
        go(n - 2) + Math.abs(xs[n] - xs[n - 2])
      );
    }
  }

  return go(xs.length - 1);
}

/**
 * A - Frog 1（メモ化）
 * @param {Array<number>} xs
 */
function a__frog_1_memo(xs) {
  const len = xs.length;
  const memo = Array(len);

  function go(n) {
    if (memo[n]) {
      return memo[n];
    } else {
      let result;

      if (n == 0) {
        result = 0;
      } else if (n == 1) {
        result = go(n - 1) + Math.abs(xs[n] - xs[n - 1]);
      } else {
        result = Math.min(
          go(n - 1) + Math.abs(xs[n] - xs[n - 1]),
          go(n - 2) + Math.abs(xs[n] - xs[n - 2])
        );
      }

      memo[n] = result;
      return result;
    }
  }

  return go(len - 1);
}

/**
 * A - Frog 1（DP）
 * @param {Array<number>} xs
 */
function a__frog_1_dp(xs) {
  const n = xs.length - 1;
  const dp = Array(n);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    if (i == 1) {
      dp[i] = Math.abs(xs[i] - xs[i - 1]);
    } else {
      dp[i] = Math.min(
        dp[i - 1] + Math.abs(xs[i] - xs[i - 1]),
        dp[i - 2] + Math.abs(xs[i] - xs[i - 2])
      );
    }
  }

  return dp[n];
}

new Benchmark.Suite()
  .add("A - Frog 1 [10, 30, 40, 20]【DPなし】", () => {
    a__frog_1([10, 30, 40, 20]);
  })
  .add("A - Frog 1 [10, 30, 40, 20]【メモ化】", () => {
    a__frog_1_memo([10, 30, 40, 20]);
  })
  .add("A - Frog 1 [10, 30, 40, 20]【DPあり】", () => {
    a__frog_1_dp([10, 30, 40, 20]);
  })
  .add("A - Frog 1 [10, 10]【DPなし】", () => {
    a__frog_1([10, 10]);
  })
  .add("A - Frog 1 [10, 10]【メモ化】", () => {
    a__frog_1_memo([10, 10]);
  })
  .add("A - Frog 1 [10, 10]【DPあり】", () => {
    a__frog_1_dp([10, 10]);
  })
  .add("A - Frog 1 [30, 10, 60, 10, 60, 50]【DPなし】", () => {
    a__frog_1([30, 10, 60, 10, 60, 50]);
  })
  .add("A - Frog 1 [30, 10, 60, 10, 60, 50]【メモ化】", () => {
    a__frog_1_memo([30, 10, 60, 10, 60, 50]);
  })
  .add("A - Frog 1 [30, 10, 60, 10, 60, 50]【DPあり】", () => {
    a__frog_1_dp([30, 10, 60, 10, 60, 50]);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .run();
