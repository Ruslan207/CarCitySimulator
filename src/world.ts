import "GUID"
import {Road} from "./road";
import {ParkingNode} from "./parking_node";
import {Building} from "./building";
import "./event_manager"

class WorldNode {
	get removed(): boolean {
		return this._removed;
	}

	set removed(value: boolean) {
		this._removed = value;
	}
	readonly id: string;
	private _childs: WorldNodes;
	private _removed: boolean;


	get childs(): WorldNodes {
		return this._childs;
	}

	public addChild(child: WorldNode):void {
		this._childs.push(child);
	}

	public connectTo(parent: WorldNode):void {
		parent.addChild(this);
	}

	constructor(readonly x: number,
	            readonly y: number,
	            readonly z: number) {
		this._childs = new WorldNodes();
		this.id = (new GUID()).toString();
		this._removed = false;
	}
	public isNear(node: WorldNode):boolean{
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

class WorldNodes{
	private nodes:Array<WorldNode>;

	constructor() {
		this.nodes = [];
	}

	public push(node: WorldNode){
		this.nodes.push(node);
	}

	public getByIndex(index:number):WorldNode{
		return this.getById(this.nodes[index].id);
	}

	get length():number{
		return this.nodes.length;
	}

	public remove(index:number):WorldNode{
		return this.nodes.splice(index, 1)[0];
	}

	public getById(id:string): WorldNode{
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].id == id){
				if (this.nodes[i].removed){
					this.remove(i);
					return null;
				} else {
					return this.nodes[i];
				}
			}
		}
	}
}

class World {
	private nodes: WorldNodes;
	private parkings: WorldNodes;
	private roads: WorldNodes;
	private buildings: Array<Building>;
	public events:EventManager;
	
	constructor() {
		this.nodes = new WorldNodes();
		this.parkings = new WorldNodes();
		this.roads = new WorldNodes();
		this.buildings = [];
		this.events = new EventManager();
	}

	getBuildings(){
		return this.buildings;
	}

	getNodes():WorldNodes{
		return this.nodes;
	}

	addBuilding(buiding: Building):void{
		this.buildings.push(buiding);
		this.events.trigger('new_building', buiding);
	}

	removeRoadNode(road: Road|string){
		let id = typeof road == "string" ? road : road.id;
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].id == id){
				this.nodes.remove(i).removed = true;
				break;
			}
		}
		if (road instanceof Road){
			for (let i = 0; i < this.roads.length; i++) {
				if (this.roads[i].id == id){
					this.roads.remove(i).removed = true;
					break;
				}
			}
		}
	}

	addRoadNode(road: Road):void{
		for (let i=0; i<this.nodes.length; i++){
			let node = this.nodes.getByIndex(i);
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
		this.events.trigger('change_road', road);
	}
}

export {World, WorldNode, WorldNodes}