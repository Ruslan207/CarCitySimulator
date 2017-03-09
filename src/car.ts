import {WorldNode, WorldNodes} from "./world";
import {world} from "./main";
class Target{
	constructor(public destination:WorldNode) {
	}
}

class Car{

	constructor() {
		this.targets = [];
		this.path = new WorldNodes();
		let _this = this;
		world.events.subscribe('change_road', () => {
			_this.getPath();
		})
	}

	private currentCell:WorldNode;

	private targets:Array<Target>;

	public addTarget(destination: WorldNode):void{
		let target = new Target(destination);
		this.targets.unshift(target);
	}

	private getPath():void{
		if (this.targets.length>0){
			let src = this.currentCell;
			let target = this.targets[0];
			let three = world.getNodes();
		}
	}

	private path:WorldNodes;
}

export {Car}