import * as THREE from "three";
import * as dat from 'dat.gui';



export default class SceneManagerClass {
    constructor(canvas) {
        this.canvas = canvas
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.camera = this.buildCamera(this.width,this.height);
        this.scene = this.buildScene();
        this.render = {}
        this.cube={}
        this.renderer = this.buildRender(this.width, this.height);
        this.step = 0
        this.sphere = {}
        this.datGui = new dat.GUI();
        this.planeGeometry={}
        this.controls  = {
            rotationSpeed: 0.02
        }
    }

    init(){
        this.createSceneSubjects()
        this.camera.lookAt(this.scene.position);
        this.datGui.add(this.controls,'rotationSpeed', 0,0.5)
        this.datGui.add({addCube: this.addCube.bind(this)},'addCube')
        this.datGui.add({removeCube: this.removeCube.bind(this)},'removeCube')


        //this.sphereFactory()
    }


    buildScene() {
        // Set the scene size.
        const scene = new THREE.Scene()
        scene.add(this.camera)
        //scene.add(new THREE.GridHelper(100, 10))
        const spotLight = new THREE.SpotLight( 0xffffff )
        //book code 
        spotLight.position.set( -40, 60, -10 );
        //spotLight.position.set( 0, 0, 10 )
        const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
        const planeMaterial = new THREE.MeshBasicMaterial({color:
                0xcccccc})
        this.planeGeometry = new THREE.Mesh(planeGeometry, planeMaterial)
        this.planeGeometry.rotation.x = -0.5 * Math.PI
        this.planeGeometry.position.x = 15
        this.planeGeometry.position.y = -3
        this.planeGeometry.position.z = 0
        scene.add(spotLight)
        scene.add(this.planeGeometry)
        scene.fog=new THREE.FogExp2( 0xffffff, 0.01 )

        return scene
    }


    buildRender(width, height) {
        const renderer = new THREE.WebGLRenderer({canvas : this.canvas})
        renderer.setSize(width, height);
        //renderer.setClearColorHex()
        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        return renderer
    }


    buildCamera(width, height) {
        // Set some camera attributes.
        const VIEW_ANGLE = 75
        const ASPECT = width / height
        const NEAR = 0.1
        const FAR = 1000

        const camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        )
        /*camera.position.z = 10
        camera.position.x = 5
        camera.position.y = 0*/
        //book code
        camera.position.x = -20;
        camera.position.y = 20;
        camera.position.z = 10;


        return camera

    }




    createSceneSubjects() {


        let geometry = new THREE.BoxGeometry(1, 1, 1)
        // single matererial geometry
        let material = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false})
        this.cube = new THREE.Mesh(geometry, material)

        // multimaterial geometry
        let multiMaterial =  [
            new THREE.MeshLambertMaterial( { opacity:0.6, color: 0x44ff44,
                transparent:true } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true
            }) ]
        let multiMaterialCube = THREE.SceneUtils.createMultiMaterialObject( geometry,
            multiMaterial)

        //positioning and adding elements to the scene
        /*multiMaterialCube.position.x = 5
        this.scene.add(multiMaterialCube)*/
        this.cube.position.x = 3
        this.scene.add(this.cube)



        // Set up the sphere vars
        const RADIUS = 1;
        const SEGMENTS = 16;
        const RINGS = 16;
        const sphereMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0x0000FF,
                    wireframe: false
                });


        this.sphere = new THREE.Mesh(new THREE.SphereGeometry(
            RADIUS,
            SEGMENTS,
            RINGS),
            sphereMaterial);

        this.sphere.position.x = 1
        this.sphere.position.z = -2
        this.scene.add(this.sphere)
    }

    addCube() {
            let cubeSize = Math.ceil((Math.random() * 1))
            let  cubeGeometry = new THREE.BoxGeometry
            (cubeSize,cubeSize,cubeSize)
            let cubeMaterial = new THREE.MeshLambertMaterial({color:
                Math.random() * 0xffffff })
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            cube.name = "cube-" + this.scene.children.length
            cube.position.x=-2 + Math.round(Math.random() * 10)
            cube.position.y= Math.round((Math.random() * 5))
            cube.position.z=-1 + Math.round((Math.random() * 8))
            this.scene.add(cube)
            this.numberOfObjects = this.scene.children.length
    }

    removeCube() {
        let allChildren = this.scene.children;
        let lastObject = allChildren[allChildren.length-1];
        if (lastObject instanceof THREE.Mesh) {
            this.scene.remove(lastObject)
            this.numberOfObjects = this.scene.children.length;
        }
    }

    rotateElements() {
        for(const cube of this.scene.children.slice(3)){
            cube.rotation.x += (Math.random() * 0.030) + 0.01
            cube.rotation.y += (Math.random() * 0.030) + 0.01
        }
    }


    update() {
        this.renderer.render(this.scene, this.camera)
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        this.rotateElements()
        //this.cube.visible = false

        this.step+=this.controls.rotationSpeed
        this.sphere.position.x = 5+(5* (Math.cos(this.step)))
        this.sphere.position.y = 1+(5 * (Math.sin(this.step)))

    }


    onWindowResize() {
        /*this.camera.aspect = window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth/window.innerHeight)*/
    }


}
