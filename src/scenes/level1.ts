import * as Ex from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import { Player } from "../actors/player";
import { Platform } from "../actors/platform";

export class LevelOne extends Ex.Scene {
    map: TiledResource;
    platforms: Platform[] = []

    constructor(mapResource: TiledResource){
        super();
        this.map = mapResource;
    }

    override onInitialize(engine: Ex.Engine): void {
        // Create player
        const player = new Player();
        // Add tiled resource to scene
        this.map.addToScene(this);

        // Setup platforms
        const colliders = this.map.getObjectLayers()[0];
        if (colliders?.objects){
            for (const obj of colliders?.objects){
                console.log(obj.tiledObject.name);
                this.platforms.push(
                    new Platform(obj.tiledObject.width!, obj.tiledObject.height!, Ex.vec(obj.x, obj.y))
                );
            }
        }

        // Add all platforms
        for (const plat of this.platforms){
            this.add(plat);
        }
        // Add player
        this.add(player);
    
        // Map dimensions and border
        const mapWidth = 512;
        const mapHeight = 512;
        const wallThickness = 10; // How thick the invisible walls are
        const leftWall = new Ex.Actor({
            pos: Ex.vec(-wallThickness / 2, mapHeight / 2),
            width: wallThickness,
            height: mapHeight,
        });
        leftWall.body.collisionType = Ex.CollisionType.Fixed

        const rightWall = new Ex.Actor({
            pos: Ex.vec(mapWidth + wallThickness / 2, mapHeight / 2),
            width: wallThickness,
            height: mapHeight,
        });
        rightWall.body.collisionType = Ex.CollisionType.Fixed

        const topWall = new Ex.Actor({
            pos: Ex.vec(mapWidth / 2, -wallThickness / 2), // Center-X, Half-out on Y
            width: mapWidth,
            height: wallThickness,
        });
        topWall.body.collisionType = Ex.CollisionType.Fixed

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
