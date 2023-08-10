import { useMemo } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor as FollowCursor } from 'tippy.js/headless';
import type { Placement } from 'tippy.js';
import { TOOLTIP_CLASS_DICT, TOOLTIP_HIDDEN_Z_INDEX_CLASS_DICT, type TooltipContext, type TooltipType } from './styles';

type TooltipProps = {
  children: React.ReactNode;
  context: TooltipContext;
  type?: TooltipType;
  content?: React.ReactNode;
  placement?: Placement;
  followCursor?: boolean;
};

function Tooltip({ children, context, type = 'text', content, placement, followCursor }: TooltipProps) {
  const className = useMemo<string>(() => TOOLTIP_CLASS_DICT[type], [type]);

  const zIndexClassNames = useMemo(() => TOOLTIP_HIDDEN_Z_INDEX_CLASS_DICT[context], [context]);
  const visibilityClassName = useMemo<string>(
    () => (content === undefined ? `${zIndexClassNames.off} invisible opacity-0 transition-none` : zIndexClassNames.on),
    [content, zIndexClassNames]
  );

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
      maxWidth={328}
      className={`tippy-default md:!min-w-max !max-w-xs md:!max-w-none whitespace-pre-wrap break-all ${className} ${visibilityClassName}`}
    >
      <>{children}</>
    </Tippy>
  );
}

export default Tooltip;
