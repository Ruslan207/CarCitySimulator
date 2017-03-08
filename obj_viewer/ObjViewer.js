System.register(["./CameraMouseController", "dat-gui", "./OBJLoader", "./MTLLoader", "./GuiMaterialHelper", "./PatchDialogFileLoader"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CameraMouseController_1, dat, GuiMaterialHelper_1, PatchDialogFileLoader_1;
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
            },
            function (PatchDialogFileLoader_1_1) {
                PatchDialogFileLoader_1 = PatchDialogFileLoader_1_1;
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
                    this.loadOBJ = function () {
                        var objLoader = new THREE.OBJLoader();
                        var self = _this;
                        objLoader.setMaterials(self.materialsHolder);
                        objLoader.setPath('');
                        objLoader.load('landscape_v2_000000.obj', function (object) {
                            self.currentObject = object;
                        }, self.loaderOnProgress, self.loaderOnError);
                    };
                    this.loadMTL = function (callback) {
                        GuiMaterialHelper_1.GuiMaterialHelper.clearFolder(_this.materialsFolder);
                        var mtlLoader = new THREE.MTLLoader();
                        var self = _this;
                        mtlLoader.setPath('');
                        mtlLoader.setTexturePath('');
                        mtlLoader.load('landscape_v2_000000.mtl', function (materials) {
                            console.log(mtlLoader);
                            self.materialsHolder = materials;
                            self.materialsHolder.preload();
                            //callback()
                        }, self.loaderOnProgress, self.loaderOnError);
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
                    this.materialsHolder = new THREE.MTLLoader.MaterialCreator();
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
                    gui.addColor(this, 'background');
                    gui.add(this, 'loadMTL');
                    this.texturesFolder = this.gui.addFolder('textures');
                    gui.add(this, 'loadOBJ');
                    gui.add(this, 'resetCamera');
                    gui.add(this, 'showPlane');
                    var lightFolder = gui.addFolder('light');
                    lightFolder.add(this, 'moveLightToCamera');
                    GuiMaterialHelper_1.GuiMaterialHelper.addColor(lightFolder, light, 'color');
                    lightFolder.add(light, 'intensity');
                    lightFolder.add(light, 'distance');
                    lightFolder.add(light, 'decay');
                    lightFolder.add(light, 'power');
                    lightFolder.add(light, 'visible');
                    var amlightFolder = gui.addFolder('AmbientLight');
                    amlightFolder.add(this, 'moveLightToCamera');
                    GuiMaterialHelper_1.GuiMaterialHelper.addColor(amlightFolder, ambientLight, 'color');
                    amlightFolder.add(ambientLight, 'intensity');
                    amlightFolder.add(ambientLight, 'visible');
                    this.textures = {};
                    this.materialsFolder = this.gui.addFolder('materials');
                    this.objectsFolder = this.gui.addFolder('objects');
                    var texturesFolder = this.texturesFolder;
                    var textures = this.textures;
                    PatchDialogFileLoader_1.patchLoader(THREE.FileLoader);
                    PatchDialogFileLoader_1.patchLoader(THREE.ImageLoader, null, function (url, loadFunc, instance, onLoad, onProgress, onError) {
                        if (textures[url] == undefined) {
                            textures[url] = function (e) {
                                PatchDialogFileLoader_1.requestFileFromLocal(url, loadFunc, instance, onLoad, onProgress, onError);
                            };
                            texturesFolder.add(textures, url);
                            texturesFolder.open();
                        }
                    });
                    this.currentObject = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
                        color: 0xF25050,
                        shading: THREE.FlatShading
                    }));
                    // this.loadMTL(this.loadOBJ);
                }
                Object.defineProperty(ObjViewer.prototype, "currentObject", {
                    set: function (obj) {
                        if (this._currentObject != null) {
                            this.scene.remove(this._currentObject);
                            GuiMaterialHelper_1.GuiMaterialHelper.clearFolder(this.objectsFolder);
                            GuiMaterialHelper_1.GuiMaterialHelper.clearFolder(this.materialsFolder);
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
                            var mat_1 = obj['material'];
                            if (mat_1 instanceof THREE.Material) {
                                materials.push(mat_1);
                            }
                            var objects = [];
                            if (!(obj instanceof THREE.Group)) {
                                objects.push(obj);
                            }
                            for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
                                var child = _a[_i];
                                mat_1 = child['material'];
                                if (mat_1 !== undefined && mat_1 instanceof THREE.Material && !materials.some(function (m) { return m == mat_1; })) {
                                    materials.push(mat_1);
                                }
                                objects.push(child);
                            }
                            for (var mat_i in materials) {
                                var mat_2 = materials[mat_i];
                                var folder = this.materialsFolder.addFolder(mat_i + '|' + mat_2.name);
                                GuiMaterialHelper_1.GuiMaterialHelper.fillMaterialFolder(folder, mat_2);
                            }
                            objects.sort(function (a, b) { return a.name.localeCompare(b.name); });
                            var objects_wrapper = {};
                            var _loop_1 = function(obj_i) {
                                var obj_1 = objects[obj_i];
                                var name_1 = obj_i + '|' + obj_1.name;
                                Object.defineProperty(objects_wrapper, name_1, {
                                    get: function () {
                                        return obj_1.visible;
                                    },
                                    set: function (val) {
                                        obj_1.visible = val;
                                    }
                                });
                                this_1.objectsFolder.add(objects_wrapper, name_1);
                            };
                            var this_1 = this;
                            for (var obj_i in objects) {
                                _loop_1(obj_i);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ObjViewer.prototype.resize = function (width, height) {
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
                Object.defineProperty(ObjViewer.prototype, "background", {
                    get: function () {
                        return '#' + this.renderer.getClearColor().getHexString();
                    },
                    set: function (val) {
                        this.renderer.setClearColor(new THREE.Color(val).getHex());
                    },
                    enumerable: true,
                    configurable: true
                });
                ObjViewer.prototype.moveLightToCamera = function () {
                    var p = this.camera.position;
                    this.light.position.set(p.x, p.y, p.z);
                };
                ObjViewer.prototype.resetCamera = function () {
                    var mc = this.mouseController;
                    mc.theta = 70;
                    mc.phi = 30;
                    mc.radius = 10;
                    mc.offset.set(0, 0, 0);
                    mc.updateCameraPosition();
                };
                ObjViewer.prototype.loaderOnProgress = function (xhr) {
                    if (xhr.lengthComputable) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log(Math.round(percentComplete * 100) / 100 + '% downloaded');
                    }
                };
                ;
                ObjViewer.prototype.loaderOnError = function (xhr) {
                    console.log('Error', xhr);
                };
                ;
                return ObjViewer;
            }());
            exports_1("default",ObjViewer);
        }
    }
});
//# sourceMappingURL=ObjViewer.js.map