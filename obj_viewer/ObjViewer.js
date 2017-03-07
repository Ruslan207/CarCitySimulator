System.register(["./CameraMouseController", "dat-gui", "./OBJLoader", "./MTLLoader", "./GuiMaterialHelper"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CameraMouseController_1, dat, GuiMaterialHelper_1;
    var MTLLoader, ObjViewer;
    return {
        setters:[
            function (CameraMouseController_1_1) {
                CameraMouseController_1 = CameraMouseController_1_1;
            },
            function (dat_1) {
                dat = dat_1;
            },
            function (_1) {},
            function (_2) {},
            function (GuiMaterialHelper_1_1) {
                GuiMaterialHelper_1 = GuiMaterialHelper_1_1;
            }],
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
                        var objLoader = new THREE.OBJLoader();
                        var mtlLoader = new THREE.MTLLoader();
                        var self = _this;
                        var onProgress = function (xhr) {
                            if (xhr.lengthComputable) {
                                var percentComplete = xhr.loaded / xhr.total * 100;
                                console.log(Math.round(percentComplete * 100) / 100 + '% downloaded');
                            }
                        };
                        var onError = function (xhr) { };
                        mtlLoader.setPath('assets/');
                        mtlLoader.load('landscape_v2_000000.mtl', function (materials) {
                            console.log(materials);
                            materials.preload();
                            objLoader.setMaterials(materials);
                            objLoader.setPath('assets/');
                            objLoader.load('landscape_v2_000000.obj', function (object) {
                                // self.scene.add(object);
                                self.currentObject = object;
                            }, onProgress, onError);
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
                    var plane = this.plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x777777, wireframe: true, side: THREE.DoubleSide }));
                    scene.add(plane);
                    var axisHelper = new THREE.AxisHelper(2);
                    scene.add(axisHelper);
                    var ambientLight = new THREE.AmbientLight(0x999999);
                    scene.add(ambientLight);
                    var light = this.light = new THREE.PointLight(0xFFFFFF, 1.5, 1000, 0.5);
                    light.power = 30;
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
                    gui.add(this, 'showPlane');
                    var lightFolder = gui.addFolder('light');
                    lightFolder.add(this, 'moveLightToCamera');
                    GuiMaterialHelper_1.GuiMaterialHelper.addColor(lightFolder, light, 'color');
                    lightFolder.add(light, 'intensity');
                    lightFolder.add(light, 'distance');
                    lightFolder.add(light, 'decay');
                    lightFolder.add(light, 'power');
                    var amlightFolder = gui.addFolder('AmbientLight');
                    amlightFolder.add(this, 'moveLightToCamera');
                    GuiMaterialHelper_1.GuiMaterialHelper.addColor(amlightFolder, ambientLight, 'color');
                    amlightFolder.add(ambientLight, 'intensity');
                    this.currentObject = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
                        color: 0xF25050,
                        shading: THREE.FlatShading
                    }));
                    this.loadObj();
                }
                Object.defineProperty(ObjViewer.prototype, "currentObject", {
                    set: function (obj) {
                        var materials_folder = this.gui.__folders['materials'];
                        if (materials_folder == null || materials_folder == undefined) {
                            materials_folder = this.gui.addFolder('materials');
                        }
                        if (this._currentObject != null) {
                            this.scene.remove(this._currentObject);
                            for (var folder_name in materials_folder.__folders) {
                                var folder = materials_folder.__folders[folder_name];
                                console.log(folder);
                                GuiMaterialHelper_1.GuiMaterialHelper.removeFolder(folder, materials_folder);
                            }
                        }
                        this._currentObject = obj;
                        if (obj !== null) {
                            this.scene.add(obj);
                            // var folder = this.gui.addFolder('position');
                            // folder.add(obj.position, 'x');
                            // folder.add(obj.position, 'y');
                            // folder.add(obj.position, 'z');
                            //build list of used materials
                            var materials = [];
                            var mat = obj['material'];
                            if (mat !== undefined && mat instanceof THREE.Material) {
                                materials.push(mat);
                            }
                            for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
                                var child = _a[_i];
                                mat = child['material'];
                                if (mat !== undefined && mat instanceof THREE.Material && !materials.some(function (m) { return m == mat; })) {
                                    materials.push(mat);
                                }
                            }
                            var i = 0;
                            for (var _b = 0, materials_1 = materials; _b < materials_1.length; _b++) {
                                mat = materials_1[_b];
                                i += 1;
                                var folder = materials_folder.addFolder(i + '|' + mat.name);
                                GuiMaterialHelper_1.GuiMaterialHelper.fillMaterialFolder(folder, mat);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
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
                // public get wireframe(){
                //     return this.material.wireframe;
                // }
                //
                // public set wireframe(val:boolean){
                //     this.material.wireframe=val;
                // }
                //
                // public get color(){
                //     return '#' + this.material.color.getHexString();
                // }
                //
                // public set color(val:string){
                //     this.material.color.set(val);
                // }
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