Exercises for https://fullstackopen.com/en/part4/

**App structure**
```
index.js
app.js

controllers
 | blogs.js

models
 | blog.js

utils
 | config.js
 | logger.js
 | list_helper.js
 | middleware.js

 tests
  | blog_api.test.js
  | blog.test.js
  | teardown.js
  | test_helper.js
```

**Required .env values**
```
MONGODB_URI=mongodb+srv://<url>
TEST_MONGODB_URI=mongodb+srv://<url>
PORT=3001
```

**Scripts**
```
npm start
npm test
npm run dev
npm run lint
```