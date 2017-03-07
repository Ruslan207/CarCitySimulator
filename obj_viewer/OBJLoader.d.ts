/// <reference path="../node_modules/@types/three/index.d.ts" />
import * as THREE from "three"

declare class OBJLoader extends THREE.Loader {
        constructor(manager?: THREE.LoadingManager);
        load(url: string, onLoad?: (geometry: THREE.Geometry | THREE.BufferGeometry) => void, onProgress?: (event: any) => void, onError?: (event: any) => void): void;
}

export {OBJLoader};

