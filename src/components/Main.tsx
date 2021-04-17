import '../css/Main.css';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import SceneComponents from '../setup/SceneComponents';
import RandomShape from '../meshes/RandomShape';
import Lights from '../setup/Lights';
import { Clock } from 'three';
import { useQuery } from '../hooks/hooks';

let SCENE_COMPONENTS: SceneComponents;

function Main() {
  const container = useRef() as MutableRefObject<HTMLDivElement>;
  const beating = useQuery().get('beating') === 'true';

  useEffect(() => {
    let frameId: number;
    const clock = new Clock();
    SCENE_COMPONENTS = new SceneComponents(container.current, '#000');
    new Lights(SCENE_COMPONENTS.scene, SCENE_COMPONENTS.camera.position);
    const shape = new RandomShape(SCENE_COMPONENTS.scene);

    const start = () => {
      if (!frameId) frameId = requestAnimationFrame(animate);
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      animateFunctions();
      SCENE_COMPONENTS.render();
    };

    const animateFunctions = () => {
      if (beating) shape.updateTension(Math.sin(clock.getElapsedTime()));
    };

    const handleResize = () => {
      SCENE_COMPONENTS.handleResize(
        container.current.clientWidth,
        container.current.clientHeight
      );
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };

    window.addEventListener('resize', handleResize);
    start();

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
    };
  }, [beating]);

  return <div ref={container} id="container" />;
}

export default Main;
