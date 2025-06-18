//👤
import { Assets, Graphics, Text, Texture } from 'pixi.js';
import { COLORS } from '../../enums';
import { GAMESETTINGS } from '../../game-settings';
import SpriteV2 from './sprite-v2';
import { DimColor } from '../../utils/Utils';

export default class TextField extends SpriteV2 {
    //private bg: Graphics;
    private labelText: Text;
    public icon: SpriteV2;

    constructor(
        label: string = 'Text',
        w: number = 100,
        h: number = 40,
        color: number = COLORS.DARKGRAY,
        textSize: number = 15,
        iconTxtr?: Texture
    ) {
        super();

        const bg = this.addChild(
            new SpriteV2(Assets.get('generic_ui').textures['btn_10000'])
        );
        bg.scale.set(0.6);

        this.labelText = this.addChild(new Text(GAMESETTINGS.textStyleLabel));
        this.labelText.anchor.set(0, 0.5);
        this.labelText.style.align = 'center';
        this.labelText.style.fontSize = textSize;
        this.labelText.text = label;
        this.labelText.style.fill = COLORS.BLACK;
        this.labelText.position.set(-w * 0.45 + h, 0);
        this.labelText.style.wordWrap = true;
        this.labelText.style.wordWrapWidth = w * 0.6;

        this.icon = this.addChild(new SpriteV2(iconTxtr));
        this.icon.width = h - 10;
        this.icon.height = h - 10;
        this.icon.position.set(-w * 0.5 + h * 0.65, 0);
    }

    updateText(str: string) {
        this.labelText.text = str;
    }
}
