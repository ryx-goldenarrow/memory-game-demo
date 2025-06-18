//Utils v0.0.1

import { FillGradient, Graphics, Sprite } from 'pixi.js';
import { COLORS } from '../enums';

/**
 *setFullscreen - se window to fullscreen.
 * @id - id to set on/off fullscreen
 */

export function setFullscreen(id: boolean): void {
    const docElmWithBrowsersFullScreenFunctions =
        document.documentElement as HTMLElement & {
            webkitRequestFullscreen(): Promise<void>;
        };

    const docWithBrowsersExitFunctions = document as Document & {
        webkitExitFullscreen(): Promise<void>;
    };

    if (id == true) {
        try {
            docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
        } catch (err) {}
    } else {
        try {
            docWithBrowsersExitFunctions.webkitExitFullscreen();
        } catch (err) {}
    }
}

/**
 *generateRandom - generate a random number.
 * @NumberRange - range number input.
 * @startAt - inital start of number  (zero is the default value)
 *
 * ex: generateRandom(100,80) the output is between 80-100 only.
 * ex: generateRandom(100) the output is between 0-100.
 */
export function generateRandom(
    NumberRange: number,
    startAt: number = 0
): number {
    let random: number = Math.floor(Math.random() * (startAt + NumberRange));
    return random;
}

/**
 *shuffleArray - Shuffle number array and return new array.
 * @arr - Array input.
 */
export function shuffleArray(arr: number[]): number[] {
    let i: number = 0;
    let temp: number = 0;
    for (i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

/**
 * degToRad - convert degrees to radian.
 * @angle - number
 */
export function degToRad(angle: number): number {
    return angle * (Math.PI / 180);
}

/**
 * radToDeg - convert radian to degrees.
 * @radians - number
 */
export function radToDeg(radians: number) {
    return radians * (180 / Math.PI);
}

/**
 * isLandscape - return boolean.
 */
export function isLandscape(): boolean {
    return screen.width > screen.height;
}

/**
 * isPortrait - return boolean.
 */
export function isPortrait(): boolean {
    return screen.width < screen.height;
}

/**
 * nFormatter - format number and add letters K,M,G then return string.
 * (ex: 12K, 1.5M)
 * @num - number input.
 * @fixed - number of decimal places
 */
export function nFormatter(num: number, fixed: number = 2) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(fixed).replace(/\.0$/, '') + 'G';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(fixed).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(fixed).replace(/\.0$/, '') + 'K';
    } else if (num <= 100 && num != 0) {
        return (Math.round(num * 100) / 100).toFixed(fixed);
    }
    return num;
}

/**
 * numberComma - add comma to a number and return string result.
 * (ex: 1,000,000.00)
 * @num - number input.
 * @fixed - number of decimal places
 */
export function numberComma(num: number, fixed: number = 0): string {
    if (num == 0) {
        return '0';
    } else if (num >= 100000) {
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return num.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

/**
 * addKeyboardEvent - add function for keyboard events.
 * @keycode - keycode number input.
 * @fnc - function to call
 */
export function addKeyboardEvent(keycode: number, fnc: Function) {
    document.addEventListener('keydown', (key) => {
        if (key.keyCode == keycode) {
            fnc();
        }
    });
}

/**
 * addButtonEvent - add button event to a sprite or graphics object.
 * @btn - accepts graphics or sprite object.
 * @btnUpFnc - function to call on button up event.
 */
export function addButtonEvent(
    btn: Sprite | Graphics,
    btnUpFnc: Function,
    btnHover?: Function,
    btnHoverOut?: Function
): void {
    btn.interactive = true;
    btn.eventMode = 'static';

    btn.on('pointerup', (e) => {
        btnUpFnc(e);
    });

    btn.on('pointerover', (e) => {
        btnHover ? btnHover(e) : 0;
    });

    btn.on('pointerout', (e) => {
        btnHoverOut ? btnHoverOut(e) : 0;
    });
}

/**
 * NumberZero - convert number to 4 character string, (ex: 0001","0002","0003"...)
 * @num - number input.
 * @pad - number of zero string to be added in front.
 */
export function NumberZero(num: number, pad: number = 4): string {
    return String(num).padStart(pad, '0');
}

/**
 * Log - format log with color
 * @message - display string message.
 * @color -change text color
 * @bg - change background color
 */
export function Log(
    message: string,
    color: number = COLORS.WHITE,
    bg: number = COLORS.DARKERGRAY
): void {
    console.log('%c ' + message + ' ', 'background:' + bg + '; color:' + color);
}

export function GradientColor(
    color: number,
    height: number = 50
): FillGradient {
    const colorStops: number[] = [color, DimColor(color)];
    const gradientFill: FillGradient = new FillGradient(0, 0, 0, height * 2);
    colorStops.forEach((number, index) => {
        const ratio = index / colorStops.length;
        gradientFill.addColorStop(ratio, number);
    });

    return gradientFill;
}

/**
 * DimColor - retrun a darker color
 * @color - 0x00000 color format
 */
export function DimColor(color: number): number {
    return (color & 0xfefefe) >> 1;
}

/**
 * DimColor - retrun a darker color
 * @color - 0x00000 color format
 */
export function CheckStringOrNull(str: string | null): string {
    if (str == null) {
        str = '';
    }

    return str;
}
