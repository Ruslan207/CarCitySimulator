System.register(["./CameraMouseController", "dat-gui", "./OBJLoader"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CameraMouseController_1, dat;
    var ObjViewer;
    return {
        setters:[
            function (CameraMouseController_1_1) {
                CameraMouseController_1 = CameraMouseController_1_1;
            },
            function (dat_1) {
                dat = dat_1;
            },
            function (_1) {}],
        execute: function() {
            /**
             * Created by anton on 3/6/17.
             */
            ObjViewer = (function () {
                function ObjViewer(holder, fov, dpi) {
                    var _this = this;
                    this.holder = holder;
                    this.fov = fov;
                    this.dpi = dpi;
                    this.loadObj = function () {
                        var loader = new THREE.OBJLoader();
                        var self = _this;
                        // load a resource
                        loader.load(
                        // resource URL
                        'assets/building-office-small.obj', 
                        // Function when resource is loaded
                        function (geometry) {
                            self.scene.remove(self.currentObject);
                            console.log(geometry);
                            self.currentObject = geometry;
                            self.scene.add(self.currentObject);
                        });
                    };
                    this.loop = function () {
                        requestAnimationFrame(_this.loop);
                        _this.renderer.render(_this.scene, _this.camera);
                    };
                    var width = this.width = holder.clientWidth;
                    var height = this.height = holder.clientHeight;
                    var scene = this.scene = new THREE.Scene();
                    var renderer = this.renderer = new THREE.WebGLRenderer();
                    var camera = this.camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
                    camera.up.set(0, 0, 1);
                    renderer.setPixelRatio(dpi);
                    renderer.setClearColor(0xffffff, 1);
                    this.resize(width, height);
                    holder.appendChild(renderer.domElement);
                    var material = this.material = new THREE.MeshLambertMaterial({
                        color: 0xF25050,
                        shading: THREE.FlatShading
                    });
                    var cube = this.currentObject = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
                    scene.add(cube);
                    var plane = this.plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x777777, wireframe: true, side: THREE.DoubleSide }));
                    scene.add(plane);
                    var axisHelper = new THREE.AxisHelper(2);
                    scene.add(axisHelper);
                    var ambientLight = new THREE.AmbientLight(0x999999);
                    scene.add(ambientLight);
                    var light = this.light = new THREE.PointLight(0xFFFFFF, 1, 100);
                    scene.add(light);
                    var mouseController = this.mouseController = new CameraMouseController_1.default(camera, 10);
                    mouseController.bind(renderer.domElement);
                    this.resetCamera();
                    this.moveLightToCamera();
                    window.addEventListener('resize', function () {
                        _this.resize(holder.clientWidth, holder.clientHeight);
                    });
                    var gui = this.gui = new dat.GUI();
                    gui.add(this, 'loadObj');
                    gui.add(this, 'resetCamera');
                    gui.add(this, 'wireframe');
                    gui.add(this, 'showPlane');
                    gui.addColor(this, 'color');
                    gui.add(this, 'moveLightToCamera');
                    this.loadObj();
                }
                ObjViewer.prototype.resize = function (width, height) {
                    console.log(width, height);
                    this.width = width;
                    this.height = height;
                    this.camera.aspect = width / height;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(width, height);
                };
                Object.defineProperty(ObjViewer.prototype, "showPlane", {
                    get: function () {
                        return this.plane.visible;
                    },
                    set: function (val) {
                        this.plane.visible = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                ObjViewer.prototype.moveLightToCamera = function () {
                    var p = this.camera.position;
                    this.light.position.set(p.x, p.y, p.z);
                };
                Object.defineProperty(ObjViewer.prototype, "wireframe", {
                    get: function () {
                        return this.material.wireframe;
                    },
                    set: function (val) {
                        this.material.wireframe = val;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ObjViewer.prototype, "color", {
                    get: function () {
                        return '#' + this.material.color.getHexString();
                    },
                    set: function (val) {
                        this.material.color.set(val);
                    },
                    enumerable: true,
                    configurable: true
                });
                ObjViewer.prototype.resetCamera = function () {
                    var mc = this.mouseController;
                    mc.theta = 70;
                    mc.phi = 30;
                    mc.radius = 10;
                    mc.updateCameraPosition();
                };
                return ObjViewer;
            }());
            exports_1("default",ObjViewer);
        }
    }
});
//# sourceMappingURL=ObjViewer.js.map