System.register(["./world"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var world_1;
    var Direction, Modifier, TrafficLight, SpeedLimit, Road;
    return {
        setters:[
            function (world_1_1) {
                world_1 = world_1_1;
            }],
        execute: function() {
            (function (Direction) {
                Direction[Direction["UP"] = 0] = "UP";
                Direction[Direction["RIGHT"] = 1] = "RIGHT";
                Direction[Direction["LEFT"] = 2] = "LEFT";
                Direction[Direction["DOWN"] = 3] = "DOWN";
                Direction[Direction["ANY"] = 4] = "ANY";
            })(Direction || (Direction = {}));
            Modifier = (function () {
                function Modifier() {
                }
                return Modifier;
            }());
            TrafficLight = (function (_super) {
                __extends(TrafficLight, _super);
                function TrafficLight(interval) {
                    var _this = this;
                    _super.call(this);
                    this.state = 0;
                    var sign = +1;
                    this.timer = setInterval(function () {
                        _this.timer += sign;
                        _this.timer %= 3;
                        if (_this.timer == 0 || _this.timer == 2) {
                            sign *= -1;
                        }
                    }, interval);
                }
                return TrafficLight;
            }(Modifier));
            SpeedLimit = (function (_super) {
                __extends(SpeedLimit, _super);
                function SpeedLimit(value) {
                    _super.call(this);
                    this.value = Infinity;
                    if (value != undefined) {
                        this.value = value;
                    }
                }
                return SpeedLimit;
            }(Modifier));
            Road = (function (_super) {
                __extends(Road, _super);
                function Road(x, y, z, _direction) {
                    _super.call(this, x, y, z);
                    this._direction = _direction;
                }
                Road.prototype.addModifier = function (modifier) {
                    this.modifiers.push(modifier);
                };
                Road.prototype.hasSameDirection = function (road) {
                    if (this.direction == road.direction) {
                        return true;
                    }
                    else {
                        if (this.direction == Direction.ANY || road.direction == Direction.ANY) {
                            return true;
                        }
                    }
                    return false;
                };
                Road.prototype.isHorizontal = function (road) {
                    return this.x == road.x;
                };
                Road.prototype.isVertical = function (road) {
                    return this.y == road.y;
                };
                Road.prototype.getLeft = function (road) {
                    if (this.x < road.x) {
                        return this;
                    }
                    else {
                        return road;
                    }
                };
                Road.prototype.getRight = function (road) {
                    if (this.x > road.x) {
                        return this;
                    }
                    else {
                        return road;
                    }
                };
                Road.prototype.getTop = function (road) {
                    if (this.y < road.y) {
                        return this;
                    }
                    else {
                        return road;
                    }
                };
                Road.prototype.getBottom = function (road) {
                    if (this.y > road.y) {
                        return this;
                    }
                    else {
                        return road;
                    }
                };
                Object.defineProperty(Road.prototype, "direction", {
                    get: function () {
                        return this._direction;
                    },
                    enumerable: true,
                    configurable: true
                });
                Road.prototype.setConnections = function (road) {
                    if (this.isNear(road) && this.hasSameDirection(road)) {
                        if (this.isVertical(road)) {
                            switch (this.getBottom(road).direction) {
                                case Direction.ANY:
                                    switch (this.getTop(road).direction) {
                                        case Direction.ANY:
                                            this.getBottom(road).connectTo(this.getTop(road));
                                            this.getTop(road).connectTo(this.getBottom(road));
                                            break;
                                        case Direction.DOWN:
                                            this.getBottom(road).connectTo(this.getTop(road));
                                            break;
                                        case Direction.UP:
                                            this.getTop(road).connectTo(this.getBottom(road));
                                            break;
                                    }
                                    break;
                                case Direction.UP:
                                    this.getTop(road).connectTo(this.getBottom(road));
                                    break;
                                case Direction.DOWN:
                                    this.getBottom(road).connectTo(this.getTop(road));
                                    break;
                                case Direction.LEFT:
                                case Direction.RIGHT:
                                    this.getBottom(road).connectTo(this.getTop(road));
                                    this.getTop(road).connectTo(this.getBottom(road));
                                    break;
                            }
                        }
                        else {
                            if (this.isHorizontal(road)) {
                                switch (this.getLeft(road).direction) {
                                    case Direction.ANY:
                                        switch (this.getRight(road).direction) {
                                            case Direction.ANY:
                                                this.getLeft(road).connectTo(this.getRight(road));
                                                this.getRight(road).connectTo(this.getLeft(road));
                                                break;
                                            case Direction.LEFT:
                                                this.getLeft(road).connectTo(this.getRight(road));
                                                break;
                                            case Direction.RIGHT:
                                                this.getRight(road).connectTo(this.getLeft(road));
                                                break;
                                        }
                                        break;
                                    case Direction.RIGHT:
                                        this.getRight(road).connectTo(this.getLeft(road));
                                        break;
                                    case Direction.LEFT:
                                        this.getLeft(road).connectTo(this.getRight(road));
                                        break;
                                    case Direction.DOWN:
                                    case Direction.UP:
                                        this.getLeft(road).connectTo(this.getRight(road));
                                        this.getRight(road).connectTo(this.getLeft(road));
                                        break;
                                }
                            }
                        }
                    }
                };
                return Road;
            }(world_1.WorldNode));
            exports_1("Road", Road);
        }
    }
});
//# sourceMappingURL=road.js.map