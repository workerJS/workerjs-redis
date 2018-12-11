var redis = require("redis");

var EventEmitter = require('events');

var messaging = {
	_listening: {}, // List of channels I subscribed to, to avoid duplicate subscribe

	_client: undefined,
	_rclient: undefined,

	_eventEmitter: new EventEmitter(),

	on: function(channel, listener){
		return new Promise(function(resolve, reject){
			if(messaging._listening[channel] == undefined){
				messaging._listening[channel] = true;

				messaging._rclient.subscribe(channel, function(err, data){
					if(err !== null){
						reject(err);
					}

					messaging._rclient.on("message", function (messageChannel, message) {
						if(messageChannel == channel){
							messaging._eventEmitter.emit(channel, JSON.parse(message))
						}
					});

					resolve(messaging._eventEmitter.on(channel, listener));
				});
			} else {
				resolve(messaging._eventEmitter.on(channel, listener));
			}
		});
	},

	emit: function(channel, message){
		return new Promise(function(resolve, reject){
			messaging._client.publish(channel, message, function(err, data){
				if(err !== null){
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
}

module.exports = function(){
	if(messaging._client == undefined){
		// Separate client for reading and writing

		messaging._client = redis.createClient.apply(this, arguments);
		messaging._rclient = redis.createClient.apply(this, arguments);
	}

	return Promise.resolve(messaging);
}

