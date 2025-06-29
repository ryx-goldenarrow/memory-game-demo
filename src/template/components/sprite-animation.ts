import { Assets, Texture } from 'pixi.js';
import SpriteV2 from './sprite-v2';

import gsap from 'gsap';
import { NumberZero } from '../../utils/Utils';
import { TexturePacker } from '../../utils/PixiUtils';

export default class SpriteAnimation extends SpriteV2 {
    constructor(txtr?: Texture) {
        super();

        this.interactive = false;

        if (txtr != undefined) {
            this.texture = txtr;
        }
    }

    /**
     * Play the sprite animation.
     * @param rate - The rate at which the animation frames change.
     * @param frameSize - The total number of frames in the animation.
     * @param base - The base path for the texture assets.
     * @param txtr - The texture name to be used in the animation.
     * @param isTexurePacker - Whether to use TexturePacker or not.
     */

    play(
        rate: number,
        frameSize: number = 18,
        base: string,
        txtr: string,
        isTexurePacker: boolean = true
    ) {
        let i: number = 0;
        let id: number = 0;

        gsap.to(this, {
            duration: 1,
            repeat: -1,
            onUpdate: () => {
                if (i >= rate) {
                    i = 0;
                    if (id >= frameSize) {
                        id = 0;
                    }
                    if (isTexurePacker == true) {
                        this.texture = this.getTexturePacker(base, txtr, id);
                    } else {
                        this.texture = this.getTexture(base, txtr, id);
                    }
                    id += 1;
                }

                i += 1;
            },
        });
    }

    stop() {
        gsap.killTweensOf(this);
    }

    getTexture(base: string, txtr: string, id: number): Texture {
        return Assets.get(base).textures[txtr + NumberZero(id, 4)];
    }

    getTexturePacker(base: string, txtr: string, id: number): Texture {
        return TexturePacker(base, txtr + NumberZero(id, 4));
    }
}
