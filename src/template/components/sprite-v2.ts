import { Sprite, Assets, Texture } from 'pixi.js';

export default class SpriteV2 extends Sprite {
    constructor(txtr?: Texture) {
        super();
        this.anchor.set(0.5);
        this.pivot.set(0.5);

        this.interactive = false;

        if (txtr != undefined) {
            this.texture = txtr;
        }
    }
}
