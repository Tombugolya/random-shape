/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from '@emotion/react';
import React from 'react';
import isMobile from 'is-mobile';

const styleDiv = css`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  user-select: none;
  pointer-events: none;
`;

const InfoText = () => {
  return (
    <div css={styleDiv}>
      {isMobile() ? (
        <div>
          Swipe Left to randomize a color <br /> Swipe Right to randomize
          another shape
        </div>
      ) : (
        <div>
          Press 'C' to randomize a color <br /> Press 'R' to randomize another
          shape
        </div>
      )}
    </div>
  );
};

export default InfoText;
