# workerjs-redis

Abstraction layer for using queue and messaging as event listeners. 

## Messaging

### Receive

``` javascript
const messaging = require("workerjs-redis")().messaging;

messaging.on("test", function(data){
	console.log(data);
}).then(function(){
	console.log("Subscribed");
}).catch(function(){
	console.log("Error while subscribing");
});

```

### Send

``` javascript
const messaging = require("workerjs-redis")().messaging;

messaging.emit("test", 123).then(function(){
	console.log("Sent");
}).catch(function(){
	console.log("Error while sending");
});

```

## Queue

### Receive

``` javascript
var queue = require("workerjs-redis")().queue;

queue.on("tasks", function(data){
	console.log(data);
});
```

### Send

``` javascript
var queue = require("workerjs-redis")().queue;

queue.emit("tasks", "123").then(function(){
	console.log("Sent");
}).catch(function(){
	console.log("Error while sending");
});
```

