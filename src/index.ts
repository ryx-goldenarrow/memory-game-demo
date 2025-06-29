import { Application, Assets } from 'pixi.js';
import SpriteV2 from './template/components/sprite-v2';
import { COLORS } from './enums';
import { GAMESETTINGS } from './game-settings';
import { Log } from './utils/Utils';
import Preloader from './view/preloader';
import MainGame from './view/main-game';
import MainControl from './view/main-control';
import Resize from './view/resize';
const cssstyle1 = require('../src/template/css/game2.css');


(async () => {
    Log('🕹️ ' + GAMESETTINGS.gameName + ': v' + GAMESETTINGS.gameVersion);
    //initialize API

    const app: Application = new Application();




    await app.init({
        resolution: 2,
        antialias: false,
        backgroundAlpha: 0,
    });
    app.canvas.style.position = "relative";
    let gamecanvas = document.getElementById("game-canvas");
    gamecanvas?.appendChild(app.canvas);

    const mainContainer: SpriteV2 = app.stage.addChild(new SpriteV2());
    mainContainer.scale.set(0.5);


    const resize: Resize = new Resize({ app: app, mainContainer: mainContainer }, 1.1, 1.1);



    const preloader: Preloader = new Preloader();
    await preloader.initPreloader();

    preloader.loadGameComplete = () => {
        // Create and add main container to the stage------

        const mainGame: MainGame = new MainGame(app, resize);
        mainContainer.addChild(mainGame);
        resize.resize(mainGame)

        console.log("added game")

        const mainControl: MainControl = new MainControl(mainGame, app);

    }



})();
