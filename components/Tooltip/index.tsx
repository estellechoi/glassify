import Tippy from '@tippyjs/react';
import { followCursor as FollowCursor } from 'tippy.js/headless';

type TipplyPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

type TooltipType = 'text' | 'any';

const TOOLTIP_STYLES: { [key in TooltipType]: string } = {
  text: 'text-white bg-caption shadow-subtle pl-2 pr-3 py-1',
  any: 'text-black bg-glass backdrop-blur-xl border-r border-b border-black_o10 shadow-subtle_glass px-5 py-4',
};

type TooltipProps = {
  children: React.ReactNode;
  type?: TooltipType;
  content?: React.ReactNode;
  placement?: TipplyPlacement;
  followCursor?: boolean;
  zIndex?: number;
};

function Tooltip({ children, type = 'text', content, placement, followCursor, zIndex = 1 }: TooltipProps) {
  return (
    <Tippy
      plugins={[FollowCursor]}
      /** @caution tippy.css uses this theme="custom" definition, so do not remove it */
      theme="custom"
      arrow={false}
      placement={placement}
      followCursor={followCursor}
      hideOnClick={true}
      content={content}
      zIndex={zIndex}
      maxWidth={327}
      className={`tippy-default md:!min-w-max !max-w-xs md:!max-w-none whitespace-pre-wrap break-all ${TOOLTIP_STYLES[type]} ${
        content === undefined ? 'invisible -z-1 opacity-0 transition-none' : ''
      }`}
    >
      <div>{children}</div>
    </Tippy>
  );
}

export default Tooltip;
