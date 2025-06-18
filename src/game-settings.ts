import { TextOptions } from 'pixi.js';
import { COLORS } from './enums';
import { generateRandom } from './utils/Utils';

export const GAMESETTINGS: GameSettings = {
    //
    gameName: 'Plinko',
    gameVersion: '0.0.15',
    theme: 'theme-1',
    langCode: 'en',

    textStyleNumber: {
        text: '',
        style: {
            fontFamily: 'KatahdinRound',
            fontSize: 25,
            align: 'left',
            fill: COLORS.WHITE,
        },
    },

    textStyleLabel: {
        text: '',
        style: {
            fontFamily: 'centurygothic_bold',
            fontSize: 25,
            align: 'left',
            fill: COLORS.WHITE,
        },
    },

    textstyle1: {
        text: '',
        style: {
            fontFamily: 'centurygothic_bold',
            fontSize: 30,
            align: 'left',
            fill: COLORS.WHITE,
        },
    },

    textstyle2: {
        text: '',
        style: {
            fontFamily: 'roboto-c',
            fontSize: 25,
            align: 'left',
            fill: COLORS.WHITE,
        },
    },

    textstyle3: {
        text: '',
        style: {
            fontFamily: 'centurygothic_bold',
            fontSize: 30,
            fill: COLORS.WHITE,
            align: 'left',
            stroke: { color: COLORS.GRAY, width: 5, join: 'round' },
            dropShadow: {
                alpha: 0.35,
                angle: 2.1,
                blur: 10,
                color: COLORS.BLACK,
                distance: 5,
            },
        },
    },

    textStyleTitle: {
        text: '',
        style: {
            fontFamily: 'centurygothic_bold',
            fontSize: 30,
            fill: COLORS.WHITE,
            align: 'left',
            stroke: { color: COLORS.DARKGRAY, width: 5, join: 'round' },
            dropShadow: {
                alpha: 0.35,
                angle: 2.1,
                blur: 10,
                color: COLORS.BLACK,
                distance: 5,
            },
        },
    },

    textEvilEmpire: {
        text: '',
        style: {
            fontFamily: 'EvilEmpire',
            fontSize: 25,
            align: 'left',
            fill: COLORS.WHITE,
            stroke: { color: COLORS.GRAY, width: 5, join: 'round' },
            dropShadow: {
                alpha: 0.35,
                angle: 2.1,
                blur: 10,
                color: COLORS.BLACK,
                distance: 5,
            },
        },
    },

    textBombSound: {
        text: '',
        style: {
            fontFamily: 'TheBombSound',
            fontSize: 25,
            align: 'left',
            fill: COLORS.WHITE,
            stroke: { color: COLORS.GRAY, width: 5, join: 'round' },
            dropShadow: {
                alpha: 0.35,
                angle: 2.1,
                blur: 10,
                color: COLORS.BLACK,
                distance: 5,
            },
        },
    },

    textStyleWordWrap: {
        text: '',
        style: {
            fontFamily: 'centurygothic_bold',
            fontSize: 30,
            wordWrap: true,
            wordWrapWidth: 320,
            fill: COLORS.WHITE,
            align: 'left',
            dropShadow: {
                alpha: 0.35,
                angle: 2.1,
                blur: 10,
                color: COLORS.BLACK,
                distance: 5,
            },
        },
    },

    sound_enabled: false,

    themeColors: [
        COLORS.LIGHTBLUE,
        COLORS.RED,
        COLORS.YELLOW,
        COLORS.YELLOWGREEN,
        COLORS.BLUEGREEN,
        COLORS.ORANGE,
        COLORS.BLUE,
        COLORS.PINK,
        COLORS.PURPLE,
        COLORS.VIOLET,
    ],

    potColors: [
        COLORS.RED,
        COLORS.ORANGE,
        COLORS.YELLOW,
        COLORS.YELLOWGREEN,
        COLORS.LIGHTGREEN,
        COLORS.GREEN,
        COLORS.BLUEGREEN,
        COLORS.BLUE,
        COLORS.LIGHTBLUE,
        COLORS.PURPLE,
        COLORS.VIOLET,
        COLORS.PINK,
        COLORS.LIGHTVIOLET,
    ],

    winningColors: [
        COLORS.RED,
        COLORS.ORANGE,
        COLORS.YELLOW,
        COLORS.YELLOWGREEN,
        COLORS.LIGHTGREEN,
        COLORS.GREEN,
        COLORS.BLUEGREEN,
        COLORS.BLUE,
        COLORS.LIGHTBLUE,
        COLORS.PURPLE,
        COLORS.VIOLET,
        COLORS.PINK,
        COLORS.LIGHTVIOLET,
    ],

    themeColorId: COLORS.YELLOW,

    updateTheme(id: number = 0) {
        id = generateRandom(6) + 1;
        this.theme = 'theme-' + id;
        //update theme colors
        //this.themeColorId = this.themeColors[id] + 1;
    },
};

//-----------------------------------------
export type GameSettings = {
    gameName: string;
    gameVersion: string;
    langCode: string | undefined;
    theme: string;
    sound_enabled: boolean;
    updateTheme: Function;
    themeColors: number[];
    themeColorId: number;
    winningColors: number[];
    textstyle1: TextOptions;
    textstyle2: TextOptions;
    textstyle3: TextOptions;
    textEvilEmpire: TextOptions;
    textBombSound: TextOptions;
    textStyleWordWrap: TextOptions;
    textStyleTitle: TextOptions;
    textStyleNumber: TextOptions;
    textStyleLabel: TextOptions;
    potColors: number[];
};
