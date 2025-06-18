//Pixi Utils v0.0.1
import { Graphics, Ticker, Sprite, Assets, Texture, Point } from 'pixi.js';
import { gsap } from 'gsap';

type Dimension = {
    x: number;
    y: number;
    w: number;
    h: number;
};

type Size = {
    width: number;
    height: number;
};

//--------------------------------------------------
export type Frame = {
    filename: string;
    frame: Dimension;
    pivot: Point;
    sourceSize: Size;
    spriteSourceSize: Dimension;
    trimmed: boolean;
};
//change graphics color
export function changeGraphicsColor(
    gfx: Graphics,
    color: string,
    duration: number = 1
) {
    gsap.to(gfx, { duration: duration, pixi: { lineColor: color } });
}

export function addTickerEvent(action: Function): Ticker {
    const ticker: Ticker = Ticker.shared.add((deltaTime: Ticker) => {
        action(ticker);
    });
    ticker.stop();
    return ticker;
}

/**
 * buttonClickEffect - button pressed effect
 * @param btn - sprite or graphics
 */
export function buttonClickEffect(btn: Sprite | Graphics) {
    const _scaleX: number = btn.scale.x;
    const _scaleY: number = btn.scale.y;
    gsap.to(btn.scale, {
        duration: 0.05,
        repeat: 1,
        yoyo: true,
        x: _scaleX - 0.05,
        y: _scaleY - 0.05,
    });
}
/**
 * TP - extract textures from Texture Packer Spritesheet
 * @param base - base json file
 * @param texture - specific texture
 */
export function TexturePacker(base: string, texture: string): Texture {
    const arr: Frame[] = Assets.get(base)._frames;
    let i: number = 0;
    let id: number = 0;

    for (i = 0; i < arr.length; i++) {
        if (arr[i].filename == texture) {
            id = i;
            Assets.get(base).textures[id];
            return Assets.get(base).textures[id];
        }
    }
    return Assets.get(base).textures[id];
}

/**
 * AnimateNumber - animation for winning numbers
 * @param startValue - initial start value of number
 * @param endValue - final value of the number
 * @param duration - duration in milliseconds
 * @param updateText - function that updates during the whole duration
 * @param onComplete - callback after the animation complete
 *
 * example
 AnimateNumber(0,100,1 ,

 (updateValue:number)=>{
    //play sound here
    yourtextfieldhere.updateText(updateValue)
 }),
 
 (endValue:number)=>{
    yourtextfieldhere.updateText(endValue)
 })
 * */
export function AnimateNumber(
    startValue: number,
    endValue: number,
    duration: number = 1,
    updateText: Function,
    onComplete?: Function
) {
    let numberObject = {
        value: 0,
    };

    let counter: number = 0;

    gsap.to(numberObject, {
        value: endValue,
        startAt: { value: startValue },
        onUpdate: () => {
            counter += 1;

            if (counter >= 2) {
                updateText(numberObject.value);
                counter = 0;
            }
        },
        onComplete: () => {
            updateText(endValue);
            if (onComplete != undefined) {
                onComplete(endValue);
            }
        },
        duration: duration,
        ease: 'none',
    });
}

export function AnimatePulse(
    obj: any,
    repeat: number = 5,
    speed: number = 0.25,
    size: number = 1.1
) {
    let startX: number = obj.scale.x,
        startY: number = obj.scale.y;

    gsap.to(obj.scale, {
        startAt: { x: startX, y: startX },
        x: startX * size,
        y: startY * size,
        repeat: repeat,
        yoyo: true,
        duration: speed,
        ease: 'none',
    });
}

export function Shake(obj: any[], repeat: number = 1, reset: boolean = true) {
    let i: number = 0;

    let pos: number[][] = [];

    if (reset == false) {
        console.log('objetc', obj);

        for (i = 0; i < obj.length; i++) {
            let num: number = i;
            let animateObject = obj[num];

            pos[num] = [0, 0];

            pos[num][0] = obj[0].x;
            pos[num][1] = obj[0].y;

            gsap.to(animateObject, {
                startAt: { x: pos[num][0] + 1, y: pos[num][0] + 0.5 },
                x: pos[num][0] - 1,
                y: pos[num][0] - 0.5,
                repeat: repeat,
                duration: 0.1,
                yoyo: true,
                onComplete: () => {
                    animateObject.position.set(pos[num][0], pos[num][1]);
                },
                ease: 'none',
            });
        }
    } else {
        for (i = 0; i < obj.length; i++) {
            gsap.killTweensOf(obj[i]);
            obj[i].position.set(pos[i][0], pos[i][1]);
        }
    }
}
