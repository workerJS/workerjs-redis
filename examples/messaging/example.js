var messaging = require("../../")().messaging;

var i = 0;

messaging.on("test", function(data){
	console.log(data);
}).then(function(){
	setInterval(function() { 
		messaging.emit("test", i++);
	}, 100);
});

