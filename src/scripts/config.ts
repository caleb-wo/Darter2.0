import * as Ex from "excalibur";

export const Config = {
    PlayerStartPos: Ex.vec(39, 1000),
    PlayerAcceleration: 250,
    PlayerJumpVelocity: -250,
    PlayerMinVelocity: -300,
    PlayerMaxVelocity: 300,
} as const;