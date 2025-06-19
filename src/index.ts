import { Application, Assets } from 'pixi.js';
import SpriteV2 from './template/components/sprite-v2';
import { COLORS } from './enums';
import { GAMESETTINGS } from './game-settings';
import { Log } from './utils/Utils';
import Preloader from './view/preloader';
import MainGame from './view/main-game';
import MainControl from './view/main-control';
const cssstyle1 = require('../src/template/css/game.css');



(async () => {
    Log('🕹️ ' + GAMESETTINGS.gameName + ': v' + GAMESETTINGS.gameVersion);
    //initialize API

    const app: Application = new Application();



    await app.init({
        background: COLORS.WHITE,
        resolution: 2,
        antialias: false,
    });

    //add to canvas
    document.getElementById('game-canvas')?.appendChild(app.canvas);
    app.canvas.style.position = 'relative';


    const preloader: Preloader = new Preloader();
    await preloader.initPreloader();

    preloader.loadGameComplete = () => {
        // Create and add main container to the stage------
        const mainContainer: SpriteV2 = app.stage.addChild(new SpriteV2());
        mainContainer.scale.set(0.5);
        mainContainer.position.set(app.screen.width * 0.5, app.screen.height * 0.5)


        const mainGame: MainGame = new MainGame(app);
        mainContainer.addChild(mainGame);


        const mainControl: MainControl = new MainControl(mainGame, app);

    }



})();
