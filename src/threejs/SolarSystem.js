//import * as THREE from "three";
import THREE from './three'
import Planet from './Planet'

//const orbitControl = require('three/examples/js/controls/OrbitControls.js')

const baseEarthValues = {
    diameter: 1,
    distanceFromSun: 20,
    orbitalVelocity: 0.005,
    orbitalObliquity: 1.57
}


export default class SolarSystem {
    constructor(canvas) {
        this.canvas = canvas
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.camera = this.buildCamera(this.width, this.height);
        this.scene = this.buildScene();
        this.render = {}
        this.renderer = this.buildRender(this.width, this.height);
    }


    init() {
        this.camera.lookAt(this.scene.position);
    }

    buildScene() {
        // Set the scene size.
        const scene = new THREE.Scene()
        scene.add(this.camera)

        //building sun
        const sunGeometry = new THREE.SphereGeometry(1, 16, 16)
        const sunMaterial = new THREE.MeshBasicMaterial({
            color:
                0xFFFF00
        })
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial)
        this.sun.position.set(0, 0, 0)

        //building pivot point inside sun
        this.pivotPoint = new THREE.Object3D()
        this.sun.add(this.pivotPoint);
        this._pivotPointFactory(scene)

        // building lights
        /*const spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(-40, 60, -10);*/

        //building axisHelper

        const axesHelper = new THREE.AxesHelper( 30 );
        scene.add( axesHelper )


        const pointColor = "#ffff44"
        const pointLight = new THREE.PointLight(pointColor)
        pointLight.position.set(10,10,10)
        scene.add(pointLight)


        //adding elements to scene
        //scene.add(spotLight)
        scene.add(this.sun)
        console.log(scene)

        return scene
    }


    buildRender(width, height) {
        const renderer = new THREE.WebGLRenderer({canvas: this.canvas})
        renderer.setSize(width, height);
        //renderer.setClearColorHex()
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.antialias = true
        return renderer
    }


    buildCamera(width, height) {
        // Set some camera attributes.
        const VIEW_ANGLE = 75
        const ASPECT = width / height
        const NEAR = 0.1
        const FAR = 10000

        const camera = new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR
        )

        camera.position.x = -20;
        camera.position.y = 20;
        camera.position.z = 10;
        this.controls = new THREE.OrbitControls(camera, this.canvas)
        return camera

    }

    _pivotPointFactory(scene) {
        this.pivotPoints = [
            {
                name: 'mercury',
                orbitalVelocity: 1.59 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(0.383 * baseEarthValues.diameter, 0.387 * baseEarthValues.distanceFromSun, 1.59 * baseEarthValues.orbitalVelocity, 0.001 * baseEarthValues.orbitalObliquity),
                diameter:0.383 * baseEarthValues.diameter,
                distanceFromSun:0.387 * baseEarthValues.distanceFromSun,
                orbitalObliquity: 6.34,//0.001 * baseEarthValues.orbitalObliquity,
                semiMajorAxis: 57909050,
                semiMinorAxis:56671523,
                color: 0Xb1adad


            },
            {
                name: 'venus',
                orbitalVelocity: 1.18 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(0.949 * baseEarthValues.diameter, 0.723 * baseEarthValues.distanceFromSun, 1.18 * baseEarthValues.orbitalVelocity, 0.113 * baseEarthValues.orbitalObliquity),
                diameter:0.949 * baseEarthValues.diameter,
                distanceFromSun:0.723 * baseEarthValues.distanceFromSun,
                orbitalObliquity: 2.19,//0.113 * baseEarthValues.orbitalObliquity,
                semiMajorAxis: 108208000,
                semiMinorAxis:108205518.76298,
                color: 0Xe8c1e4


            },
            {
                name: 'mars',
                orbitalVelocity: 0.808 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(0.532 * baseEarthValues.diameter, 1.52 * baseEarthValues.distanceFromSun, 0.808 * baseEarthValues.orbitalVelocity, 1.07 * baseEarthValues.orbitalObliquity),
                diameter:0.532 * baseEarthValues.diameter,
                distanceFromSun: 1.52 * baseEarthValues.distanceFromSun,
                orbitalObliquity: 1.67,//1.07 * baseEarthValues.orbitalObliquity,
                semiMajorAxis: 227939200,
                semiMinorAxis:226942801.5609,
                color: 0Xc1440e


            },
            {
                name: 'jupiter',
                orbitalVelocity: 0.439 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(11.21 * baseEarthValues.diameter, 5.20 * baseEarthValues.distanceFromSun, 0.439 * baseEarthValues.orbitalVelocity, 0.134 * baseEarthValues.orbitalObliquity),
                diameter: 11.21 * baseEarthValues.diameter,
                distanceFromSun: 5.20 * baseEarthValues.distanceFromSun,
                orbitalObliquity: 0.32,//0.134 * baseEarthValues.orbitalObliquity,
                color: 0X946956

            },
            {
                name: 'saturn',
                orbitalVelocity: 0.325 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(9.45 * baseEarthValues.diameter, 9.58 * baseEarthValues.distanceFromSun, 0.325 * baseEarthValues.orbitalVelocity, 1.14 * baseEarthValues.orbitalObliquity),
                diameter: 9.45 * baseEarthValues.diameter,
                distanceFromSun: 9.58 * baseEarthValues.distanceFromSun,
                orbitalObliquity: 0.93,//1.14 * baseEarthValues.orbitalObliquity,
                color: 0Xfceead


            },
            {
                name: 'uranus',
                orbitalVelocity: 0.228 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(4.01 * baseEarthValues.diameter, 4.01 * baseEarthValues.distanceFromSun, 0.228 * baseEarthValues.orbitalVelocity, 4.17 * baseEarthValues.orbitalObliquity),
                diameter: 4.01 * baseEarthValues.diameter,
                distanceFromSun: 4.01 * baseEarthValues.distanceFromSun,
                orbitalObliquity: 1.02,//4.17 * baseEarthValues.orbitalObliquity,
                color: 0Xe1eeee


            },
            {
                name: 'neptune',
                orbitalVelocity: 0.182 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(3.88 * baseEarthValues.diameter, 30.05 * baseEarthValues.distanceFromSun, 0.182 * baseEarthValues.orbitalVelocity, 1.21 * baseEarthValues.orbitalObliquity),
                diameter: 3.88 * baseEarthValues.diameter,
                distanceFromSun: 30.05 * baseEarthValues.distanceFromSun,
                orbitalObliquity: 0.72,//1.21 * baseEarthValues.orbitalObliquity,
                color: 0X3fafcf


            },
            {
                name: 'pluto',
                orbitalVelocity: 0.157 * baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(0.186 * baseEarthValues.diameter, 39.48 * baseEarthValues.distanceFromSun, 0.157 * baseEarthValues.orbitalVelocity, 2.45 * baseEarthValues.orbitalObliquity),
                diameter: 0.186 * baseEarthValues.diameter,
                distanceFromSun: 39.48 * baseEarthValues.distanceFromSun,
                orbitalObliquity:  15.55,//2.45 * baseEarthValues.orbitalObliquity,
                color: 0xfff1d5

            },
            {
                name: 'earth',
                orbitalVelocity: baseEarthValues.orbitalVelocity,
                pivot: new THREE.Object3D(),
                planet: new Planet(0.186 * baseEarthValues.diameter, 39.48 * baseEarthValues.distanceFromSun, 0.157 * baseEarthValues.orbitalVelocity, baseEarthValues.orbitalObliquity),
                diameter: baseEarthValues.diameter,
                distanceFromSun: baseEarthValues.distanceFromSun,
                orbitalObliquity:  baseEarthValues.orbitalObliquity,
                color: 0x0000ff

            }

        ]

        for (const pivotObj of this.pivotPoints) {
            pivotObj.pivot.name = pivotObj.name
            // add planet Mesh
            let planetGeometry = new THREE.SphereGeometry(pivotObj.diameter, 16, 16)
            let planetMaterial = new THREE.MeshBasicMaterial({
                color: pivotObj.color
            })
            let planet = new THREE.Mesh(planetGeometry,planetMaterial)
            planet.position.set(pivotObj.distanceFromSun, 0, 0)
            pivotObj.pivot.add(planet)

            //tilting the orbit
            pivotObj.pivot.rotateX((pivotObj.orbitalObliquity) * Math.PI/180)

            //drawing circular orbit
            const circleGeometry = new THREE.CircleGeometry(pivotObj.distanceFromSun, 128)
            circleGeometry.vertices.shift();
            circleGeometry.rotateX(-Math.PI / 2);
            const circlematerial = new THREE.LineBasicMaterial( { color: 0xCC0000 } );
            const orbit = new THREE.Line( circleGeometry, circlematerial )

            //titlting orbit line
            orbit.rotateX((pivotObj.orbitalObliquity) * Math.PI/180)
             scene.add(orbit)


            //drawing elliptical orbit
            /*
            * if(pivotObj.name === 'venus') {
                const { major, minor} = this._scaleMinorMajorAxis(pivotObj.semiMajorAxis,pivotObj.semiMinorAxis,10000000)
                const ellipseOrbit = new THREE.EllipseCurve(0,0,major,minor)
                const points = ellipseOrbit.getPoints( 50 );
                const geometry = new THREE.BufferGeometry().setFromPoints( points );

                const material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

                // Create the final object to add to the scene
                const ellipse = new THREE.Line( geometry, material );
                ellipse.rotateX(-Math.PI / 2);
                ellipse.rotateX((pivotObj.orbitalObliquity) * Math.PI/180)

                scene.add(ellipse)
            }*/





            this.sun.add(pivotObj.pivot)
        }


    }

    _scaleMinorMajorAxis(major,minor,scaleFactor){
        return {
            major:major/scaleFactor,
            minor:minor/scaleFactor
        }
    }

    _rotatePivots(pivots) {
        for (const pivot of pivots) {
            let pivotData = this.pivotPoints.find(obj => {
                return obj.name === pivot.name
            })
            if(pivotData !== undefined) {
                // these planets rotate counterclockwise
                if(pivot.name === 'venus' || pivot.name === 'pluto' || pivot.name === 'uranus') {
                    pivot.rotation.y -= pivotData.orbitalVelocity
                }
                else {
                    pivot.rotation.y += pivotData.orbitalVelocity
                }

            }
        }
    }


    update() {
        this.renderer.render(this.scene, this.camera)
        this._rotatePivots(this.sun.children)
    }


    onWindowResize() {
        /*this.camera.aspect = window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth/window.innerHeight)*/
    }

}