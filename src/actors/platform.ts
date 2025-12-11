import * as ex from "excalibur";

export class Platform extends ex.Actor {
    // Simple class for programmatically instantiaing platforms.
    constructor(platWidth: number, platHeight: number, position: ex.Vector) {
        super({
            pos: position,
            width: platWidth,
            height: platHeight,
            anchor: ex.vec(0,0),
        });
        this.body.collisionType = ex.CollisionType.Fixed;
    }
}