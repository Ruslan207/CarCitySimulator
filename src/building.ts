import {WorldNode, World} from "./world";
import {world} from "./main";
import {Road} from "./road";
import {Car} from "./car";

enum BuildingType{
	Home,
	Office,
	Mall,
	GasStation
}

class Parking {

	private cars: Array<Car>;

	constructor(private capacity: number) {
		this.cars = [];
	}
}

class Building {

	private parking: Parking;

	constructor(readonly length: number,
	            readonly width: number,
	            readonly height: number,
	            readonly x: number,
	            readonly y: number,
	            readonly type: BuildingType,
	            parkingCapacity: number,
	            private linked: Array<Road>) {

		this.parking = new Parking(parkingCapacity);

		for (let node of linked) {
			world.addRoadNode(node)
		}
	}
}

export {Parking, Building, BuildingType}