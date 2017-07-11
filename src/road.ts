import {WorldNode} from "./world";

enum Direction{
	UP,
	RIGHT,
	LEFT,
	DOWN,
	ANY
}

export {Direction}

class Modifier {

}

class TrafficLight extends Modifier{
	private state = 0;
	private timer;

	constructor(interval: number){
		super();
		let sign = +1;
		this.timer = setInterval(() => {
			this.timer += sign;
			this.timer %= 3;
			if (this.timer == 0 || this.timer == 2){
				sign *= -1;
			}
		}, interval)
	}
}

class SpeedLimit extends Modifier{
	readonly value = Infinity;

	constructor(value?:number){
		super();
		if (value != undefined) {
			this.value = value;
		}
	}
}

class Road extends WorldNode{

	readonly modifiers:Modifier[];

	public addModifier(modifier:Modifier){
		this.modifiers.push(modifier);
	}

	public hasSameDirection(road: Road):boolean{
		if (this.direction == road.direction){
			return true;
		} else {
			if (this.direction == Direction.ANY || road.direction == Direction.ANY) {
				return true;
			}
		}
		return false;
	}

	private isHorizontal(road: Road):boolean{
		return this.x == road.x;
	}

	private isVertical(road: Road):boolean{
		return this.y == road.y;
	}

	private getLeft(road: Road):Road{
		if (this.x < road.x){
			return this
		} else {
			return road;
		}
	}

	private getRight(road: Road):Road{
		if (this.x > road.x){
			return this
		} else {
			return road
		}
	}

	private getTop(road: Road):Road{
		if (this.y < road.y){
			return this
		} else {
			return road
		}
	}

	private getBottom(road: Road):Road{
		if (this.y > road.y){
			return this
		} else {
			return road
		}
	}

	get direction(): Direction {
		return this._direction;
	}

	public setConnections(road: Road):void{
		if (this.isNear(road) && this.hasSameDirection(road)){
			if (this.isVertical(road)){
				switch (this.getBottom(road).direction){
					case Direction.ANY:
						switch (this.getTop(road).direction){
							case Direction.ANY:
								this.getBottom(road).connectTo(this.getTop(road));
								this.getTop(road).connectTo(this.getBottom(road));
								break;
							case Direction.DOWN:
								this.getBottom(road).connectTo(this.getTop(road));
								break;
							case Direction.UP:
								this.getTop(road).connectTo(this.getBottom(road));
								break;
						}
						break;
					case Direction.UP:
						this.getTop(road).connectTo(this.getBottom(road));
						break;
					case Direction.DOWN:
						this.getBottom(road).connectTo(this.getTop(road));
						break;
					case Direction.LEFT:
					case Direction.RIGHT:
						this.getBottom(road).connectTo(this.getTop(road));
						this.getTop(road).connectTo(this.getBottom(road));
						break;
				}
			} else {
				if (this.isHorizontal(road)){
					switch (this.getLeft(road).direction){
						case Direction.ANY:
							switch (this.getRight(road).direction){
								case Direction.ANY:
									this.getLeft(road).connectTo(this.getRight(road));
									this.getRight(road).connectTo(this.getLeft(road));
									break;
								case Direction.LEFT:
									this.getLeft(road).connectTo(this.getRight(road));
									break;
								case Direction.RIGHT:
									this.getRight(road).connectTo(this.getLeft(road));
									break;
							}
							break;
						case Direction.RIGHT:
							this.getRight(road).connectTo(this.getLeft(road));
							break;
						case Direction.LEFT:
							this.getLeft(road).connectTo(this.getRight(road));
							break;
						case Direction.DOWN:
						case Direction.UP:
							this.getLeft(road).connectTo(this.getRight(road));
							this.getRight(road).connectTo(this.getLeft(road));
							break;
					}
				}
			}
		}
	}

	constructor(x: number, y: number, z: number,
				private _direction: Direction) {
		super(x, y, z);
	}
}

export {Road}