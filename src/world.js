System.register(["GUID", "./road", "./parking_node", "./event_manager"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var road_1, parking_node_1;
    var WorldNode, WorldNodes, World;
    return {
        setters:[
            function (_1) {},
            function (road_1_1) {
                road_1 = road_1_1;
            },
            function (parking_node_1_1) {
                parking_node_1 = parking_node_1_1;
            },
            function (_2) {}],
        execute: function() {
            WorldNode = (function () {
                function WorldNode(x, y, z) {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                    this._childs = new WorldNodes();
                    this.id = (new GUID()).toString();
                    this._removed = false;
                }
                Object.defineProperty(WorldNode.prototype, "removed", {
                    get: function () {
                        return this._removed;
                    },
                    set: function (value) {
                        this._removed = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorldNode.prototype, "childs", {
                    get: function () {
                        return this._childs;
                    },
                    enumerable: true,
                    configurable: true
                });
                WorldNode.prototype.addChild = function (child) {
                    this._childs.push(child);
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
            WorldNodes = (function () {
                function WorldNodes() {
                    this.nodes = [];
                }
                WorldNodes.prototype.push = function (node) {
                    this.nodes.push(node);
                };
                WorldNodes.prototype.getByIndex = function (index) {
                    return this.getById(this.nodes[index].id);
                };
                Object.defineProperty(WorldNodes.prototype, "length", {
                    get: function () {
                        return this.nodes.length;
                    },
                    enumerable: true,
                    configurable: true
                });
                WorldNodes.prototype.remove = function (index) {
                    return this.nodes.splice(index, 1)[0];
                };
                WorldNodes.prototype.getById = function (id) {
                    for (var i = 0; i < this.nodes.length; i++) {
                        if (this.nodes[i].id == id) {
                            if (this.nodes[i].removed) {
                                this.remove(i);
                                return null;
                            }
                            else {
                                return this.nodes[i];
                            }
                        }
                    }
                };
                return WorldNodes;
            }());
            World = (function () {
                function World(time) {
                    this.nodes = new WorldNodes();
                    this.parkings = new WorldNodes();
                    this.roads = new WorldNodes();
                    this.buildings = [];
                    this.events = new EventManager();
                }
                World.prototype.getBuildings = function () {
                    return this.buildings;
                };
                World.prototype.getNodes = function () {
                    return this.nodes;
                };
                World.prototype.addBuilding = function (buiding) {
                    this.buildings.push(buiding);
                    this.events.trigger('new_building', buiding);
                };
                World.prototype.removeRoadNode = function (road) {
                    var id = typeof road == "string" ? road : road.id;
                    for (var i = 0; i < this.nodes.length; i++) {
                        if (this.nodes[i].id == id) {
                            this.nodes.remove(i).removed = true;
                            break;
                        }
                    }
                    if (road instanceof road_1.Road) {
                        for (var i = 0; i < this.roads.length; i++) {
                            if (this.roads[i].id == id) {
                                this.roads.remove(i).removed = true;
                                break;
                            }
                        }
                    }
                };
                World.prototype.tick = function () {
                };
                World.prototype.addRoadNode = function (road) {
                    for (var i = 0; i < this.nodes.length; i++) {
                        var node = this.nodes.getByIndex(i);
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
                    this.events.trigger('change_road', road);
                };
                return World;
            }());
            exports_1("World", World);
            exports_1("WorldNode", WorldNode);
            exports_1("WorldNodes", WorldNodes);
        }
    }
});
//# sourceMappingURL=world.js.map