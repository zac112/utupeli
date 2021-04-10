import settings from './settings.json';

class REST{	
	static post(endpoint, body, callback){
		if (typeof body === 'object')
			body = JSON.stringify(body);
		
		console.log("POST Sending body:"+body+" "+(typeof body));
		fetch(settings.server+":"+settings.port+"/"+endpoint, {
		  method: 'POST',
		  headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		  },
		  body: body
		})
		.then(response => response.json())
		.then(response => callback(response));
	}
	
	static get(endpoint, callback){		
		fetch(settings.server+":"+settings.port+"/"+endpoint)
		.then(response => response.json())
		.then(response => callback(response));
	}
}

export default REST;