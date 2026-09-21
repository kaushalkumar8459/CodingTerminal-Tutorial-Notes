# Day 091 — Solution: Async Assessment

```js
const API = "https://jsonplaceholder.typicode.com";
async function retryFetch(url, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function buildReport(userIds) {
  console.log(`Fetching ${userIds.length} users...`);
  const userResults = await Promise.allSettled(
    userIds.map((id, index) => {
      console.log(`Fetching user ${index + 1} of ${userIds.length}...`);
      return retryFetch(`${API}/users/${id}`);
    }),
  );
  const successfulUsers = userResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
  const postResults = await Promise.allSettled(
    successfulUsers.map((user) => retryFetch(`${API}/posts?userId=${user.id}`)),
  );
  const results = successfulUsers.map((user, index) => {
    const posts = postResults[index];
    return posts.status === "fulfilled"
      ? { user, posts: posts.value, postCount: posts.value.length }
      : { user, posts: [], postCount: 0, postError: posts.reason.message };
  });
  return {
    successCount: results.filter((item) => !item.postError).length,
    failureCount:
      userResults.filter((result) => result.status === "rejected").length +
      results.filter((item) => item.postError).length,
    results,
  };
}

buildReport([1, 2, 999]).then(console.log).catch(console.error);
```

`allSettled()` is used because one user failure should not discard successful users. User requests run in parallel; posts start in a second parallel round because their URLs require user IDs first.

## Interview-style questions

**11.** Posts need the successfully loaded user's ID, so they cannot be formed until the first round resolves.

**12.** `Promise.all()` would reject the complete user batch on one failure, losing the partial successes.

**13.** The report starts all user fetches together, keeps individual outcomes, starts post fetches for successful users, combines each result, and returns counts plus data.
