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

