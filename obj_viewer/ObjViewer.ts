import CameraMouseController from "./CameraMouseController";
import * as dat from "dat-gui"
import "./OBJLoader"
import "./MTLLoader"
import MTLLoader = THREE.MTLLoader;
import {GuiMaterialHelper} from "./GuiMaterialHelper";

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
    private _currentObject?: THREE.Object3D;
    private gui: dat.GUI;
    private light: THREE.PointLight;
    private plane: THREE.Mesh;


    private set currentObject(obj:THREE.Object3D){
        let materials_folder = this.gui.__folders['materials']
        if (materials_folder == null || materials_folder == undefined) {
            materials_folder = this.gui.addFolder('materials')
        }
        if (this._currentObject != null) {
            this.scene.remove(this._currentObject);
            for (let folder_name in materials_folder.__folders){
                let folder = materials_folder.__folders[folder_name]
                console.log(folder)
                GuiMaterialHelper.removeFolder(folder, materials_folder);
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
            let materials:THREE.Material[] = [];
            var mat = obj['material'];

            if (mat !== undefined && mat instanceof THREE.Material) {
                materials.push(mat)
            }

            for (let child of obj.children){
                mat = child['material'];
                if (mat !== undefined && mat instanceof THREE.Material) {
                    materials.push(mat)
                }
            }
            for (mat of materials){
                let folder = materials_folder.addFolder(mat.name);
                GuiMaterialHelper.fillMaterialFolder(folder, mat);
            }
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

        let plane = this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry( 10, 10, 10, 10 ),
            new THREE.MeshBasicMaterial( {color: 0x777777, wireframe: true, side: THREE.DoubleSide} )
        );

        scene.add(plane);

        let axisHelper = new THREE.AxisHelper( 2 );
        scene.add( axisHelper );

        let ambientLight = new THREE.AmbientLight( 0x999999 );
        scene.add(ambientLight);

        let light = this.light = new THREE.PointLight(0xFFFFFF, 1.5, 1000, 0.5);
        light.power = 30;
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
        gui.add(this, 'showPlane');

        let lightFolder = gui.addFolder('light');
        lightFolder.add(this, 'moveLightToCamera');
        GuiMaterialHelper.addColor(lightFolder, light, 'color');
        lightFolder.add(light, 'intensity');
        lightFolder.add(light, 'distance');
        lightFolder.add(light, 'decay');
        lightFolder.add(light, 'power');


        this.currentObject = new THREE.Mesh(
            new THREE.BoxGeometry( 1, 1, 1 ),
            new THREE.MeshLambertMaterial({
                color: 0xF25050,
                shading: THREE.FlatShading
            })
        );

        this.loadObj();
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

    public resetCamera(){
        let mc = this.mouseController;
        mc.theta=70;
        mc.phi=30;
        mc.radius=10;
        mc.updateCameraPosition();
    }

    public loadObj = () => {
        let objLoader = new THREE.OBJLoader();
        let mtlLoader = new THREE.MTLLoader();
        let self = this;

        let onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                let percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete*100)/100 + '% downloaded' );
            }
        };

        let onError = function ( xhr ) { };

        mtlLoader.setPath( 'assets/' );
        mtlLoader.load('landscape_v2_000000.mtl', function( materials:any) {
            console.log(materials);
            materials.preload();

            objLoader.setMaterials(materials);
            objLoader.setPath( 'assets/' );
            objLoader.load( 'landscape_v2_000000.obj', function ( object ) {
                // self.scene.add(object);
                self.currentObject = object;
            }, onProgress, onError );

        });
    }

    public loop = () => {
        requestAnimationFrame(this.loop);
        this.renderer.render(this.scene, this.camera);
    }
}

export default ObjViewer;