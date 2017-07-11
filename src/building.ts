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

	constructor(readonly capacity: number) {
		this.cars = [];
	}

	public add(car: Car){
		if (this.cars.length < this.capacity){
			this.cars.push(car);
		} else {
			console.error(`Parking is full [Car id: ${car.id}]`)
		}
	}
}

class Building {

	public tick(dt:number){

	}

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
		if (this.type == BuildingType.Home){
			for (let i = 0; i < parkingCapacity; i++) {
				let car = new Car();
			}
		}
	}
}

export {Parking, Building, BuildingType}