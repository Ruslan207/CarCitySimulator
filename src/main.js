System.register(["./world"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var world_1;
    var world;
    return {
        setters:[
            function (world_1_1) {
                world_1 = world_1_1;
            }],
        execute: function() {
            world = new world_1.World(new Date());
            exports_1("world", world);
        }
    }
});
//# sourceMappingURL=main.js.map