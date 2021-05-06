import { css } from '@emotion/react';

const globalStyles = css`
  body {
    margin: 0;
    width: 100%;
    background-color: #000;
    overscroll-behavior: none;
    color: #fff;
    font-family: Monospace, serif;
    font-size: 13px;
    line-height: 24px;
  }
  canvas {
    display: block;
  }
`;

export default globalStyles;
