import * as ex from "excalibur";

import { SceneHelper } from "../scenes/sceneHelper"
import { Player } from "../actors/player"
import { LevelOne } from "../scenes/level1";

const game = new ex.Engine({
    width: 512,
    height: 512,
    pixelArt: true,
    pixelRatio: 1,
    displayMode: ex.DisplayMode.FitScreen,
    physics: {
        gravity: ex.vec(0, 700)
    }
});

const mapResource = SceneHelper.getMap("/ForestMap.tmj"); 
game.add("level1", new LevelOne(mapResource));

const loader = new ex.Loader([mapResource]);

game.start(loader).then(() => {
    game.goToScene("level1");
});