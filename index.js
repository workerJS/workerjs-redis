// Just singleton for reducing number of sockets

var queue = require("./src/queue");
var messaging = require("./src/messaging");

var redis = {
	queue: undefined,
	messaging: undefined
};

module.exports = function(options){
	if(redis.messaging == undefined){
		redis.queue = queue(options);
		redis.messaging = messaging(options);
	}

	return redis;
}

