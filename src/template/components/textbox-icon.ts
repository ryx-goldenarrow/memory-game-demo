import { Graphics, Text, Texture, BitmapText, Assets } from 'pixi.js';
import { COLORS } from '../../enums';
import { GAMESETTINGS } from '../../game-settings';
import SpriteV2 from './sprite-v2';
import { DimColor } from '../../utils/Utils';

export default class TextboxIcon extends SpriteV2 {
    //private button: Graphics;
    private labelText: Text;
    private labelTitle: Text;
    public icon: SpriteV2;
    public bg: SpriteV2;

    constructor(
        title: string = 'Title',
        label: string = 'Text',
        w: number = 100,
        h: number = 40,
        color: number = COLORS.DARKGRAY,
        textSize: number = 15,
        iconTxtr?: Texture
    ) {
        super();

        this.bg = this.addChild(
            new SpriteV2(Assets.get('generic_ui').textures['btn_20000'])
        );
        this.bg.scale.set(0.6);

        this.labelTitle = this.addChild(new Text(GAMESETTINGS.textStyleLabel));
        this.labelTitle.style.align = 'left';
        this.labelTitle.style.fontSize = textSize - 6;
        this.labelTitle.anchor.set(0, 0.5);
        this.labelTitle.text = title;
        this.labelTitle.style.fill = COLORS.BLACK;
        this.labelTitle.position.set(-w * 0.4 + h, -10);

        this.labelText = this.addChild(new Text(GAMESETTINGS.textStyleNumber));
        this.labelText.style.align = 'left';
        this.labelText.style.fontSize = textSize;
        this.labelText.anchor.set(0, 0.5);
        this.labelText.text = label;
        this.labelText.style.fill = COLORS.BLACK;
        this.labelText.position.set(-w * 0.4 + h, 10);

        this.icon = this.addChild(new SpriteV2(iconTxtr));
        this.icon.width = h - 10;
        this.icon.height = h - 10;
        this.icon.position.set(-w * 0.5 + h * 0.6, 0);
    }

    updateText(str: string) {
        this.labelText.text = str;
    }
}
