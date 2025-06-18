import { Spine } from '@esotericsoftware/spine-pixi-v8';
import SpriteV2 from './sprite-v2';

export default class SpineObject extends SpriteV2 {
    public spine: Spine;

    constructor(spineName: string) {
        super();

        this.spine = Spine.from({
            skeleton: spineName + '_skel',
            atlas: spineName + '_atlas',
        });

        this.addChild(this.spine);
    }

    animate(trackIndex: number, animationID: string, loop: boolean = false) {
        this.spine.skeleton.setToSetupPose();
        this.spine.state.setAnimation(trackIndex, animationID, loop);
    }

    stop() {
        this.spine.state.clearTracks();
    }

    setTimeScale(scale: number) {
        this.spine.state.timeScale = scale;
    }

    changeAsset(spineName: string) {
        this.spine.destroy();
        this.spine = Spine.from({
            skeleton: spineName + '_skel',
            atlas: spineName + '_atlas',
        });
        this.addChild(this.spine);
    }
}
