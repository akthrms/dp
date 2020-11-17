const Benchmark = require("benchmark");

/**
 * フィボナッチ数列
 * @param {number} n
 */
function fib(n) {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

/**
 * フィボナッチ数列（メモ化）
 * @param {number} n
 */
function fib_memo(n) {
  const memo = {};

  function recur(m) {
    if (m in memo) {
      return memo[m];
    } else {
      let result;

      if (m == 0) {
        result = 0;
      } else if (m == 1) {
        result = 1;
      } else {
        result = recur(m - 2) + recur(m - 1);
      }

      memo[m] = result;
      return result;
    }
  }

  return recur(n);
}

/**
 * フィボナッチ数列（DP）
 * @param {number} n
 */
function fib_dp(n) {
  const dp = [...Array(n)];
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }

  return dp[n];
}

new Benchmark.Suite()
  .add("フィボナッチ数列 * 10【DPなし】", () => {
    fib(10);
  })
  .add("フィボナッチ数列 * 10【メモ化】", () => {
    fib_memo(10);
  })
  .add("フィボナッチ数列 * 10【DPあり】", () => {
    fib_dp(10);
  })
  .add("フィボナッチ数列 * 30【DPなし】", () => {
    fib(30);
  })
  .add("フィボナッチ数列 * 30【メモ化】", () => {
    fib_memo(30);
  })
  .add("フィボナッチ数列 * 30【DPあり】", () => {
    fib_dp(30);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .run();
