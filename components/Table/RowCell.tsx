import { useMemo } from 'react';
import Tooltip from '@/components/Tooltip';
import {
  CELL_FONT_CLASS_GETTER,
  TABLE_CELL_BORDER_DICT,
  TABLE_CELL_GRID_X_DICT,
  TABLE_CELL_GRID_Y_DICT,
  TABLE_CELL_TEXT_COLOR_DICT,
  getTableCellAlignClassName,
  getTableCellWidthStyle,
} from './styles';
import type { TableField, TableRowData, TableStyle } from './types';
import type { TooltipContext } from '@/components/Tooltip/styles';

type RowCellProps<T> = {
  type: TableStyle;
  data: T;
  field: TableField<T>;
  colIndex: number;
  tooltipContext: TooltipContext;
};

const RowCell = <T extends TableRowData>({ data, field, type, colIndex, tooltipContext }: RowCellProps<T>) => {
  const cellTooltipContent = useMemo<JSX.Element | undefined>(() => data[`${field.value}TooltipContent`], [data, field.value]);

  if (data[field.value] === undefined || data[field.value] === null) return <></>;

  const colorClassName = TABLE_CELL_TEXT_COLOR_DICT[type];
  const getCellFontClassName = CELL_FONT_CLASS_GETTER[type];

  return (
    <div
      key={field.value}
      role="cell"
      aria-colindex={colIndex}
      className={`${field.generateClassName?.(data) ?? ''} ${TABLE_CELL_GRID_X_DICT[type]} ${TABLE_CELL_GRID_Y_DICT[type]} ${
        TABLE_CELL_BORDER_DICT[type]
      } ${getTableCellAlignClassName(field, type)}`}
      style={getTableCellWidthStyle(field)}
    >
      <div className="relative inline-flex items-center gap-x-1">
        <Tooltip content={cellTooltipContent} context={tooltipContext}>
          <div className={`${colorClassName} ${getCellFontClassName(field.type)}`}>{data[field.value]}</div>
        </Tooltip>
      </div>
    </div>
  );
};

export default RowCell;
