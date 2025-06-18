import {
    addButtonEvent,
    addKeyboardEvent,
    generateRandom,
} from '../utils/Utils';
import MainGame from '../view/main-game';
import { COLORS, Event } from '../enums';
import gsap from 'gsap';
import { sound } from '@pixi/sound';
import { buttonClickEffect } from '../utils/PixiUtils';
import { Application, Graphics } from 'pixi.js';



export default class MainControl {
    private game: MainGame;
    private app: Application;
    private isGameReady: boolean = true;

    constructor(game: MainGame, app: Application) {
        this.game = game;
        this.app = app;
        //sound.play('bgm', { volume: 0.075, loop: true });
        this.addResizeEvents();
    }




    //add resize events----------------------------------------
    addResizeEvents() {
        //resize events
        addEventListener(Event.ORIENTATION_CHANGE, (event) => {
            this.game.adjustDisplay();
        });

        addEventListener(Event.ON_RESIZE, (event) => {
            this.game.adjustDisplay();
        });
    }
}
