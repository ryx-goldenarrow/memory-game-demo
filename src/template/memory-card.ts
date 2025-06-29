import { Sprite, Texture, Assets } from 'pixi.js';
import SpriteV2 from './components/sprite-v2';
import gsap from 'gsap';

export default class MemoryCard extends SpriteV2 {


    public frontCard: SpriteV2
    public backCard: SpriteV2
    public isRevealed: boolean = false;
    public cardId: number = -1;

    constructor(frontTexture?: Texture, backTexture?: Texture, cardId: number = 0) {
        super();

        this.frontCard = this.addChild(new SpriteV2(frontTexture));
        this.backCard = this.addChild(new SpriteV2(backTexture));
        this.cardId = cardId;

    }

    animateReveal(reveal: boolean = true, delay: number = 0) {
        let flipSpeed: number = 0.2;
        let toHideFace: SpriteV2;
        let toShowFace: SpriteV2;
        let animationDelay: number = delay * 0.05

        if (reveal) {
            toHideFace = this.backCard;
            toShowFace = this.frontCard;
        } else {
            toShowFace = this.backCard;
            toHideFace = this.frontCard;
        }

        toShowFace.visible = false;
        toHideFace.visible = true;

        toHideFace.scale.x = 1;
        toShowFace.scale.x = 0;

        gsap.to(toHideFace.scale, {
            delay: animationDelay,
            x: 0, duration: flipSpeed, onComplete: () => {
                toShowFace.visible = true;
                toHideFace.visible = false;
            }
        });
        gsap.to(toShowFace.scale, {
            x: 1, duration: flipSpeed, delay: flipSpeed + animationDelay, onComplete: () => {
                this.isRevealed = reveal;
            }
        });
    }

    animateShake() {
        const distance: number = 25;

        this.frontCard.x = distance;
        this.backCard.x = distance;

        gsap.to([this.frontCard, this.backCard], {
            x: -distance, repeat: 5, duration: 0.15, yoyo: true, onComplete: () => {
                this.frontCard.x = 0;
                this.backCard.x = 0;

            }
        })
    }

    animateCorrect() {
        const scale: number = 1.2;

        this.frontCard.scale.set(scale);
        this.backCard.scale.set(scale);

        gsap.to([this.frontCard.scale, this.backCard.scale], {
            x: 1, y: 1, repeat: 5, duration: 0.15, yoyo: true, onComplete: () => {
                this.frontCard.scale.set(1);
                this.backCard.scale.set(1);
            }
        })
    }




}
