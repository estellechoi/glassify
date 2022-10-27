import type { RadioOption } from '../RadioGroup';
import type { NotiStatus } from '../../types/noti';

export type TableFieldAlign = 'left' | 'right' | 'center';

// field  typing
export interface TableFieldHTML {
  label: string | JSX.Element;
  value: string;
  sortValue?: string;
  abbrOver?: number;
  widthRatio?: number;
  responsive?: boolean; // default => false
  assertThoughResponsive?: boolean; // default => false
  tag?: string;
  color?: string;
  type?: 'html';
  align?: TableFieldAlign;
  clickable?: boolean;
  tooltip?: boolean;
}

export interface TableFieldImgUrl extends Omit<TableFieldHTML, 'type'> {
  type: 'imgUrl';
  size?: number;
}

export interface TableFieldBignumber extends Omit<TableFieldHTML, 'type'> {
  type: 'bignumber';
  toFixedFallback?: number;
}

export interface TableFieldUSD extends Omit<TableFieldHTML, 'type'> {
  type: 'usd';
  toFixedFallback?: number;
}

export interface TableFieldChange extends Omit<TableFieldHTML, 'type'> {
  type: 'change';
  toFixedFallback?: number;
  neutral?: boolean;
  strong?: boolean;
  gt?: number;
  gtCSS?: string;
  lt?: number;
  ltCSS?: string;
  et?: number;
  etCSS?: string;
}

export interface TableFieldObj extends Omit<TableFieldHTML, 'type'> {
  type: 'object';
  displayValue: string;
  displayType?: 'html' | 'imgUrl' | 'bignumber' | 'usd' | 'change';
  objSortValue: string;
}

export interface TableFieldStringNumber extends Omit<TableFieldHTML, 'type'> {
  type: 'number';
  gt?: number;
  gtCSS?: string;
  lt?: number;
  ltCSS?: string;
  et?: number;
  etCSS?: string;
  animate?: boolean;
}

export type TableField =
  | TableFieldHTML
  | TableFieldImgUrl
  | TableFieldBignumber
  | TableFieldUSD
  | TableFieldChange
  | TableFieldObj
  | TableFieldStringNumber;

// item typing
export interface TableRow {
  status?: NotiStatus;
  exponent?: number;
  filter?: string[];
  // tooltip?: string | JSX.Element
  [key: string]: any;
}

export interface TableProps<T extends TableRow> {
  title?: string;
  isLoading?: boolean;
  list: T[];
  fields: TableField[];
  overflow?: boolean;
  useSearch?: boolean;
  mergedFields?: string[][];
  mergedFieldLabels?: string[];
  totalField?: string;
  totalLabel?: string | JSX.Element;
  totalLabelSuffix?: string | JSX.Element;
  totalDesc?: string | JSX.Element;
  totalStatus?: NotiStatus;
  showTitle?: boolean;
  showFieldsBar?: boolean;
  useNarrow?: boolean;
  emptyListLabel?: string;
  defaultSortBy?: TableField['value'];
  defaultIsSortASC?: boolean;
  nowrap?: boolean;
  filterOptions?: RadioOption[];
  defaultFilterIndex?: number;
  memo?: string | JSX.Element;
  onRowClick?: (item: T) => void;
  onCellClick?: (cell: any, field: string, item: T) => void;
  onCellTooltip?: (cell: any, field: string, item: T) => JSX.Element | string | undefined;
  onFieldClick?: (field: string) => void;
  onFieldTooltip?: (field: string) => JSX.Element | string | undefined;
  onSearch?: (keyword: string) => void;
}
