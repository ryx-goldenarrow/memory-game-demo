import { Application, Assets, Container, Graphics, Sprite } from 'pixi.js';
import { isPortrait, setFullscreen, shuffleArray } from '../utils/Utils';
import SpriteV2 from '../template/components/sprite-v2';
import { PixiFilters } from '../utils/PixiFilters';
import gsap from 'gsap';
import { GAMESETTINGS } from '../game-settings';
import GameHud from './game-hud';
import { TexturePacker } from '../utils/PixiUtils';
import MemoryCard from '../template/memory-card';
import { COLORS } from '../enums';

export default class MainGame extends SpriteV2 {
    private app: Application;
    private cardContainer: Sprite = new SpriteV2();
    private cards: MemoryCard[] = [];
    private bg: SpriteV2 = new SpriteV2();
    public gameHud: GameHud = new GameHud();
    private boxes: Graphics[] = [];
    private TOTAL_CARDS: number = 18;
    private PATTERNS: number[] = [];


    constructor(app: Application) {
        super();
        this.app = app;
        this.setupPatterns();
        this.drawGameElements
        this.drawCards();
        this.adjustDisplay();

    }

    setupPatterns() {
        for (let i: number = 0; i < this.TOTAL_CARDS * 0.5; i++) {
            this.PATTERNS[i] = i;
        }
        this.PATTERNS = this.PATTERNS.concat(this.PATTERNS);
        shuffleArray(this.PATTERNS);
        console.log("PATTERNS", this.PATTERNS)
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

        for (let i: number = 0; i < this.TOTAL_CARDS; i++) {
            let textureId: string = 'mascot' + ((i % (this.TOTAL_CARDS * 0.5)) + 1) + "0000";
            console.log("texture", textureId);
            this.cards[i] = this.addChild(new MemoryCard(Assets.get("cards").textures[textureId]));
            this.cards[i].scale.set(0.35)
        }
    }


    adjustDisplay() {
        let i: number = 0,
            j: number = 0,
            k: number = 0;

        if (isPortrait()) {
            //setFullscreen(true);
            for (i = 0; i < this.TOTAL_CARDS; i++) {
                this.cards[i].position.set(-450 + (180 * j), -480 + (230 * k));
                j++;
                if (j > 2) {
                    j = 0
                    k++;
                }
            }



        } else {
            //setFullscreen(true);
            for (i = 0; i < this.TOTAL_CARDS; i++) {
                this.cards[i].position.set(-500 + (200 * j), -230 + (230 * k));
                j++;
                if (j > 5) {
                    j = 0
                    k++;
                }
            }
        }
    }
}
