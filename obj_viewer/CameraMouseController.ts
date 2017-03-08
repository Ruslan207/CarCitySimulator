import * as THREE from "three"

/**
 * Created by anton on 3/6/17.
 */

enum MoveMode{
    none = 1,
    rotate,
    offset
}

class CameraMouseController {
    OFFSET_STEP = 0.0008;
    ZOOM_STEP = 0.1;


    public theta = 0;
    public phi = 0;

    private onMouseDownPosition = new THREE.Vector2();
    private onMouseDownPhi = 0;
    private onMouseDownTheta = 0;
    private onMouseDownOffset = new THREE.Vector3();
    public offset = new THREE.Vector3();

    private moveMode:MoveMode = MoveMode.none;

    public constructor(private camera: THREE.Camera, public radius: number) {
    }

    public updateCameraPosition = () => {

        this.camera.position.set(
            this.offset.x + this.radius * Math.sin(this.theta * Math.PI / 360) * Math.cos(this.phi * Math.PI / 360),
            this.offset.y + this.radius * Math.cos(this.theta * Math.PI / 360) * Math.cos(this.phi * Math.PI / 360),
            this.offset.z + this.radius * Math.sin(this.phi * Math.PI / 360),
        );
        // console.log(this.theta, this.phi, this.offset.x, this.offset.y, this.onMouseDownOffset.x, this.onMouseDownOffset.y);
        // this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.lookAt(this.offset);
        this.camera.updateMatrix();
    }

    public onDocumentMouseDown = (event: MouseEvent) => {
        event.preventDefault();
        if (event.shiftKey) {
            this.moveMode = MoveMode.offset;
        } else {
            this.moveMode = MoveMode.rotate;
        }
        this.onMouseDownTheta = this.theta;
        this.onMouseDownPhi = this.phi;
        this.onMouseDownPosition.set(event.clientX, event.clientY);
        this.onMouseDownOffset = this.offset.clone();
    };

    public onDocumentMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        let deltaX = event.clientX - this.onMouseDownPosition.x;
        let deltaY = event.clientY - this.onMouseDownPosition.y;

        if (this.moveMode == MoveMode.rotate) {
            this.theta = ( ( deltaX ) * 0.5 ) + this.onMouseDownTheta;
            this.phi = ( ( deltaY) * 0.5 ) + this.onMouseDownPhi;
            this.phi = Math.min(180, Math.max(0, this.phi));
            this.updateCameraPosition();
        } else if (this.moveMode == MoveMode.offset) {
            let angle = this.theta*Math.PI/360;
            let sin = Math.sin(angle);
            let cos = Math.cos(angle);
            this.offset.x = -this.OFFSET_STEP*this.radius*(deltaY*sin-deltaX*cos) + this.onMouseDownOffset.x;
            this.offset.y = -this.OFFSET_STEP*this.radius*(deltaY*cos+deltaX*sin)+ this.onMouseDownOffset.y;
            // this.offset.x = Math.min(this.offsetMax.x, Math.max(this.offsetMin.x, this.offset.x));
            // this.offset.y = Math.min(this.offsetMax.y, Math.max(this.offsetMin.y, this.offset.y));
            this.updateCameraPosition();
        }
        // mouse3D = projector.unprojectVector(new THREE.Vector3(( event.clientX / renderer.domElement.width ) * 2 - 1, -( event.clientY / renderer.domElement.height ) * 2 + 1, 0.5), camera);
        // ray.direction = mouse3D.subSelf(camera.position).normalize();
    };

    public onDocumentMouseUp = (event: MouseEvent) => {
        event.preventDefault();

        this.moveMode = MoveMode.none;

        this.onMouseDownPosition.x = event.clientX - this.onMouseDownPosition.x;
        this.onMouseDownPosition.y = event.clientY - this.onMouseDownPosition.y;

        if (this.onMouseDownPosition.length() > 5) {

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

    }

    public onDocumentMouseWheel = (event: WheelEvent) => {
        this.radius -= this.ZOOM_STEP*event.wheelDeltaY;
        // if (this.radius < this.minRadius) {
        //     this.radius = this.minRadius;
        // }
        this.updateCameraPosition();
    }

    public bind = (domElement: HTMLElement) => {
        domElement.addEventListener('mousemove',  this.onDocumentMouseMove, false);
        domElement.addEventListener('mousedown',  this.onDocumentMouseDown, false);
        domElement.addEventListener('mouseup',    this.onDocumentMouseUp, false);
        domElement.addEventListener('mousewheel', this.onDocumentMouseWheel, false);
    }

    public unbind = (domElement: HTMLElement) => {
        domElement.removeEventListener('mousemove',  this.onDocumentMouseMove, false);
        domElement.removeEventListener('mousedown',  this.onDocumentMouseDown, false);
        domElement.removeEventListener('mouseup',    this.onDocumentMouseUp, false);
        domElement.removeEventListener('mousewheel', this.onDocumentMouseWheel, false);
    }
}

export default CameraMouseController;