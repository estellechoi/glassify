import type { ThreeEvent } from '@react-three/fiber';
import { PointerEventHandler, useCallback, useEffect, useState } from 'react';

const useCanvasPointerEvent = () => {
  const [lastObject, setLastObject] = useState<THREE.Object3D<THREE.Event> | undefined>(undefined);
  const [isObejctInteractedEver, setIsObejctInteractedEver] = useState<boolean>(false);

  const followPointer = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const { x, y } = event.pointer;
      lastObject?.position.set(x, y, lastObject.position.z);
      setLastObject(lastObject);
    },
    [lastObject]
  );

  const persitInteractedObject = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const itersectedObject: THREE.Object3D<THREE.Event> | undefined = event.intersections[0]?.eventObject;
      setLastObject(itersectedObject);

      if (itersectedObject && !isObejctInteractedEver) setIsObejctInteractedEver(true);
    },
    [isObejctInteractedEver]
  );

  const [prevClientXY, setPrevClientXY] = useState<{ x: number; y: number }>();

  const moveObjectToCanvasPointer = useCallback<PointerEventHandler<HTMLDivElement>>(
    (event) => {
      if (!lastObject) return;

      const { x, y, z } = lastObject.position;
      const { clientX, clientY } = event;

      const xPlus = (prevClientXY ? prevClientXY.x < clientX : clientX > window.innerWidth / 2) ? 0.006 : -0.006;
      const yPlus = (prevClientXY ? prevClientXY.y < clientY : clientY > window.innerHeight / 2) ? -0.006 : 0.006;
      lastObject.position.set(x + xPlus, y + yPlus, z);

      setPrevClientXY({ x: clientX, y: clientY });
    },
    [lastObject, prevClientXY]
  );

  return {
    isObejctInteractedEver,
    followPointer,
    persitInteractedObject,
    moveObjectToCanvasPointer,
  };
};

export default useCanvasPointerEvent;
