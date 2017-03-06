import * as THREE from "three"
import CameraMouseController from "./CameraMouseController";

/**
 * Created by anton on 3/6/17.
 */

class ObjViewer{
    private scene:THREE.Scene;
    private renderer:THREE.WebGLRenderer;
    private camera:THREE.PerspectiveCamera;
    private mouseController:CameraMouseController;
    private isPause = false;
    private width:number;
    private height:number;

    public start(){
        if (this.isPause) {
            this.isPause = false;
        }
    }

    public stop(){
        if (!this.isPause) {
            this.isPause = false;
        }
    }

    private resize(width:number, height:number) {
        console.log(width, height);
        this.width = width;
        this.height = height;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    public constructor(private holder:HTMLElement, private fov:number, private dpi:number){
        let width = this.width = holder.clientWidth;
        let height = this.height = holder.clientHeight;
        let scene = this.scene = new THREE.Scene();
        let renderer = this.renderer = new THREE.WebGLRenderer();
        let camera = this.camera = new THREE.PerspectiveCamera(fov, width/height, 0.1, 1000);
        camera.up.set( 0, 0, 1 );

        renderer.setPixelRatio(dpi);
        renderer.setClearColor( 0xffffff, 1);
        this.resize(width, height);
        holder.appendChild( renderer.domElement );

        let cube = new THREE.Mesh(
            new THREE.BoxGeometry( 1, 1, 1 ),
            new THREE.MeshBasicMaterial( { color: 0x007700 } )
        );
        scene.add( cube );

        let plane = new THREE.Mesh(
            new THREE.PlaneGeometry( 10, 10, 10, 10 ),
            new THREE.MeshBasicMaterial( {color: 0x777777, wireframe: true, side: THREE.DoubleSide} )
        );

        scene.add(plane);

        var axisHelper = new THREE.AxisHelper( 2 );
        scene.add( axisHelper );


        let mouseController = this.mouseController = new CameraMouseController(camera, 10);
        mouseController.bind(holder);
        mouseController.theta=90;
        mouseController.phi=90;
        mouseController.updateCameraPosition();

        window.addEventListener('resize', () => {
            this.resize(holder.clientWidth, holder.clientHeight);
        })
        // var prevTimeStamp = new Date().getTime();
        // var render = function () {
        //     requestAnimationFrame( render );
        //     var radius = 5,
        //         constant = 0.0005;
        //
        //     var newTime = new Date().getTime(),
        //         elapsedTime = newTime - prevTimeStamp;
        //     prevTimeStamp = newTime;
        //
        //     // cube.rotation.x += 0.01;
        //     // cube.rotation.y += 0.01;
        //     // camera.position.x = cube.position.x + radius * Math.cos( constant * elapsedTime );
        //     // camera.position.z = cube.position.z + radius * Math.sin( constant * elapsedTime );
        //     // camera.lookAt( cube.position );
        //
        //     renderer.render(scene, camera);
        // };
    }

    public loop = () => {
        requestAnimationFrame(this.loop);
        this.renderer.render(this.scene, this.camera);
    }
}

export default ObjViewer;