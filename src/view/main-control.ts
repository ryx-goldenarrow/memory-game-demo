import {
    addButtonEvent,
    addKeyboardEvent,
    generateRandom,
    isPortrait,
} from '../utils/Utils';
import MainGame from './main-game';
import { COLORS, GameEvents } from '../enums';
import gsap from 'gsap';
import { sound } from '@pixi/sound';
import { buttonClickEffect } from '../utils/PixiUtils';
import { Application, EventEmitter, Graphics } from 'pixi.js';
import MemoryCard from '../template/memory-card';




export default class MainControl {
    private game: MainGame;
    private app: Application;
    private isGameReady: boolean = true;
    public event: EventEmitter = new EventEmitter();
    public currentCardCheckId: number = -1;
    public newCardCheckId: number = -1;
    public onHoldCards: MemoryCard[] = [];

    constructor(game: MainGame, app: Application) {
        this.game = game;
        this.app = app;
        //sound.play('bgm', { volume: 0.075, loop: true });
        this.addResizeEvents();
        this.initOrientationEventEmitter();
        this.game.startGame();
        this.addButtonEventsForAllCards();
    }



    initOrientationEventEmitter() {
        let ort: string = isPortrait() ? 'portrait' : 'landscape';
        let query = matchMedia('screen and (orientation:' + ort + ')');

        query.onchange = (e) => {
            this.event.emit(GameEvents.ORIENTATION_CHANGE, e);

            if (query.matches) {
                console.log('## Portrait mode');
                this.event.emit(GameEvents.ON_PORTRAIT);
            } else {
                console.log('## Landscape mode');
                this.event.emit(GameEvents.ON_LANDSCAPE);
            }
        };
    }


    //add resize events----------------------------------------
    addResizeEvents() {
        //resize events
        addEventListener(GameEvents.ORIENTATION_CHANGE, (event) => {
            this.game.adjustDisplay();
        });

        addEventListener(GameEvents.ON_RESIZE, (event) => {
            this.game.adjustDisplay();
        });
    }

    addButtonEventsForAllCards() {
        let totalButtons: number = this.game.TOTAL_CARDS;

        for (let i: number = 0; i < totalButtons; i++) {
            let id: number = i;
            addButtonEvent(this.game.cards[i], () => {
                //reveal
                this.game.cards[id].animateReveal(true);

                if (this.currentCardCheckId == -1) {
                    this.currentCardCheckId = this.game.cards[id].cardId;
                    this.onHoldCards[0] = this.game.cards[id]
                } else if (this.currentCardCheckId != -1) {

                    this.onHoldCards[1] = this.game.cards[id]

                    if (this.currentCardCheckId == this.game.cards[id].cardId) {
                        console.log("paired");

                        gsap.delayedCall(0.5, () => {
                            this.onHoldCards[0].animateCorrect();
                            this.onHoldCards[1].animateCorrect();
                            this.onHoldCards = [];
                            this.currentCardCheckId = -1;
                        });


                    } else {
                        console.log("not paired");

                        gsap.delayedCall(0.5, () => {
                            this.onHoldCards[0].animateShake();
                            this.onHoldCards[1].animateShake();
                        })

                        gsap.delayedCall(2, () => {
                            this.onHoldCards[0].animateReveal(false);
                            this.onHoldCards[1].animateReveal(false);
                            this.onHoldCards = [];
                            this.currentCardCheckId = -1;
                        })
                    }

                }

            })
        }
    }
}
