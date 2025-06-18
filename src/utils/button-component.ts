import { Graphics } from 'pixi.js';

import TextV2 from './text-v2';
import SpriteV2 from './sprite-v2';
import { COLORS } from '../enums';
import { GAMESETTINGS, GameSettings } from '../game-settings';
import { DimColor, GradientColor } from './Utils';

export default class ButtonComponent extends SpriteV2 {
    private button: Graphics;
    private labelText: TextV2;

    constructor(
        label: string = '',
        w: number = 100,
        h: number = 40,
        color: number = COLORS.DARKGRAY,
        textSize: number = 20
    ) {
        super();

        this.button = this.addChild(new Graphics());
        this.button.roundRect(-w * 0.5, -h * 0.5, w, h + 5, 10);
        this.button.fill(DimColor(color), 0.95);
        //
        this.button.roundRect(-w * 0.5, -h * 0.5, w, h, 10);
        this.button.fill(GradientColor(color, DimColor(color)));
        // this.button.cacheAsTexture(true);

        this.labelText = this.button.addChild(
            new TextV2(GAMESETTINGS.textstyle1)
        );
        this.labelText.style.align = 'center';
        this.labelText.style.fontSize = textSize;
        this.labelText.y = -2;
        this.updateText(label);
    }

    updateText(str: string) {
        this.labelText.updateText(str);
    }
}
