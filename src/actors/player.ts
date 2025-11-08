import * as ex from "excalibur";

export class Player extends ex.Actor {
    health = 10;

    constructor() {
        super({
            name: "Darter",
            pos: ex.vec(200, 300),
            width: 16,
            height: 16,
            color: ex.Color.Orange
        });
    }
}