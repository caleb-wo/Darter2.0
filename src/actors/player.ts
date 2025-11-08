import * as ex from "excalibur";
import { Config } from "../scripts/config"

export class Player extends ex.Actor {
    health = 10;
    jumping = false;

    constructor() {
        super({
            name: "Darter",
            pos: Config.PlayerStartPos,
            width: 16,
            height: 16,
            color: ex.Color.Orange
        });
        this.body.collisionType = ex.CollisionType.Active;
    }

    private isJumpInputActive(engine: ex.Engine): boolean {
        return engine.input.keyboard.isHeld(ex.Keys.Space) 
               || engine.input.keyboard.isHeld(ex.Keys.W);
    }

    override onPostUpdate(engine: ex.Engine): void {
        this.acc.x = 0; 

        if (engine.input.keyboard.isHeld(ex.Keys.A) || engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
            this.acc.x = -Config.PlayerAcceleration;
        }

        if (engine.input.keyboard.isHeld(ex.Keys.D) || engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
            // Set acceleration to the right
            this.acc.x = Config.PlayerAcceleration;
        }

        if (!this.jumping && this.isJumpInputActive(engine)) {
            this.vel.y = Config.PlayerJumpVelocity; // Use config, not -800
            this.jumping = true;
        }
        if (!this.isJumpInputActive(engine)) {
            this.jumping = false;
        }

        this.vel.x = ex.clamp(this.vel.x, Config.PlayerMinVelocity, Config.PlayerMaxVelocity);
    }
}