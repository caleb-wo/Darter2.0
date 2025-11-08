import * as Ex from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import { Player } from "../actors/player";
import { Platform } from "../actors/platform";
import { SceneHelper } from "./sceneHelper";

export class LevelOne extends Ex.Scene {
    map: TiledResource;
    platforms: Platform[] = []

    constructor(mapResource: TiledResource){
        super();
        this.map = mapResource;
    }

    override onInitialize(engine: Ex.Engine): void {
        const player = new Player();
        this.map.addToScene(this);
        const colliders = this.map.getObjectLayers()[0];

        if (colliders?.objects){
            for (const obj of colliders?.objects){
                console.log(obj.tiledObject.name);
                this.platforms.push(
                    new Platform(obj.tiledObject.width!, obj.tiledObject.height!, Ex.vec(obj.x, obj.y))
                );
            }
        }

        for (const plat of this.platforms){
            this.add(plat);
        }
        this.add(player);
    
        const mapWidth = 512;
        const mapHeight = 512;
        const wallThickness = 10; // How thick the invisible walls are

        // 2. Create the 4 boundary walls
        // We position these using their CENTER (the default anchor)
        
        // Left Wall
        const leftWall = new Ex.Actor({
            pos: Ex.vec(-wallThickness / 2, mapHeight / 2), // Center-Y, Half-out on X
            width: wallThickness,
            height: mapHeight,
        });
        leftWall.body.collisionType = Ex.CollisionType.Fixed

        // Right Wall
        const rightWall = new Ex.Actor({
            pos: Ex.vec(mapWidth + wallThickness / 2, mapHeight / 2),
            width: wallThickness,
            height: mapHeight,
        });
        rightWall.body.collisionType = Ex.CollisionType.Fixed

        // Top Wall
        const topWall = new Ex.Actor({
            pos: Ex.vec(mapWidth / 2, -wallThickness / 2), // Center-X, Half-out on Y
            width: mapWidth,
            height: wallThickness,
        });
        topWall.body.collisionType = Ex.CollisionType.Fixed

        // Bottom Wall
        const bottomWall = new Ex.Actor({
            pos: Ex.vec(mapWidth / 2, mapHeight + wallThickness / 2),
            width: mapWidth,
            height: wallThickness,
        });
        bottomWall.body.collisionType = Ex.CollisionType.Fixed

        this.add(leftWall);
        this.add(rightWall);
        this.add(topWall);
        this.add(bottomWall);
    }
}
