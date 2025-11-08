import * as Ex from "excalibur";

export const Config = {
    PlayerStartPos: Ex.vec(208, 304),
    PlayerAcceleration: 1200,
    PlayerJumpVelocity: -800,
    PlayerMinVelocity: -500,
    PlayerMaxVelocity: 500,
} as const;