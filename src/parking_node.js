System.register(["./road"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var road_1;
    var ParkingNode;
    return {
        setters:[
            function (road_1_1) {
                road_1 = road_1_1;
            }],
        execute: function() {
            ParkingNode = (function (_super) {
                __extends(ParkingNode, _super);
                function ParkingNode() {
                    _super.apply(this, arguments);
                }
                return ParkingNode;
            }(road_1.Road));
            exports_1("ParkingNode", ParkingNode);
        }
    }
});
//# sourceMappingURL=parking_node.js.map