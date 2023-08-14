import { ElementType } from 'react';
import type { TableCellAlign, TableCellLoaderType, TableField, TableRowData, TableStyle } from './types';
import LoadingRows from '@/components/LoadingRows';

/** grid */
export const TABLE_BG_COLOR_DICT: Record<TableStyle, string> = {
  primary: '',
};

// export const TABLE_CONTAINER_BORDER_DICT: Record<TableStyle, string> = {
//   primary: 'rounded-2xl',
//   border-outline_soft border rounded-2xl md:border-0 md:border-b md:last:border-b-0 md:rounded-none
// };

export const TABLE_SPACE_Y_DICT: Record<TableStyle, string> = {
  primary: 'flex flex-col gap-y-4 md:block md:space-y-0',
};

export const TABLE_FIELD_RIGHT_PADDING = '!pr-24';
export const TABLE_ROW_RIGHT_PADDING = 'md:pr-24';

export const TABLE_FIELD_GRID_X_DICT: Record<TableStyle, string> = {
  primary: 'flex items-center justify-between gap-x-3 px-4',
};

export const TABLE_FIELD_GRID_Y_DICT: Record<TableStyle, string> = {
  primary: 'min-h-[2.75rem] py-2',
};

// md:pl-4 md:pr-24
export const TABLE_ROW_GRID_X_DICT: Record<TableStyle, string> = {
  primary: 'flex flex-row items-center justify-between gap-x-3 px-0 md:px-4',
};

export const TABLE_ROW_GRID_Y_DICT: Record<TableStyle, string> = {
  primary: 'min-h-[4.25rem] gap-y-4 py-3',
};

export const TABLE_CELL_GRID_X_DICT: Record<TableStyle, string> = {
  primary: 'flex items-center gap-x-1 pl-3 pr-3 first:pr-2 md:pl-0 md:pr-0 md:first-pr-0',
};

export const TABLE_CELL_GRID_Y_DICT: Record<TableStyle, string> = {
  primary: '',
};

export const TABLE_CELL_BORDER_DICT: Record<TableStyle, string> = {
  primary: '',
};

export const TABLE_CELL_TEXT_COLOR_DICT: Record<TableStyle, string> = {
  primary: 'text-primary',
};

/** cell alignment */
export const TABLE_CELL_ALIGN_DICT: Record<TableStyle, Record<TableCellAlign, string>> = {
  primary: {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  },
};

/** border */
export const TABLE_FIELD_BORDER_DICT: Record<TableStyle, string> = {
  primary: 'border-b border-primary_line',
};

/** color */
export const TABLE_ROW_GROUP = 'group';

export const TABLE_FIELD_BG_DICT: Record<TableStyle, string> = {
  primary: 'bg_surface_-3',
};

export const TABLE_ROW_BG_DICT: Record<TableStyle, string> = {
  primary: '',
};

export const TABLE_ROW_BORDER_DICT: Record<TableStyle, string> = {
  primary: '',
};

export const TABLE_ROW_HOVER_LAYER =
  'md:before:block before:absolute before:w-full before:h-full before:top-0 before:right-0 before:left-0 before:bottom-0 before:bg-transparent before:transition-all';

export const TABLE_ROW_HOVER_LAYER_BG_DICT: Record<TableStyle, string> = {
  primary: `${TABLE_ROW_HOVER_LAYER} md:before:hover:bg_moonlight_thin`,
};

/** text */
export const TABLE_FIELD_TYPO_DICT: Record<TableStyle, string> = {
  primary: 'Font_caption_sm',
};

export const CELL_FONT_CLASS_GETTER: Record<TableStyle, (dataType: 'number' | 'jsx') => string> = {
  primary: (dataType: 'number' | 'jsx') => (dataType === 'number' ? 'Font_data_14px_num md:Font_data_16px_num' : 'Font_body_md'),
};

export const TABLE_EXPAND_ICON_GRID_X: Record<TableStyle, string> = {
  primary: 'px-1 md:px-2',
};

export const TABLE_CELL_LOADER_DICT: Record<TableCellLoaderType, ElementType> = {
  span: LoadingRows,
  grid: LoadingRows,
  coin_label: LoadingRows,
};

/** style generators */
export const getTableCellAlignClassName = <T extends TableRowData>(field: TableField<T>, type: TableStyle) => {
  return `${TABLE_CELL_ALIGN_DICT[type][field.align ?? 'left']} ${
    field.widthPx !== undefined || field.widthRatio !== undefined ? 'grow-0 shrink-0' : 'grow shrink'
  } ${field.widthPx !== undefined ? 'truncate' : ''}`;
};

export const getTableCellWidthStyle = <T extends TableRowData>(field: TableField<T>) => {
  return {
    flexBasis:
      field.widthPx !== undefined
        ? `${field.widthPx}px`
        : field.widthRatio !== undefined
        ? `${field.widthRatio}%`
        : 'auto w-full',
  };
};

export const getHidableAreaClassName = (isOpen: boolean) =>
  `relative transition-all ease-out ${isOpen ? '' : 'z-hidden_on_base max-h-0 !border-b-0 opacity-0'}`;
