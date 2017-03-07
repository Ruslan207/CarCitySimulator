import * as THREE from "three"
import CameraMouseController from "./CameraMouseController";
import * as dat from "dat-gui"
import {OBJLoader} from "./OBJLoader";

/**
 * Created by anton on 3/6/17.
 */

class ObjViewer{
    private scene:THREE.Scene;
    private renderer:THREE.WebGLRenderer;
    private camera:THREE.PerspectiveCamera;
    private mouseController:CameraMouseController;
    private width:number;
    private height:number;
    private currentObject: THREE.Mesh;
    private gui: dat.GUI;
    private material: THREE.MeshLambertMaterial;
    private light: THREE.PointLight;
    private plane: THREE.Mesh;

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

        let material = this.material = new THREE.MeshLambertMaterial({
            color: 0xF25050,
            shading: THREE.FlatShading
        })
        let cube = this.currentObject = new THREE.Mesh(
            new THREE.BoxGeometry( 1, 1, 1 ),
            material
        );
        scene.add( cube );

        let plane = this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry( 10, 10, 10, 10 ),
            new THREE.MeshBasicMaterial( {color: 0x777777, wireframe: true, side: THREE.DoubleSide} )
        );

        scene.add(plane);

        let axisHelper = new THREE.AxisHelper( 2 );
        scene.add( axisHelper );

        var ambientLight = new THREE.AmbientLight( 0x999999 );
        scene.add(ambientLight);

        let light = this.light = new THREE.PointLight(0xFFFFFF, 1, 100);
        scene.add(light);

        let mouseController = this.mouseController = new CameraMouseController(camera, 10);
        mouseController.bind(renderer.domElement);
        this.resetCamera();
        this.moveLightToCamera();



        window.addEventListener('resize', () => {
            this.resize(holder.clientWidth, holder.clientHeight);
        });

        let gui = this.gui = new dat.GUI();
        gui.add(this, 'loadObj');
        gui.add(this, 'resetCamera');
        gui.add(this, 'wireframe');
        gui.add(this, 'showPlane');
        gui.addColor(this, 'color');
        gui.add(this, 'moveLightToCamera');
    }

    public get showPlane(){
        return this.plane.visible;
    }

    public set showPlane(val:boolean){
        this.plane.visible=val;
    }

    public moveLightToCamera(){
        let p = this.camera.position;
        this.light.position.set(p.x, p.y, p.z);
    }

    public get wireframe(){
        return this.material.wireframe;
    }

    public set wireframe(val:boolean){
        this.material.wireframe=val;
    }

    public get color(){
        return '#' + this.material.color.getHexString();
    }

    public set color(val:string){
        this.material.color.set(val);
    }

    public resetCamera(){
        let mc = this.mouseController;
        mc.theta=70;
        mc.phi=30;
        mc.radius=10;
        mc.updateCameraPosition();
    }

    public loadObj = () => {
        var loader = new OBJLoader();
		// load a resource
		loader.load(
			// resource URL
			'assets/building-office-small.obj',
			// Function when resource is loaded
			function ( object ) {
				this.scene.remove(this.currentObject);
				this.currentObject = object;
				this.scene.add(this.currentObject);
			}
		);

    }

    public loop = () => {
        requestAnimationFrame(this.loop);
        this.renderer.render(this.scene, this.camera);
    }
}

export default ObjViewer;