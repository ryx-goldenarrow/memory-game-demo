import { Text, Texture } from 'pixi.js';
import { GAMESETTINGS } from '../../game-settings';
import SpriteV2 from './sprite-v2';
import { COLORS } from '../../enums';
import gsap from 'gsap';

export default class ButtonImage extends SpriteV2 {
    public button: SpriteV2;
    public iconImage: SpriteV2 = new SpriteV2();
    public buttonBg: SpriteV2 = new SpriteV2();
    public labelText: Text;
    public scaleSize: number = 0.65;

    constructor(
        label: string = '',
        texture: Texture,
        texture2: Texture | null = null,
        textSize: number = 20,
        color: number = COLORS.WHITE
    ) {
        super();

        this.buttonBg = this.addChild(new SpriteV2(texture));
        this.buttonBg.scale.set(0.65);

        this.button = this.addChild(new SpriteV2(texture));
        this.button.scale.set(0.6);
        this.button.tint = color;

        if (texture2 != null) {
            this.iconImage = this.addChild(new SpriteV2(texture2));
            this.iconImage.scale.set(0.6);
        }

        this.labelText = this.addChild(new Text(GAMESETTINGS.textStyleNumber));
        this.labelText.style.align = 'center';
        this.labelText.style.fontSize = textSize;
        this.labelText.style.dropShadow = true;
        this.labelText.style.dropShadow.alpha = 0.5;
        this.labelText.style.dropShadow.blur = 8;
        this.labelText.anchor.set(0.5);
        this.labelText.text = label;
        this.labelText.y = -(textSize * 0.25);
    }

    animateHover() {
        gsap.to(this.buttonBg.scale, {
            startAt: { x: this.scaleSize, y: this.scaleSize },
            x: this.scaleSize + 0.05,
            y: this.scaleSize + 0.05,
            duration: 0.15,
            repeat: 1,
            yoyo: true,
        });
    }
}
