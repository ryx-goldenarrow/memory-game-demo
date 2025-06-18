import {
    DropShadowFilter,
    AdvancedBloomFilter,
    BulgePinchFilter,
    CRTFilter,
    GlowFilter,
    BloomFilter,
} from 'pixi-filters';
import SpriteV2 from '../template/components/sprite-v2';
import gsap from 'gsap';
import { GAMESETTINGS } from '../game-settings';
import { COLORS } from '../enums';

export const PixiFilters: PixiFiltersCollection = {
    dropShadow: new DropShadowFilter({
        blur: 5,
        alpha: 1,
    }),

    advancedBloomFilter: new AdvancedBloomFilter({
        blur: 8,
        threshold: 0.8,
        quality: 4,
        brightness: 1,
        bloomScale: 1,
    }),

    bulgePinchFilter: new BulgePinchFilter({
        radius: 4505,
        strength: 1,
    }),

    bloomFilter: new BloomFilter({}),

    crtFilter: new CRTFilter({}),

    glowFilter: new GlowFilter({
        distance: 5,
        alpha: 1,
    }),

    yellowGlow: new GlowFilter({
        distance: 5,
        alpha: 1,
        color: COLORS.YELLOW,
        outerStrength: 10,
        quality: 0.1,
    }),
};

type PixiFiltersCollection = {
    dropShadow: DropShadowFilter;
    advancedBloomFilter: AdvancedBloomFilter;
    bulgePinchFilter: BulgePinchFilter;
    bloomFilter: BloomFilter;
    crtFilter: CRTFilter;
    glowFilter: GlowFilter;
    yellowGlow: GlowFilter;
};

type PixiFilterAnimation = {
    animateGlow: Function;
};

export const FilterAnimation: PixiFilterAnimation = {
    animateGlow: (
        _sprite: SpriteV2,
        _duration: number = 0.5,
        _repeat: number = 1
    ) => {
        gsap.to(PixiFilters.yellowGlow, {
            startAt: {
                distance: 0,
                alpha: 0,
            },
            distance: 25,
            alpha: 1,
            duration: _duration,
            yoyo: true,
            repeat: _repeat,
            ease: 'none',

            onUpdate: () => {
                _sprite.filters = [PixiFilters.yellowGlow];
            },
            onComplete: () => {
                _sprite.filters = [];
            },
        });
    },
};
