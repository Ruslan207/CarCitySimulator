System.register(["./world", "./main"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var world_1, main_1;
    var Target, Car;
    return {
        setters:[
            function (world_1_1) {
                world_1 = world_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
            Target = (function () {
                function Target(destination) {
                    this.destination = destination;
                }
                return Target;
            }());
            Car = (function () {
                function Car() {
                    this.targets = [];
                    this.path = new world_1.WorldNodes();
                    var _this = this;
                    main_1.world.events.subscribe('change_road', function () {
                        _this.getPath();
                    });
                }
                Car.prototype.addTarget = function (destination) {
                    var target = new Target(destination);
                    this.targets.unshift(target);
                };
                Car.prototype.getPath = function () {
                    if (this.targets.length > 0) {
                        var src = this.currentCell;
                        var target = this.targets[0];
                        var three = main_1.world.getNodes();
                    }
                };
                return Car;
            }());
            exports_1("Car", Car);
        }
    }
});
//# sourceMappingURL=car.js.map