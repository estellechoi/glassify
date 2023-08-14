import { useMemo } from 'react';
import Tooltip from '@/components/Tooltip';
import {
  CELL_FONT_CLASS_GETTER,
  TABLE_CELL_BORDER_DICT,
  TABLE_CELL_GRID_X_DICT,
  TABLE_CELL_GRID_Y_DICT,
  TABLE_CELL_LOADER_DICT,
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
  isLoading: boolean;
};

const RowCell = <T extends TableRowData>({ data, field, type, colIndex, tooltipContext, isLoading }: RowCellProps<T>) => {
  const cellTooltipContent = useMemo<JSX.Element | undefined>(() => data[`${field.value}TooltipContent`], [data, field.value]);

  if (data[field.value] === undefined || data[field.value] === null) return <></>;

  const colorClassName = TABLE_CELL_TEXT_COLOR_DICT[type];
  const getCellFontClassName = CELL_FONT_CLASS_GETTER[type];

  const Loader = TABLE_CELL_LOADER_DICT[field.loaderType ?? 'span'];

  return (
    <div
      key={field.value}
      role="cell"
      aria-colindex={colIndex}
      className={`Component ${field.generateClassName?.(data) ?? ''} ${TABLE_CELL_GRID_X_DICT[type]} ${
        TABLE_CELL_GRID_Y_DICT[type]
      } ${TABLE_CELL_BORDER_DICT[type]} ${getTableCellAlignClassName(field, type)}`}
      style={getTableCellWidthStyle(field)}
    >
      {isLoading ? (
        <Loader fontClassName={getCellFontClassName(field.type)} className="w-1/2" type={field.loaderType} />
      ) : (
        <Tooltip content={cellTooltipContent} context={tooltipContext}>
          <div className={`${colorClassName} ${getCellFontClassName(field.type)}`}>{data[field.value]}</div>
        </Tooltip>
      )}
    </div>
  );
};

export default RowCell;
