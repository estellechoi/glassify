export type TooltipType = 'text' | 'any';
export type TooltipContext = 'base' | 'overlay' | 'navigation' | 'top_context';

export const TOOLTIP_CLASS_DICT: Record<TooltipType, string> = {
  text: 'text-white bg-caption shadow-subtle pl-2 pr-3 py-1',
  any: 'text-black bg-glass backdrop-blur-xl border-r border-b border-black_o10 shadow-subtle_glass px-5 py-4',
};

export const TOOLTIP_HIDDEN_Z_INDEX_CLASS_DICT: Record<TooltipContext, { on: string; off: string }> = {
  base: { on: 'z-tooltip_on_base', off: 'z-tooltip_hidden_on_base' },
  overlay: { on: 'z-tooltip_on_overlay', off: 'z-tooltip_hidden_on_overlay' },
  navigation: { on: 'z-tooltip_on_navigation', off: 'z-tooltip_hidden_on_navigation' },
  top_context: { on: 'z-tooltip_on_top_context', off: 'z-tooltip_hidden_on_top_context' },
};
