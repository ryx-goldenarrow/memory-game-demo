import { Text, TextOptions } from 'pixi.js';


export default class TextV2 extends Text {
    public tempVal: string = '';

    constructor(textOptions: TextOptions) {
        super(textOptions);
        this.anchor.set(0.5);
        this.pivot.set(0.5);

        this.interactive = false;

        /*gameEmitter.on('updateText', (e: boolean) => {
            this.text = this.tempVal + ' ';
            setTimeout(() => {
                this.updateText(this.tempVal);
            }, 1);
        });*/
    }

    updateText(str: string) {
        this.tempVal = str;
        this.text = str;
    }

    setFontSize(size: number = 20) {
        this.style.fontSize = size;
    }

    setColor(color: number = 0x0) {
        this.style.fill = color;
    }
}
