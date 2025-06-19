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



export default class MainControl {
    private game: MainGame;
    private app: Application;
    private isGameReady: boolean = true;
    public event: EventEmitter = new EventEmitter();

    constructor(game: MainGame, app: Application) {
        this.game = game;
        this.app = app;
        //sound.play('bgm', { volume: 0.075, loop: true });
        this.addResizeEvents();
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
}
