
import { GameEvents } from '../enums';
import { EventEmitter } from 'pixi.js';

import { isPortrait } from '../utils/Utils';
import { ResizeGameType } from '../types';
import SpriteV2 from '../template/components/sprite-v2';

export default class Resize {
    private resizeGameObject: ResizeGameType;
    private portraitScale: number;
    private landscapeScale: number;
    public event: EventEmitter = new EventEmitter();

    constructor(
        resizeGameObject: ResizeGameType,
        portraitScale: number = 1,
        landscapeScale: number = 0.9
    ) {
        this.resizeGameObject = resizeGameObject;
        this.portraitScale = portraitScale;
        this.landscapeScale = landscapeScale;
        this.initOrientationEventEmitter();
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

    resize(obj: SpriteV2) {
        //resize settings---------------------------------
        document.body.onresize = (e) => {
            setTimeout(() => {
                this.resizeGame(obj);
            }, 50);
        };

        addEventListener(GameEvents.ORIENTATION_CHANGE, (event) => {
            setTimeout(() => {
                this.resizeGame(obj);
            }, 50);
        });

        setTimeout(() => {
            this.resizeGame(obj);
        }, 50);
    }

    resizeGame(obj: SpriteV2) {
        let { app, mainContainer } = this.resizeGameObject;

        //setFullscreen(true);
        //resize main container
        mainContainer.position.set(
            app.renderer.width * 0.5,
            app.renderer.height * 0.5
        );

        if (isPortrait()) {
            console.log("resizeGame: Portrait",)
            obj.width = (app.canvas.width / 750) * this.portraitScale;
            obj.height = (app.canvas.height / 1334) * this.portraitScale;
        } else {
            console.log("resizeGame: Landscape")
            obj.width = (app.canvas.width / 1334) * this.landscapeScale;
            obj.height = (app.canvas.height / 750) * this.landscapeScale;
        }
    }
}
