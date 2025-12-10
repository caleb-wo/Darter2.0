import * as Ex from "excalibur";

export const Config = {
    PlayerStartPos: Ex.vec(208, 304),
    PlayerAcceleration: 150,
    PlayerJumpVelocity: -250,
    PlayerWallKick: 100,
    PlayerMinVelocity: -300,
    PlayerMaxVelocity: 300,
} as const;