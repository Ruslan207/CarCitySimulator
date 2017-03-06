import "GUID"
import {Road} from "./road";
import {ParkingNode} from "./parking_node";

class WorldNode {
	readonly id: string;
	private childs: Array<WorldNode>;

	public addChild(child: WorldNode) {
		this.childs.push(child);
	}

	public connectTo(parent: WorldNode) {
		parent.addChild(this);
	}

	constructor(readonly x: number,
	            readonly y: number,
	            readonly z: number) {
		this.childs = [];
		this.id = (new GUID()).toString();
	}
	public isNear(node: WorldNode){
		if (this.z == node.z &&
			((Math.abs(this.x - node.x) == 1 && this.y == node.y) ||
			((Math.abs(this.y - node.y) == 1 && this.x == node.x)))
		){
			return true;
		} else {
			return false;
		}
	}
}

class World {
	private nodes: Array<WorldNode>;
	private parkings: Array<WorldNode>;
	private roads: Array<WorldNode>;
	
	constructor() {
		this.nodes = [];
	}

	addRoadNode(road: Road){
		for (let node of this.nodes) {
			if (node instanceof Road){
				road.setConnections(node)
			}
		}
		this.nodes.push(road);
		if (road instanceof Road){
			this.roads.push(road);
		}
		if (road instanceof ParkingNode){
			this.parkings.push(road);
		}
	}
}

export {World, WorldNode}