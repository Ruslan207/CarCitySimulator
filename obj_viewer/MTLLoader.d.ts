declare namespace THREE {
    export class MTLLoader extends THREE.Loader {

        constructor(manager?: THREE.LoadingManager);
        setPath(path:string);
        setTexturePath(path:string);
        load(url: string, onLoad?: (materialCreator: THREE.MTLLoader.MaterialCreator) => void, onProgress?: (event: any) => void, onError?: (event: any) => void): void;
        preload();

    }

    export module MTLLoader{
        class MaterialCreator{
            materials:THREE.Material[];

            preload();
        }
    }
}