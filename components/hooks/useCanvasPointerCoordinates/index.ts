import type { ThreeEvent } from '@react-three/fiber';
import { PointerEventHandler, useCallback, useEffect, useState } from 'react';

const useCanvasPointerCoordinates = () => {
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

  const persistInteractedObject = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const itersectedObject: THREE.Object3D<THREE.Event> | undefined = event.intersections[0]?.eventObject;
      setLastObject(itersectedObject);

      if (itersectedObject && !isObejctInteractedEver) setIsObejctInteractedEver(true);
    },
    [isObejctInteractedEver]
  );

  const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null);

  const updateCoordinates = useCallback((event: ThreeEvent<PointerEvent>) => {
    const { clientX, clientY } = event;

    if (!clientX || !clientY) {
      const coordinates = null;
      setCoordinates(coordinates);
      return null;
    }

    const coordinates = { x: clientX, y: clientY };
    setCoordinates(coordinates);
    return coordinates;
  }, []);

  const moveObjectToCanvasPointer = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (!lastObject) return;

      const { x, y, z } = lastObject.position;
      const { clientX, clientY } = event;

      const xPlus = (coordinates ? coordinates.x < clientX : clientX > window.innerWidth / 2) ? 0.006 : -0.006;
      const yPlus = (coordinates ? coordinates.y < clientY : clientY > window.innerHeight / 2) ? -0.006 : 0.006;
      lastObject.position.set(x + xPlus, y + yPlus, z);

      updateCoordinates(event);
    },
    [lastObject, coordinates, updateCoordinates]
  );

  return {
    coordinates,
    isObejctInteractedEver,
    followPointer,
    persistInteractedObject,
    updateCoordinates,
    moveObjectToCanvasPointer,
  };
};

export default useCanvasPointerCoordinates;
