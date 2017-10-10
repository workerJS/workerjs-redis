var queue = require("../../")().queue;

queue.on("tasks", function(data){
	console.log(data);
});

