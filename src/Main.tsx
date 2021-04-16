import './App.css';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import SceneComponents from './setup/SceneComponents';
import RandomShape from './meshes/RandomShape';
import Lights from './setup/Lights';

let SCENE_COMPONENTS: SceneComponents;

function Main() {
  const container = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    let frameId: number;
    SCENE_COMPONENTS = new SceneComponents(container.current, '#000');
    new Lights(SCENE_COMPONENTS.scene, SCENE_COMPONENTS.camera.position);
    new RandomShape(SCENE_COMPONENTS.scene);

    const start = () => {
      if (!frameId) frameId = requestAnimationFrame(animate);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      SCENE_COMPONENTS.render();
    };

    const handleResize = () => {
      SCENE_COMPONENTS.handleResize(
        container.current.clientWidth,
        container.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);
    start();
  });

  return <div ref={container} id="container" />;
}

export default Main;
