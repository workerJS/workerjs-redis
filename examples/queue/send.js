var queue = require("../../")().queue;

setInterval(function(){
	queue.emit("tasks", "123");
}, 1000)

