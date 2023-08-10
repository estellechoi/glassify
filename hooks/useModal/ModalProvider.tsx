import React, { createContext, Fragment, PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';
import type { CloseFunction, OpenFunction, IsOpenGetter } from './types';

export const ModalContext = createContext<{ open: OpenFunction; close: CloseFunction; getIsOpen: IsOpenGetter } | null>(null);

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

  const getIsOpen = useCallback((id: string) => modalMap.has(id), [modalMap]);

  const context = useMemo(() => ({ open, close, getIsOpen }), [open, close, getIsOpen]);

  return (
    <ModalContext.Provider value={context}>
      {children}
      {[...modalMap.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </ModalContext.Provider>
  );
};
