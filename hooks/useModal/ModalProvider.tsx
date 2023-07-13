import React, { createContext, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';
import type { CloseFunction, OpenFunction } from './types';

export const ModalContext = createContext<{ open: OpenFunction; close: CloseFunction } | null>(null);

export const ModalProvider = ({ children }: PropsWithChildren<any>) => {
  const [modalMap, setModalMap] = useState<Map<string, ReactNode>>(new Map());

  const open = useCallback((id: string, element: ReactNode) => {
    setModalMap((modalMap) => {
      const clonedMap = new Map(modalMap);
      clonedMap.set(id, element);
      return clonedMap;
    });
  }, []);

  const close = useCallback((id: string) => {
    setModalMap((modalMap) => {
      const clonedMap = new Map(modalMap);
      clonedMap.delete(id);
      return clonedMap;
    });
  }, []);

  const context = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={context}>
      {children}
      {[...modalMap.entries()].map(([id, element]) => (
        <React.Fragment key={id}>{element}</React.Fragment>
      ))}
    </ModalContext.Provider>
  );
};
