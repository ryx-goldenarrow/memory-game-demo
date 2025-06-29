import { Assets, Container, Graphics, Text, Texture } from 'pixi.js';
import { GAMESETTINGS } from '../game-settings';
import { COLORS, GameEvents } from '../enums';
import SpriteV2 from '../template/components/sprite-v2';
import gsap from 'gsap';

export default class Preloader extends SpriteV2 {
    private logoContainer: SpriteV2 = new SpriteV2();
    private preloaderContainer: Container = new Container();
    private bg: Graphics = new Graphics();
    private bg_progress_bar: Graphics = new Graphics();
    private progress_bar: Graphics = new Graphics();
    private progress_text: Text = new Text(GAMESETTINGS.textStyleNumber);
    private basePath: string = '/';
    public filesToLoad: any;
    private glow: SpriteV2 = new SpriteV2();

    constructor() {
        super();

        this.basePath = `/media/`;

        this.drawProgressBars();
        this.interactive = true;
    }

    async initPreloader() {
        (async () => {


            Assets.addBundle("images", {
                //load spritesheet
                bg: "/media/images/game/bg.png", // prettier-ignore
                card1: "/media/images/game/sample_card.png", // prettier-ignore
                cards: "/media/images/game/cards.json", // prettier-ignore
                card_back: "/media/images/game/card-back.png", // prettier-ignore

                //btn: "/game/media/images/color-game/btn.json", // prettier-ignore
                //animation
                //launcher: "/game/media/images/color-game/launcher2.json", // prettier-ignore
                //backrou: "/game/media/sounds/m4a/bgm-casino2.m4a", // prettier-ignore
            });


            await Assets.loadBundle('images', (e) => {
                // console.log("complete 123", e)

            }).then(() => {
                console.log("#Loading complete")
                this.loadGameComplete();
            })

        })();
    }

    loadGameComplete() {

    }



    drawProgressBars() {
        //add preloader container
        this.addChild(this.preloaderContainer);
        this.preloaderContainer.y = 100;

        const progressWidth: number = 400;
        this.progress_text.text = '0%';

        //add preloader bg
        this.preloaderContainer.addChild(this.bg);

        //container
        this.logoContainer.addChild(this.bg_progress_bar);
        this.bg_progress_bar.roundRect(0, 0, progressWidth, 20, 100);
        this.bg_progress_bar.fill(COLORS.DARKGRAY);
        this.bg_progress_bar.position.set(-progressWidth * 0.5, 90);
        //bar
        this.bg_progress_bar.addChild(this.progress_bar);
        this.progress_bar.roundRect(0, 0, progressWidth, 20, 100);
        this.progress_bar.fill(COLORS.YELLOW);

        this.progress_bar.roundRect(0, 0, progressWidth, 7, 100);
        this.progress_bar.fill(COLORS.WHITE);
        this.progress_bar.scale.x = 0;
        //text
        this.progress_text.y = 25;
        this.progress_text.style.align = 'center';
        this.progress_text.x = progressWidth * 0.5 - 10;
        this.bg_progress_bar.addChild(this.progress_text);
        //logo container
        this.addChild(this.logoContainer);
        this.logoContainer.scale.set(0.6);
    }

    showProgress(progress: number = 0) {
        this.progress_bar.scale.x = progress;
        this.progress_text.text = Math.round(progress * 100) + '%';
        if (progress >= 1) {
            //emit custom event
            this.emit(GameEvents.PRELOADER_COMPLETE);
            gsap.killTweensOf(this.glow);
            this.visible = false;
        }
    }
}
