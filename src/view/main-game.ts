import { Application, Assets, Color, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { isPortrait, shuffleArray } from '../utils/Utils';
import { COLORS, GameEvents } from '../enums';

import GameHud from './game-hud';
import MemoryCard from '../template/memory-card';
import SpriteV2 from '../template/components/sprite-v2';
import Resize from './resize';
import gsap from 'gsap';

export default class MainGame extends SpriteV2 {
    public TOTAL_CARDS: number = 18;
    public PATTERNS: number[] = [];
    public cardContainer: Sprite = new SpriteV2();
    public cards: MemoryCard[] = [];
    public bg: SpriteV2 = new SpriteV2(Assets.get("bg"));
    public gameHud: GameHud = new GameHud();


    public resize: Resize

    constructor(app: Application, resize: Resize) {
        super();
        this.resize = resize;
        this.setupPatterns();
        this.drawGameElements();
        this.drawCards();
        this.adjustDisplay();
        this.checkScreenSize();

    }

    setupPatterns() {
        for (let i: number = 0; i < this.TOTAL_CARDS * 0.5; i++) {
            this.PATTERNS[i] = i;
        }
        this.PATTERNS = this.PATTERNS.concat(this.PATTERNS);
        shuffleArray(this.PATTERNS);
    }

    drawGameElements() {

        //add game background
        this.addChild(
            this.bg,
            this.cardContainer,
        )
    }



    drawCards() {

        const box = this.addChild(new Graphics());
        box.rect(-640, -360, 1280, 720);
        box.fill(COLORS.BLACK, 0.5);
        box.alpha = 0;

        this.cardContainer.scale.set(0.65)

        for (let i: number = 0; i < this.TOTAL_CARDS; i++) {
            let textureId: string = 'mascot' + ((this.PATTERNS[i] % (this.TOTAL_CARDS * 0.5)) + 1) + "0000";
            let textureFront: Texture = Assets.get("cards").textures[textureId];
            let textureBack: Texture = Assets.get("card_back");
            this.cards[i] = this.cardContainer.addChild(new MemoryCard(textureFront, textureBack));
            this.cards[i].cardId = this.PATTERNS[i];
            this.cards[i].scale.set(0.35)
        }
    }

    adjustDisplay() {
        let i: number = 0,
            j: number = 0,
            k: number = 0;

        if (isPortrait()) {
            //setFullscreen(true);
            //portrait
            for (i = 0; i < this.TOTAL_CARDS; i++) {
                this.cards[i].position.set(-200 + (200 * j), -480 + (230 * k));
                j++;
                if (j > 2) {
                    j = 0
                    k++;
                }
            }
        } else {
            //setFullscreen(true);
            //landscape
            for (i = 0; i < this.TOTAL_CARDS; i++) {
                this.cards[i].position.set(-500 + (200 * j), -200 + (230 * k));
                j++;
                if (j > 5) {
                    j = 0
                    k++;
                }
            }
        }
    }

    //display settings---------------------------------
    checkScreenSize() {
        document.body.onresize = (e) => {
            console.log("onresize", e)
            this.resizeScreen();
        };

        this.resize.event.on(GameEvents.ORIENTATION_CHANGE, () => {
            console.log("orientation")
            this.resizeScreen();
        });
    }

    resizeScreen() {
        //
        console.log("isPortrait", isPortrait())
        this.adjustDisplay();
    }

    startGame() {

        let hideDelay: number = 1;
        let i: number = 0;

        for (i = 0; i < this.TOTAL_CARDS; i++) {
            this.cards[i].animateReveal(true, i);
        }

        gsap.delayedCall(hideDelay, () => {
            for (i = 0; i < this.TOTAL_CARDS; i++) {
                this.cards[i].animateReveal(false, i);
            }

        })
    }

}
