import * as Ex from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import { Player } from "../actors/player";
import { Platform } from "../actors/platform";
import { SceneHelper } from "./sceneHelper";

export class LevelOne extends Ex.Scene {
    map: TiledResource;

    constructor(mapResource: TiledResource){
        super();
        this.map = mapResource;
    }

    override onInitialize(engine: Ex.Engine): void {
        const player = new Player();
        this.map.addToScene(this);
        const layers = this.map.getObjectLayers();
        this.add(player);
        console.log(this.map.getObjectLayers());
    }
}
