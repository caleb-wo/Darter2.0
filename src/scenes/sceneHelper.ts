import { TiledResource } from "@excaliburjs/plugin-tiled";
import * as Ex from "excalibur";

export class SceneHelper{
    public static getMap(url: string): TiledResource {
        const tiledMap = new TiledResource(url);
        return tiledMap;
    }
}
