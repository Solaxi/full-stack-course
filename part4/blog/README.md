Exercises for https://fullstackopen.com/en/part4/

**App structure**
```
index.js
app.js

controllers
 | blogs.js
 | users.js
 | login.js

models
 | blog.js
 | user.js

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
  | user_api.test.js
```

**Required .env values**
```
MONGODB_URI=mongodb+srv://<url>
TEST_MONGODB_URI=mongodb+srv://<url>
PORT=3001
SECRET=<SOMESECRETKEYFORTOKENAUTHETICATION>
```

**Scripts**
```
npm start
npm test
npm run dev
npm run lint
```