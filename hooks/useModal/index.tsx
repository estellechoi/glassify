import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ModalElement, ModalRef } from './types';
import { ModalController } from './ModalController';
import { ModalContext } from './ModalProvider';

let elementId = 1;

const useModal = () => {
  const context = useContext(ModalContext);

  if (context === null) throw new Error('useModal must be used within a ModalProvider');

  const [id] = useState(() => String(elementId++));

  const { open, close, getIsOpen } = context;

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
    (ModalElement: ModalElement): Promise<void> => {
      return new Promise<void>((resolve) => {
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

  const modal = useMemo(() => {
    return {
      id: `modal-${id}`,
      isOpen: getIsOpen(id),
      open: openModal,
      close: handlers.close,
    };
  }, [id, openModal, handlers.close, getIsOpen]);

  return modal;
};

export default useModal;
