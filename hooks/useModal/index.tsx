import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ModalElement, ModalRef } from './types';
import { ModalController } from './ModalController';
import { ModalContext } from './ModalProvider';

let elementId = 1;

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === null) throw new Error('useModal must be used within a ModalProvider');

  const [id] = useState(() => String(elementId++));

  const { open, close } = context;

  const modalRef = useRef<ModalRef | null>(null);

  const handlers = useMemo(() => {
    return {
      open: (modalElement: ModalElement) => {
        open(id, <ModalController modalElement={modalElement} onClosed={() => close(id)} ref={modalRef} />);
      },
      close: () => {
        modalRef.current?.onClose();
      },
    };
  }, [id, open, close]);

  const openModal = useCallback(
    (modalElement: ModalElement): Promise<void> => {
      return new Promise<void>((resolve) => {
        const ModalElement = modalElement;
        handlers.open(({ isOpen, onClose }) => (
          <ModalElement
            isOpen={isOpen}
            onClose={() => {
              onClose();
              resolve();
            }}
          />
        ));
      });
    },
    [handlers]
  );

  const overlay = useMemo(() => {
    return {
      open: openModal,
      close: handlers.close,
    };
  }, [openModal, handlers.close]);

  return overlay;
};

export default useModal;
