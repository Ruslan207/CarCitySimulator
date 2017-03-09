var EventManager = (function () {
    function EventManager() {
        this.events = {};
    }
    EventManager.prototype.subscribe = function (eventName, callback) {
        if (this.events[eventName] instanceof Array) {
            this.events[eventName].push(callback);
        }
        else {
            this.events[eventName] = [callback];
        }
    };
    EventManager.prototype.trigger = function (eventName, data) {
        if (this.events[eventName] instanceof Array) {
            this.events[eventName](data);
        }
    };
    return EventManager;
}());
//# sourceMappingURL=event_manager.js.map