declare namespace THREE {
    export class OBJLoader extends THREE.Loader {
        constructor(manager?: THREE.LoadingManager);
        setPath(path:string);
        load(url: string, onLoad?: (geometry: THREE.Object3D) => void, onProgress?: (event: any) => void, onError?: (event: any) => void): void;
        setMaterials(materials:THREE.MTLLoader.MaterialCreator);

        swapNormalsYZ:boolean;
	    swapVertsYZ:boolean;
    }
}


