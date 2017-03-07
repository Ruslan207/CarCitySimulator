System.register(["three"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var THREE;
    var MoveMode, CameraMouseController;
    return {
        setters:[
            function (THREE_1) {
                THREE = THREE_1;
            }],
        execute: function() {
            /**
             * Created by anton on 3/6/17.
             */
            (function (MoveMode) {
                MoveMode[MoveMode["none"] = 1] = "none";
                MoveMode[MoveMode["rotate"] = 2] = "rotate";
                MoveMode[MoveMode["offset"] = 3] = "offset";
            })(MoveMode || (MoveMode = {}));
            CameraMouseController = (function () {
                function CameraMouseController(camera, radius) {
                    var _this = this;
                    this.camera = camera;
                    this.radius = radius;
                    this.OFFSET_STEP = 0.005;
                    this.ZOOM_STEP = 0.1;
                    this.theta = 0;
                    this.phi = 0;
                    this.onMouseDownPosition = new THREE.Vector2();
                    this.onMouseDownPhi = 0;
                    this.onMouseDownTheta = 0;
                    this.onMouseDownOffset = new THREE.Vector3();
                    this.offset = new THREE.Vector3();
                    this.moveMode = MoveMode.none;
                    this.updateCameraPosition = function () {
                        _this.camera.position.set(_this.offset.x + _this.radius * Math.sin(_this.theta * Math.PI / 360) * Math.cos(_this.phi * Math.PI / 360), _this.offset.y + _this.radius * Math.cos(_this.theta * Math.PI / 360) * Math.cos(_this.phi * Math.PI / 360), _this.offset.z + _this.radius * Math.sin(_this.phi * Math.PI / 360));
                        // console.log(this.theta, this.phi, this.offset.x, this.offset.y, this.onMouseDownOffset.x, this.onMouseDownOffset.y);
                        // this.camera.up = new THREE.Vector3(0,0,1);
                        _this.camera.lookAt(_this.offset);
                        _this.camera.updateMatrix();
                    };
                    this.onDocumentMouseDown = function (event) {
                        event.preventDefault();
                        if (event.shiftKey) {
                            _this.moveMode = MoveMode.offset;
                        }
                        else {
                            _this.moveMode = MoveMode.rotate;
                        }
                        _this.onMouseDownTheta = _this.theta;
                        _this.onMouseDownPhi = _this.phi;
                        _this.onMouseDownPosition.set(event.clientX, event.clientY);
                        _this.onMouseDownOffset = _this.offset.clone();
                    };
                    this.onDocumentMouseMove = function (event) {
                        event.preventDefault();
                        var deltaX = event.clientX - _this.onMouseDownPosition.x;
                        var deltaY = event.clientY - _this.onMouseDownPosition.y;
                        if (_this.moveMode == MoveMode.rotate) {
                            _this.theta = ((deltaX) * 0.5) + _this.onMouseDownTheta;
                            _this.phi = ((deltaY) * 0.5) + _this.onMouseDownPhi;
                            _this.phi = Math.min(180, Math.max(0, _this.phi));
                            _this.updateCameraPosition();
                        }
                        else if (_this.moveMode == MoveMode.offset) {
                            var angle = _this.theta * Math.PI / 360;
                            var sin = Math.sin(angle);
                            var cos = Math.cos(angle);
                            _this.offset.x = -_this.OFFSET_STEP * (deltaY * sin - deltaX * cos) + _this.onMouseDownOffset.x;
                            _this.offset.y = -_this.OFFSET_STEP * (deltaY * cos + deltaX * sin) + _this.onMouseDownOffset.y;
                            // this.offset.x = Math.min(this.offsetMax.x, Math.max(this.offsetMin.x, this.offset.x));
                            // this.offset.y = Math.min(this.offsetMax.y, Math.max(this.offsetMin.y, this.offset.y));
                            _this.updateCameraPosition();
                        }
                        // mouse3D = projector.unprojectVector(new THREE.Vector3(( event.clientX / renderer.domElement.width ) * 2 - 1, -( event.clientY / renderer.domElement.height ) * 2 + 1, 0.5), camera);
                        // ray.direction = mouse3D.subSelf(camera.position).normalize();
                    };
                    this.onDocumentMouseUp = function (event) {
                        event.preventDefault();
                        _this.moveMode = MoveMode.none;
                        _this.onMouseDownPosition.x = event.clientX - _this.onMouseDownPosition.x;
                        _this.onMouseDownPosition.y = event.clientY - _this.onMouseDownPosition.y;
                        if (_this.onMouseDownPosition.length() > 5) {
                            return;
                        } // detect click
                        //
                        // var intersect, intersects = ray.intersectScene(scene);
                        //
                        // if (intersects.length > 0) {
                        //
                        //     intersect = intersects[0].object == brush ? intersects[1] : intersects[0];
                        //
                        //     if (intersect) {
                        //
                        //         if (isShiftDown) {
                        //
                        //             if (intersect.object != plane) {
                        //
                        //                 scene.removeObject(intersect.object);
                        //
                        //             }
                        //
                        //         } else {
                        //
                        //             var position = new THREE.Vector3().add(intersect.point, intersect.object.matrixRotation.transform(intersect.face.normal.clone()));
                        //
                        //             var voxel = new THREE.Mesh(cube, new THREE.MeshColorFillMaterial(colors[color]));
                        //             voxel.position.x = Math.floor(position.x / 50) * 50 + 25;
                        //             voxel.position.y = Math.floor(position.y / 50) * 50 + 25;
                        //             voxel.position.z = Math.floor(position.z / 50) * 50 + 25;
                        //             voxel.overdraw = true;
                        //             scene.addObject(voxel);
                        //
                        //         }
                        //
                        //     }
                        //
                        // }
                        //
                        // updateHash();
                        // interact();
                        // render();
                    };
                    this.onDocumentMouseWheel = function (event) {
                        _this.radius -= _this.ZOOM_STEP * event.wheelDeltaY;
                        // if (this.radius < this.minRadius) {
                        //     this.radius = this.minRadius;
                        // }
                        _this.updateCameraPosition();
                    };
                    this.bind = function (domElement) {
                        domElement.addEventListener('mousemove', _this.onDocumentMouseMove, false);
                        domElement.addEventListener('mousedown', _this.onDocumentMouseDown, false);
                        domElement.addEventListener('mouseup', _this.onDocumentMouseUp, false);
                        domElement.addEventListener('mousewheel', _this.onDocumentMouseWheel, false);
                    };
                    this.unbind = function (domElement) {
                        domElement.removeEventListener('mousemove', _this.onDocumentMouseMove, false);
                        domElement.removeEventListener('mousedown', _this.onDocumentMouseDown, false);
                        domElement.removeEventListener('mouseup', _this.onDocumentMouseUp, false);
                        domElement.removeEventListener('mousewheel', _this.onDocumentMouseWheel, false);
                    };
                }
                return CameraMouseController;
            }());
            exports_1("default",CameraMouseController);
        }
    }
});
//# sourceMappingURL=CameraMouseController.js.map