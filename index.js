// Just singleton for reducing number of sockets

var queue = require("./src/queue");
var messaging = require("./src/messaging");

var redis = {
	queue: undefined,
	messaging: undefined
};

module.exports = function(){
	if(redis.messaging == undefined){
		redis.queue = queue.apply(this, arguments);
		redis.messaging = messaging.apply(this, arguments);
	}

	return redis;
}

