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
			// let three = world.getNodes();
			let queue:WorldNode[] = [];
			let visited = {};
			queue.push(src);
			while (queue.length > 0){
				let node = queue.shift();
				visited[node.id].used = true;
				if (target.destination.id != node.id){
					for (let i = 0; i < node.childs.length; i++) {
						let child = node.childs.getByIndex(i);
						if (child && !visited[child.id].used){
							queue.push(child);
							visited[child.id] = {
								used: false,
								parent: node
							}
						}
					}
				} else {
					let path:WorldNode[] = [];
					let tmp = node;
					while (tmp.id != src.id){
						path.push(tmp);
						tmp = visited[tmp.id].parent;
					}
					path.push(tmp);
					this.path = new WorldNodes();
					for (let i = path.length - 1; i >= 0; i--) {
						this.path.push(path[i]);
					}
					return;
				}
			}
			this.path = new WorldNodes();
		}
	}

	private path:WorldNodes;
}

export {Car}