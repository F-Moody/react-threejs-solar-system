import SceneManager from './SceneManager';
import SceneManagerClass from "./SceneManagerClass";
import SolarSystem from "./SolarSystem";
export default containerElement => {
    const canvas = createCanvas(document, containerElement);
    /*scene manager code
    const sceneManager = new SceneManagerClass(canvas)
    sceneManager.init()
    */

    // solarSystem code
    const solarSystem = new SolarSystem(canvas)
    solarSystem.init()

    bindEventListeners();
    render();
    function createCanvas(document, containerElement) {
        const canvas = document.createElement("canvas");
        containerElement.appendChild(canvas);
        return canvas;
    }
    function bindEventListeners() {
        window.onresize = resizeCanvas;
        resizeCanvas();
    }
    function resizeCanvas() {
        canvas.style.width = "100%"
        canvas.style.height= "100%"
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        //sceneManager.onWindowResize();
    }
    function render(time) {
        requestAnimationFrame(render);
        //sceneManager.update();
        solarSystem.update()
    }
}