import { type MouseEventHandler, type ReactNode, useMemo } from 'react';
import { type OverlayBackdropColor } from './styles';
import useOverlayBackdropClassNames from './useOverlayBackdropClassNames';

type OverlayBackdropProps = {
  children?: ReactNode;
  color?: OverlayBackdropColor;
  isOpen?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const OverlayBackdrop = ({ children, color = 'glass', isOpen, onClick }: OverlayBackdropProps) => {
  const className = useOverlayBackdropClassNames(color, isOpen);

  const props = {
    'aria-hidden': !isOpen,
    className,
  };

  return onClick ? (
    <button type="button" {...props} onClick={onClick}>
      {children}
    </button>
  ) : (
    <div {...props}>{children}</div>
  );
};

export default OverlayBackdrop;
