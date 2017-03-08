import CameraMouseController from "./CameraMouseController";
import * as dat from "dat-gui"
import "./OBJLoader"
import "./MTLLoader"
import MTLLoader = THREE.MTLLoader;
import {GuiMaterialHelper} from "./GuiMaterialHelper";
import {patchLoader, requestFileFromLocal} from "./PatchDialogFileLoader"

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
    private materialsHolder: THREE.MTLLoader.MaterialCreator;
    private materialsFolder: dat.GUI;
    private objectsFolder: dat.GUI;
    private texturesFolder: dat.GUI;
    private textures;


    private set currentObject(obj:THREE.Object3D){
        if (this._currentObject != null) {
            this.scene.remove(this._currentObject);
            GuiMaterialHelper.clearFolder(this.objectsFolder);
            GuiMaterialHelper.clearFolder(this.materialsFolder);
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
            let mat = obj['material'];

            if (mat instanceof THREE.Material) {
                materials.push(mat)
            }

            let objects:THREE.Object3D[] = [];
            if (!(obj instanceof THREE.Group)){
                objects.push(obj)
            }


            for (let child of obj.children){
                mat = child['material'];
                if (mat !== undefined && mat instanceof THREE.Material && !materials.some(m => m == mat)) {
                    materials.push(mat)
                }
                objects.push(child)
            }
            for (let mat_i in materials){
                let mat = materials[mat_i];
                let folder = this.materialsFolder.addFolder(mat_i+'|'+mat.name);
                GuiMaterialHelper.fillMaterialFolder(folder, mat);
            }
            objects.sort((a:THREE.Object3D, b:THREE.Object3D):number => {return a.name.localeCompare(b.name)});
            let objects_wrapper = {};
            for (let obj_i in objects){
                let obj = objects[obj_i];
                let name = obj_i+'|'+obj.name;
                Object.defineProperty(objects_wrapper, name, {
                    get: function() {
                        return obj.visible;
                    },
                    set: function(val:boolean){
                        obj.visible = val;
                    }
                })
                this.objectsFolder.add(objects_wrapper, name);
            }
        }
    }

    private resize(width:number, height:number) {
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

        this.materialsHolder = new THREE.MTLLoader.MaterialCreator();

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
        gui.addColor(this, 'background');
        gui.add(this, 'loadMTL');
        this.texturesFolder = this.gui.addFolder('textures');
        gui.add(this, 'loadOBJ');
        gui.add(this, 'resetCamera');
        gui.add(this, 'showPlane');

        let lightFolder = gui.addFolder('light');
        lightFolder.add(this, 'moveLightToCamera');
        GuiMaterialHelper.addColor(lightFolder, light, 'color');
        lightFolder.add(light, 'intensity');
        lightFolder.add(light, 'distance');
        lightFolder.add(light, 'decay');
        lightFolder.add(light, 'power');
        lightFolder.add(light, 'visible');

        let amlightFolder = gui.addFolder('AmbientLight');
        amlightFolder.add(this, 'moveLightToCamera');
        GuiMaterialHelper.addColor(amlightFolder, ambientLight, 'color');
        amlightFolder.add(ambientLight, 'intensity');
        amlightFolder.add(ambientLight, 'visible');

        this.textures = {};

        this.materialsFolder = this.gui.addFolder('materials');
        this.objectsFolder = this.gui.addFolder('objects');

        let texturesFolder = this.texturesFolder;
        let textures = this.textures;

        patchLoader(THREE.FileLoader);
        patchLoader(THREE.ImageLoader, null, (url, loadFunc, instance, onLoad, onProgress, onError) => {
            if (textures[url] == undefined) {
                textures[url] = (e) => {
                    requestFileFromLocal(url, loadFunc, instance, onLoad, onProgress, onError);
                };
                texturesFolder.add(textures, url);
                texturesFolder.open();
            }
        });

        this.currentObject = new THREE.Mesh(
            new THREE.BoxGeometry( 1, 1, 1 ),
            new THREE.MeshLambertMaterial({
                color: 0xF25050,
                shading: THREE.FlatShading
            })
        );
        // this.loadMTL(this.loadOBJ);

    }

    public get showPlane(){
        return this.plane.visible;
    }

    public set showPlane(val:boolean){
        this.plane.visible=val;
    }

    public get background(){
        return '#'+this.renderer.getClearColor().getHexString();
    }

    public set background(val:string){
        this.renderer.setClearColor(new THREE.Color(val).getHex());
    }

    public moveLightToCamera(){
        let p = this.camera.position;
        this.light.position.set(p.x, p.y, p.z);
    }

    public resetCamera(){
        let mc = this.mouseController;
        mc.theta=70;
        mc.phi=30;
        mc.radius=10;
        mc.offset.set(0,0,0);
        mc.updateCameraPosition();
    }

    private loaderOnProgress( xhr ) {
        if ( xhr.lengthComputable ) {
            let percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete*100)/100 + '% downloaded' );
        }
    };

    private loaderOnError( xhr ) {
        console.log('Error', xhr)
    };

    public loadOBJ = () => {
        let objLoader = new THREE.OBJLoader();
        let self = this;

        objLoader.setMaterials(self.materialsHolder);
        objLoader.setPath( '' );
        objLoader.load( 'landscape_v2_000000.obj', function ( object ) {
            self.currentObject = object;
        }, self.loaderOnProgress, self.loaderOnError);

    };

    private loadMTL = (callback:() => void) => {

        GuiMaterialHelper.clearFolder(this.materialsFolder);
        let mtlLoader = new THREE.MTLLoader();
        let self = this;

        mtlLoader.setPath( '' );
        mtlLoader.setTexturePath( '' );
        mtlLoader.load('landscape_v2_000000.mtl', function( materials:THREE.MTLLoader.MaterialCreator) {
            console.log(mtlLoader)
            self.materialsHolder = materials;
            self.materialsHolder.preload();
            //callback()
        }, self.loaderOnProgress, self.loaderOnError);
    }

    public loop = () => {
        requestAnimationFrame(this.loop);
        this.renderer.render(this.scene, this.camera);
    }
}

export default ObjViewer;