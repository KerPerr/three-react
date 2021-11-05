import React from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const App = () => {
    const { useRef, useEffect, useState } = React

    const mount = useRef()

    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            45,
            mount.current.clientWidth / mount.current.clientHeight,
            1,
            1000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('#000000')
        renderer.setSize(mount.current.clientWidth, mount.current.clientHeight)

        const loader = new GLTFLoader()
        loader.load('path.glb', (gltf) => {

        }, (xhr) => {
            console.log(`${xhr.loaded / xhr.total * 100} % loaded`)
        }, (error) => {
            console.log('An error occured', error)
        })

        const renderScene = () => {
            renderer.render(scene, camera)
        }

        const handleResize = () => {
            renderer.setSize(mount.current.clientWidth, mount.current.clientHeight)
            camera.aspect = mount.current.clientWidth / mount.current.clientHeight
            camera.updateProjectionMatrix()
            renderScene()
        }

        const animate = () => {
            renderScene()

            box.rotation.x += 0.01;
            box.rotation.y += 0.01;

            window.requestAnimationFrame(animate)
        }

        mount.current.appendChild(renderer.domElement)
        window.addEventListener('resize', handleResize)

        animate()

        return () => {
            window.removeEventListener('resize', handleResize)
            mount.current.removeChild(renderer.domElement)
        }

    }, [])

    return <div ref={mount} style={{ height: '100vh' }}></div>
}

ReactDOM.render(<App />, document.getElementById('root'))