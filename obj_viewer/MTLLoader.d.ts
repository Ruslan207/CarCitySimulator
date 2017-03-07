declare namespace THREE {
    export class MTLLoader extends THREE.Loader {
        constructor(manager?: THREE.LoadingManager);
        setPath(path:string);
        load(url: string, onLoad?: (geometry: THREE.Geometry | THREE.BufferGeometry) => void, onProgress?: (event: any) => void, onError?: (event: any) => void): void;
        preload();
    }
}