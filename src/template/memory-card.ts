import { Sprite, Texture } from 'pixi.js';
import SpriteV2 from './components/sprite-v2';

export default class MemoryCard extends SpriteV2 {
    constructor(txtr?: Texture) {
        super(txtr);

    }
}
