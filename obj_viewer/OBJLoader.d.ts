declare namespace THREE {
    export class OBJLoader extends THREE.Loader {
        constructor(manager?: THREE.LoadingManager);

        load(url: string, onLoad?: (geometry: THREE.Geometry | THREE.BufferGeometry) => void, onProgress?: (event: any) => void, onError?: (event: any) => void): void;
    }
}


