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
    }
}
