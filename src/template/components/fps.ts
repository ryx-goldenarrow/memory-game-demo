import { Sprite, Assets, Text, Graphics, Application } from "pixi.js";
import SpriteV2 from "./sprite-v2";
import { GAMESETTINGS } from "../../game-settings";
import { COLORS } from "../../enums";
import { addTickerEvent } from "../../utils/PixiUtils";

export default class FPS extends Sprite {
    private fpsLabel: Text;
    private app: Application;

    constructor(app: Application) {
        super();

        this.app = app;

        const bg: Graphics = this.addChild(new Graphics());
        bg.roundRect(-20, -10, 40, 20, 10);
        bg.fill(0x0);
        bg.alpha = 0.35;

        this.fpsLabel = this.addChild(new Text(GAMESETTINGS.textstyle1));
        this.fpsLabel.text = "FPS";
        this.fpsLabel.style.fontSize = 10;
        this.fpsLabel.style.fill = COLORS.WHITE;
        this.fpsLabel.style.fontWeight = "bolder";
        this.fpsLabel.anchor.set(0.5);

        this.init();
    }

    init() {
        this.visible = true;
        let counter: number = 0;
        addTickerEvent(() => {
            counter += 1;
            if (counter > 10) {
                this.fpsLabel.text = "FPS: " + this.app.ticker.FPS.toFixed(0);
                counter = 0;
            }
        });
    }
}
