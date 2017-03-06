import ObjViewer from "./ObjViewer";

/**
 * Created by anton on 3/6/17.
 */


let objViewer = new ObjViewer(document.body, 40, window.devicePixelRatio || 1);


objViewer.loop();
//
// if (Detector.webgl) {
//     var render = init();
//     render();
// } else {
//     var warning = Detector.getWebGLErrorMessage();
//     document.body.appendChild(warning);
// }
