### Server

```
npm install express --save
npm install --save connect-history-api-fallback
```

### server.js
```
const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const app = express();



const staticFileMiddleware = express.static(path.join(__dirname, 'dist'));
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

const port = 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
```


#### ServerDemon.sh
- /home/protected/ <br>
```node server```


#### Proxy
- prot : http
- base URI : /
- doc root : /
- port: 8080

#### ci/cd heh
- server.js server files from /home/public/dist

#### UpdateMe.sh
```
cd /home/public
rm -rf dist
git clone https://github.com/luciantin/tiamat

cd tiamat
npm install
npm run build
mv dist ./..

cd /home/public
rm -rf tiamat

```