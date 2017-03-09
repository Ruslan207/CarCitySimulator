System.register(["./main"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var main_1;
    var BuildingType, Parking, Building;
    return {
        setters:[
            function (main_1_1) {
                main_1 = main_1_1;
            }],
        execute: function() {
            (function (BuildingType) {
                BuildingType[BuildingType["Home"] = 0] = "Home";
                BuildingType[BuildingType["Office"] = 1] = "Office";
                BuildingType[BuildingType["Mall"] = 2] = "Mall";
                BuildingType[BuildingType["GasStation"] = 3] = "GasStation";
            })(BuildingType || (BuildingType = {}));
            Parking = (function () {
                function Parking(capacity) {
                    this.capacity = capacity;
                    this.cars = [];
                }
                return Parking;
            }());
            Building = (function () {
                function Building(length, width, height, x, y, type, parkingCapacity, linked) {
                    this.length = length;
                    this.width = width;
                    this.height = height;
                    this.x = x;
                    this.y = y;
                    this.type = type;
                    this.linked = linked;
                    this.parking = new Parking(parkingCapacity);
                    for (var _i = 0, linked_1 = linked; _i < linked_1.length; _i++) {
                        var node = linked_1[_i];
                        main_1.world.addRoadNode(node);
                    }
                }
                return Building;
            }());
            exports_1("Parking", Parking);
            exports_1("Building", Building);
            exports_1("BuildingType", BuildingType);
        }
    }
});
//# sourceMappingURL=building.js.map