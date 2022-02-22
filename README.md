# NODE.JS Notes
<br>

## 1. How NodeJS differes from VanillaJS
1. Node runs on a server, not in a browser
2. Console is the terminal window
3. global object instead of window object
4. CommonJS modules instead of ES6 modules (uses require statement)
<br>
<hr>

## 2. What is Node.js Process Model?
- Node.js runs in a single process and application code runs in a single thread.
- All user requests handled by a single thread and all I/O work or long running job
is performed asynchronmously.
- Thus, single thread does not have to wait for request to complete and is free to handle next request.
<br>
<hr>

## 3. Explain concept of URL module in Node.js
URl module in Node.js splits up a web address into readable parts. 

```

const url = require("url");

```

Then parse and address with the `url.parse()` method and will return URL object with each part of the address as properties

```

const url = require('url');
const adr = 'http://localhost:8080/default.htm?year=2021&month=september';
const q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2021&month=september'

const qdata = q.query; //returns an object: { year: 2021, month: 'september' }
console.log(qdata.month); //returns 'september'


```
