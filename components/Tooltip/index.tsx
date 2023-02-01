import Tippy from '@tippyjs/react';
import { followCursor as FollowCursor } from 'tippy.js/headless';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

/** @docs https://atomiks.github.io/tippyjs/v6/themes/#styling-the-arrow */
// import './tippy.css';

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

type TooltipProps = {
  children: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
  placement?: TipplyPlacement;
  followCursor?: boolean;
  zIndex?: number;
};

function Tooltip({ children, className, content, placement, followCursor, zIndex = 1 }: TooltipProps) {
  return content !== undefined ? (
    <div className={className}>
      <Tippy
        plugins={[FollowCursor]}
        /** @caution tippy.css uses this theme="custom" definition, so do not remove it */
        theme="custom"
        arrow={true}
        placement={placement}
        followCursor={followCursor}
        hideOnClick={true}
        content={content}
        zIndex={zIndex}
        className={`tippy-default md:!min-w-max !max-w-xs md:!max-w-none whitespace-pre-wrap break-all px-4 py-5`}
      >
        <div>{children}</div>
      </Tippy>
    </div>
  ) : (
    <div className={className}>{children}</div>
  );
}

export default Tooltip;
