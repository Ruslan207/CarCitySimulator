import {Direction, Road} from "./road";
import {Parking} from "./building";
class ParkingNode extends Road{
	readonly parking: Parking;
	constructor(x: number, y: number, z: number){
		super(x,y,z,Direction.ANY);
		this.parking = new Parking(1);
	}
}

export {ParkingNode}