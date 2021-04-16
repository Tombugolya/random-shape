import './App.css';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import SceneComponents from './setup/SceneComponents';
import { Lights } from './setup/Lights';

let SCENE_COMPONENTS: SceneComponents;

function Main() {
  const container = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    let frameId: number;
    let width = container.current.clientWidth;
    let height = container.current.clientHeight;
    SCENE_COMPONENTS = new SceneComponents(
      container.current,
      width,
      height,
      '#000'
    );
    new Lights(SCENE_COMPONENTS.scene, SCENE_COMPONENTS.camera.position);

    const start = () => {
      if (!frameId) frameId = requestAnimationFrame(animate);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      SCENE_COMPONENTS.controls.update();
      SCENE_COMPONENTS.renderer.render(
        SCENE_COMPONENTS.scene,
        SCENE_COMPONENTS.camera
      );
    };

    start();
  });

  return <div ref={container} id="container" />;
}

export default Main;
