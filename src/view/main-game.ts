import { Application, Assets, Container, Graphics, Sprite } from 'pixi.js';
import { isPortrait, setFullscreen } from '../utils/Utils';
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


    constructor(app: Application) {
        super();

        this.app = app;
        this.drawGameElements
        this.drawCards();
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
        box.rect(-400, -300, 800, 600);
        box.fill(COLORS.BLACK, 0.5);
        box.alpha = 0.5;


        for (let i: number = 0; i < 18; i++) {

            this.boxes[i] = this.addChild(new Graphics());
            this.boxes[i].rect(-50, -50, 100, 100);
            this.boxes[i].fill(COLORS.BLACK, 1);
            this.boxes[i].alpha = 0.5;
            this.boxes[i].position.set(-800 + (i * 110), 0)


            this.cards[i] = this.addChild(new MemoryCard(Assets.get("card1")));
            this.cards[i].position.set(-800 + (i * 110), 0)

        }



    }


    adjustDisplay() {
        if (isPortrait()) {
            setFullscreen(true);

        } else {
            setFullscreen(true);

        }
    }
}
