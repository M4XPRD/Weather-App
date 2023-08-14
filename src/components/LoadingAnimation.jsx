import React from 'react';

const LoadingAnimation = ({ additionalClass }) => (
  <div className={`lds-ellipsis ${additionalClass ?? ''}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default LoadingAnimation;
