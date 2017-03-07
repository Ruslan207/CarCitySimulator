System.register(["./ObjViewer"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ObjViewer_1;
    var objViewer;
    return {
        setters:[
            function (ObjViewer_1_1) {
                ObjViewer_1 = ObjViewer_1_1;
            }],
        execute: function() {
            /**
             * Created by anton on 3/6/17.
             */
            objViewer = new ObjViewer_1.default(document.body, 40, window.devicePixelRatio || 1);
            objViewer.loop();
        }
    }
});
//
// if (Detector.webgl) {
//     var render = init();
//     render();
// } else {
//     var warning = Detector.getWebGLErrorMessage();
//     document.body.appendChild(warning);
// }
//# sourceMappingURL=main.js.map