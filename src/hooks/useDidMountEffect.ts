import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (func: () => void, inputs: string[]) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      func();
    } else {
      didMountRef.current = true;
    }
  }, [...inputs]);
};

export default useDidMountEffect;
