import * as ex from "excalibur";
import { Config } from "../scripts/config";

export class Player extends ex.Actor {
    health = 10;
    isGrounded = false;
    isWallSlidingLeft = false;
    isWallSlidingRight = false;

    constructor() {
        // SETUP- w/ actor constructor.
        super({
            name: "Darter",
            pos: Config.PlayerStartPos,
            width: 16,
            height: 16,
            color: ex.Color.Orange,
        });
        this.body.collisionType = ex.CollisionType.Active;
    }

    override onInitialize(engine: ex.Engine): void {
        // SETUP- prepare state mutation to be triggered on collisions
        this.on('collisionstart', (ev) => {
            // Wall contact logic
            if (ev.side === ex.Side.Left) {
                this.isWallSlidingLeft = true;
            }
            if (ev.side === ex.Side.Right) {
                this.isWallSlidingRight = true;
            }
            if (ev.side === ex.Side.Bottom) {
                this.isGrounded = true;
            }
        });

        this.on('collisionend', (ev) => {
            // Wall separation logic
            if (ev.side === ex.Side.Left) {
                this.isWallSlidingLeft = false;
            }
            if (ev.side === ex.Side.Right) {
                this.isWallSlidingRight = false;
            }
            if (ev.side === ex.Side.Bottom) {
                this.isGrounded = false;
            }
        });
    }

    private isJumpInputActive(engine: ex.Engine): boolean {
        return engine.input.keyboard.wasPressed(ex.Keys.Space)
               || engine.input.keyboard.wasPressed(ex.Keys.W);
    }

    override onPostUpdate(engine: ex.Engine): void {
        this.acc.x = 0;

        if (engine.input.keyboard.isHeld(ex.Keys.A) || engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
            this.acc.x = -Config.PlayerAcceleration;
        }

        if (engine.input.keyboard.isHeld(ex.Keys.D) || engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
            this.acc.x = Config.PlayerAcceleration;
        }

        if (this.isGrounded && this.isJumpInputActive(engine)) {
            this.vel.y = Config.PlayerJumpVelocity;
        }

        this.vel.x = ex.clamp(this.vel.x, Config.PlayerMinVelocity, Config.PlayerMaxVelocity);
    }
}