class EventManager{
	private events = {};

	public subscribe(eventName:string, callback:Function):void{
		if (this.events[eventName] instanceof Array){
			this.events[eventName].push(callback);
		} else {
			this.events[eventName] = [callback];
		}
	}

	public trigger(eventName:string, data:any):void{
		if (this.events[eventName] instanceof Array){
			this.events[eventName](data);
		}
	}
}