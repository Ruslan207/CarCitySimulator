System.register(["GUID", "./road", "./parking_node"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var road_1, parking_node_1;
    var WorldNode, World;
    return {
        setters:[
            function (_1) {},
            function (road_1_1) {
                road_1 = road_1_1;
            },
            function (parking_node_1_1) {
                parking_node_1 = parking_node_1_1;
            }],
        execute: function() {
            WorldNode = (function () {
                function WorldNode(x, y, z) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this.childs = [];
                    this.id = (new GUID()).toString();
                }
                WorldNode.prototype.addChild = function (child) {
                    this.childs.push(child);
                };
                WorldNode.prototype.connectTo = function (parent) {
                    parent.addChild(this);
                };
                WorldNode.prototype.isNear = function (node) {
                    if (this.z == node.z &&
                        ((Math.abs(this.x - node.x) == 1 && this.y == node.y) ||
                            ((Math.abs(this.y - node.y) == 1 && this.x == node.x)))) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                return WorldNode;
            }());
            World = (function () {
                function World() {
                    this.nodes = [];
                }
                World.prototype.addRoadNode = function (road) {
                    for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                        var node = _a[_i];
                        if (node instanceof road_1.Road) {
                            road.setConnections(node);
                        }
                    }
                    this.nodes.push(road);
                    if (road instanceof road_1.Road) {
                        this.roads.push(road);
                    }
                    if (road instanceof parking_node_1.ParkingNode) {
                        this.parkings.push(road);
                    }
                };
                return World;
            }());
            exports_1("World", World);
            exports_1("WorldNode", WorldNode);
        }
    }
});
//# sourceMappingURL=world.js.map