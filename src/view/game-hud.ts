import { Assets, Container, Graphics, Text } from 'pixi.js';
import { COLORS } from '../enums';
import SpriteV2 from '../template/components/sprite-v2';

import TextboxIcon from '../template/components/textbox-icon';

import gsap from 'gsap';
import TextField from '../template/components/textfield';
import ButtonImage from '../template/components/button-image';


export default class GameHud extends SpriteV2 {
    public box: Graphics[] = [];

    public labels: TextField[] = [];
    public fields: Text[] = [];
    public betlabels: TextboxIcon[] = [];
    public betbtn: ButtonImage[] = [];



    public infoBg: Graphics = new Graphics();

    private topContainer: Container = new Container();
    private bottomContainer: Container = new Container();

    constructor() {
        super();

        this.addChild(this.topContainer);

        this.addChild(this.bottomContainer);

        //name
        /*this.labels[0] = this.topContainer.addChild(
            new TextField(
                "test",
                280,
                55,
                COLORS.WHITE,
                19,
                Assets.get('generic_ui').textures['icon_user0000']
            )
        );
        this.labels[0].position.set(-150, 7);*/

        //----------------

        //bg
        this.box[1] = this.bottomContainer.addChild(new Graphics());
        this.box[1].roundRect(-320, -30, 640, 100, 50);
        this.box[1].fill(COLORS.BLACK, 0.5);




    }


    updateDisplay(portrait: boolean) {
        if (portrait) {
            //
        } else {
            //
        }
    }


}
