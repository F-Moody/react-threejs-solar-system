import * as THREE from 'three';

export default canvas => {
    /*constructor() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.camera = buildCamera({width, height});
        this.scene = buildScene({width, height});
        this.renderer = buildRender({width, height});
    }*/
    const width = window.innerWidth
    const height = window.innerHeight
    const camera = buildCamera({width, height});
    const scene = buildScene({width, height});
    camera.lookAt(scene.position)
    const renderer = buildRender({width, height});
    let cube

    const sceneSubjects = createSceneSubjects(scene);
    //scene.add(buildCamera({width, height}))
    //renderer.render(scene,camera)


    function buildScene({width, height}) {
        // Set the scene size.
        const scene = new THREE.Scene();
        scene.add(camera)
        scene.add(new THREE.GridHelper(100, 10))
        createSceneSubjects(scene)
        sphereFactory(scene)


        return scene
    }

    function buildRender({width, height}) {
        const renderer = new THREE.WebGLRenderer({canvas})
        renderer.setSize(width, height);
        return renderer
    }

    function buildCamera({width, height}) {
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
        camera.position.z = 4
        camera.position.y = 0

        return camera

    }


    function createSceneSubjects(scene) {
        let geometry = new THREE.BoxGeometry(1, 1, 1)
        let material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true})
        cube = new THREE.Mesh(geometry, material)
        cube.position.x = 3
        scene.add(cube)
    }

    function addElementsToCanvas(elem,scene) {
        scene.add(elem)
        console.log(elem)
    }

    function update() {
        renderer.render(scene, camera)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
    }

    function onWindowResize() {
    }

    function sphereFactory(scene) {
        // Set up the sphere vars
        const RADIUS = 50;
        const SEGMENTS = 16;
        const RINGS = 16;
        const sphereMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0xFFFFFF,
                    wireframe:true
                });

        // Create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
            const sphere = new THREE.Mesh(new THREE.SphereGeometry(
                    RADIUS,
                    SEGMENTS,
                    RINGS),
                sphereMaterial);

        // Move the Sphere back in Z so we
        // can see it.
            //sphere.position.z = -300;

        // Finally, add the sphere to the scene.
        addElementsToCanvas(sphere,scene);
    }



    return {
        update,
        onWindowResize
    }
}