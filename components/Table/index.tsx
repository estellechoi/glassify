import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import BigNumber from 'bignumber.js';
import RadioGroup, { RadioOption, RADIO_DEFAULT_OPTION } from '../RadioGroup';
import { useMatchedTable } from './hook';
import { TableField, TableFieldAlign, TableFieldBignumber, TableFieldUSD, TableProps, TableRow } from './types';
import CopyHelper from '../CopyHelper';
import { abbrOver } from '../../utils/text';
import { NotiStatus } from '../../types/noti';
import { formatUSDAmount } from '../../utils/number';
import LoadingRows from '../LoadingRows';

const IS_SORT_ASC_DEFAULT = false;
const FIELD_CSS_CLASS =
  'grow shrink justify-start items-center TYPO-BODY-XS text-grayCRE-400 dark:text-grayCRE-300 !font-medium cursor-pointer md:flex md:TYPO-BODY-S whitespace-pre';

export default function Table<T extends TableRow>({
  title,
  isLoading = false,
  list,
  fields,
  overflow,
  mergedFields = [],
  mergedFieldLabels = [],
  showTitle = true,
  showFieldsBar = true,
  useNarrow = false,
  emptyListLabel = 'No data',
  defaultSortBy,
  defaultIsSortASC,
  nowrap = false,
  filterOptions,
  defaultFilterIndex,
  memo,
  onRowClick,
  onCellClick,
  onFieldClick,
  onSearch,
}: TableProps<T>) {
  // fields
  const allMergedList = mergedFields.reduce((accm, items) => accm.concat(items), []);

  const nonMerged: TableField[] = useMemo(
    () => fields.filter((field) => !allMergedList.includes(field.value)),
    [fields, allMergedList]
  );

  const merged: TableField[][] = useMemo(
    () =>
      mergedFields
        .map((items) => fields.filter((field) => items.includes(field.value)))
        .filter((items) => items.length),
    [mergedFields, fields]
  );

  // col width ratio
  const [colWidthRatio, setColWidthRatio] = useState(100);

  useEffect(() => {
    setColWidthRatio(100 / (nonMerged.length + 1));
  }, [nonMerged]);

  // table search keyword
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const onSearchInputChange = useCallback(
    (newKeyword: string) => {
      setSearchKeyword(newKeyword);
      if (onSearch) onSearch(newKeyword);
    },
    [onSearch]
  );

  // table sorting setting
  const [sortBy, setSortBy] = useState<string | undefined>(defaultSortBy);
  const [objSortValue, setObjSortValue] = useState<string | undefined>();
  const [isSortASC, setIsSortASC] = useState<boolean>(defaultIsSortASC ?? IS_SORT_ASC_DEFAULT);

  const handleSorting = (field: TableField) => {
    const newSortBy = field.sortValue ?? field.value;
    const isSameFieldClicked = sortBy === newSortBy;

    if (isSameFieldClicked) {
      setIsSortASC(!isSortASC);
    } else {
      setIsSortASC(IS_SORT_ASC_DEFAULT);
      setSortBy(newSortBy);
      if (field.type === 'object') setObjSortValue(field.objSortValue);
    }
  };
  const handleFieldClick = (field: TableField) => {
    if (onFieldClick) {
      onFieldClick(field.value);
    } else {
      handleSorting(field);
    }
  };

  // table filter option
  const [filterOption, setFilterOption] = useState<RadioOption>(RADIO_DEFAULT_OPTION);

  // final table list to display
  const matchedList = useMatchedTable({
    list,
    searchKeyword,
    sortBy,
    objSortValue,
    isSortASC,
    filterOption,
  });

  return (
    <div>
      {/* list header */}
      <header className="flex flex-col justify-start align-stretch mb-4">
        {showTitle && title !== undefined && <h3 className="mb-4">{title}</h3>}
        <div className="flex flex-col justify-between items-stretch space-y-2 md:flex-row md:items-end md:space-y-0 md:space-x-2 text-white">
          {memo && <div className="">{memo}</div>}
          {filterOptions && (
            <RadioGroup
              className="grow shrink"
              options={filterOptions}
              defaultIndex={defaultFilterIndex ?? 0}
              onSelect={setFilterOption}
            />
          )}
        </div>
      </header>

      <div className={overflow ? 'overflow-x-scroll' : ''}>
        <div className={overflow ? 'min-w-full w-max' : ''}>
          {/* list fields */}
          {showFieldsBar ? (
            <div aria-hidden="true" className={`transition-all ${useNarrow ? 'mb-1' : 'mb-2'}`}>
              <ul
                className={`flex justify-between items-center bg-grayCRE-200 dark:bg-neutral-800 px-4 py-1 transition-all ${
                  useNarrow ? 'md:py-1 rounded-md md:space-x-2' : 'rounded-lg md:space-x-4'
                  // useNarrow ? 'rounded-lg px-4 md:space-x-2' : 'rounded-xl p-4 md:space-x-4'
                }`}
              >
                {nonMerged.map((field, i) => (
                  <li
                    key={`field-${field.value}`}
                    style={{
                      flexBasis: `${field.widthRatio ?? colWidthRatio}%`,
                      justifyContent: field.align
                        ? getFlexAlign(field.align)
                        : field.type === 'bignumber' ||
                          field.type === 'usd' ||
                          field.type === 'change' ||
                          field.type === 'number'
                        ? 'flex-end'
                        : 'flex-start',
                    }}
                    className={`${field.responsive ? 'hidden' : 'flex'} ${FIELD_CSS_CLASS}`}
                    onClick={() => handleFieldClick(field)}
                  >
                    {field.label}
                    {sortBy && sortBy === (field.sortValue ?? field.value) ? (
                      <span className="ml-2">{isSortASC ? '↓' : '↑'}</span>
                      ) : null}
                  </li>
                ))}
                {merged.map((items, index) =>
                  items.map((field, i) =>
                    (i === 0 ? (
                      <li
                        key={`field-${field.value}`}
                        className={`${field.responsive ? 'hidden' : 'flex'} ${FIELD_CSS_CLASS}`}
                        style={{
                          flexBasis: `${
                            items.reduce((m, item) => m + (field.widthRatio ?? colWidthRatio), 0) ??
                            colWidthRatio
                          }%`,
                          justifyContent: field.align
                            ? getFlexAlign(field.align)
                            : field.type === 'bignumber' ||
                              field.type === 'usd' ||
                              field.type === 'change' ||
                              field.type === 'number'
                            ? 'flex-end'
                            : 'flex-start',
                        }}
                        onClick={() => handleFieldClick(field)}
                      >
                        {mergedFieldLabels[index] ?? ''}
                        {sortBy && sortBy === (field.sortValue ?? field.value) ? (
                          <span className="ml-2">{isSortASC ? '↓' : '↑'}</span>
                          ) : null}
                      </li>
                    ) : null)))}
              </ul>
            </div>
          ) : null}

          {/* data list */}
          {isLoading ? (
            <EmptyData isLoading loadingRowsCnt={12} useNarrow={useNarrow} />
          ) : (
            <>
              <div>
                {matchedList.length <= 0 ? (
                  <EmptyData useNarrow={useNarrow} label={emptyListLabel} />
                ) : (
                  <ul
                    className={`flex flex-col justify-start items-stretch transition-all ${
                      useNarrow ? 'space-y-1' : 'space-y-2'
                    }`}
                  >
                    {matchedList.map((item, i) => (
                      <TRow<T>
                        key={i}
                        data={item}
                        merged={merged}
                        nonMerged={nonMerged}
                        useNarrow={useNarrow}
                        colWidthRatio={colWidthRatio}
                        nowrap={nowrap}
                        onClick={onRowClick}
                        onCellClick={onCellClick}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

//   TRow
function TRow<T extends TableRow>({
  data,
  merged,
  nonMerged,
  useNarrow,
  colWidthRatio,
  nowrap,
  onClick,
  onCellClick,
}: {
  data: T;
  merged: TableField[][];
  nonMerged: TableField[];
  useNarrow?: boolean;
  colWidthRatio: number;
  nowrap: boolean;
  onClick?: (item: T) => void;
  onCellClick?: (cell: any, field: string, row: T) => void;
}) {
  return (
    <li className="relative block w-full">
      <ul
        className={`${data.status ? getTRowClassByStatus(data.status) : ''} ${
          useNarrow ? 'rounded-lg px-4 md:space-x-2' : 'rounded-xl p-4 md:space-x-4'
        } ${
          nowrap
            ? 'flex-row items-center space-x-2'
            : 'flex-col md:flex-row items-strecth md:items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2'
        } flex  justify-between w-full bg-neutral-800 py-3 transition-all dark:hover:bg-neutral-700 hover:-translate-y-[1px] ${
          onClick ? '!cursor-pointer' : ''
        }`}
        onClick={() => {
          if (onClick) onClick(data);
        }}
      >
        {nonMerged.map((field, i) => (
          <li
            key={`item-field-${field.value}`}
            onClick={() => {
              if (onCellClick && field.clickable) onCellClick(data[field.value], field.value, data);
            }}
            className={`${cellClass(field)} flex space-x-2 ${
              onCellClick && field.clickable ? '!cursor-pointer' : ''
            }`}
            style={{
              flexBasis: `${field.widthRatio ?? colWidthRatio}%`,
              flexShrink: field.type === 'imgUrl' ? '0' : '1',
              justifyContent: field.align
                ? getFlexAlign(field.align)
                : field.type === 'bignumber' ||
                  field.type === 'usd' ||
                  field.type === 'change' ||
                  field.type === 'number'
                ? 'flex-end'
                : 'flex-start',
            }}
          >
            {TRowCell({ data, field })}
          </li>
        ))}
        {merged.map((list, index) => (
          <li
            key={`item-merged-field-${index}`}
            className="grow shrink flex flex-col justify-start items-stretch space-y-1 md:space-y-2"
            style={{
              flexBasis: `${
                list.reduce((m, item) => m + (item.widthRatio ?? colWidthRatio), 0) ?? colWidthRatio
              }%`,
            }}
          >
            {list.map((field) => (
              <div
                key={`item-merged-field-${field.value}`}
                onClick={() => {
                  if (onCellClick && field.clickable) {
                    onCellClick(data[field.value], field.value, data);
                  }
                }}
                className={`${cellClass(field)} flex space-x-2 ${
                  onCellClick && field.clickable ? '!cursor-pointer' : ''
                }`}
                style={{
                  flexShrink: field.type === 'imgUrl' ? '0' : '1',
                  justifyContent: field.align
                    ? getFlexAlign(field.align)
                    : field.type === 'bignumber' ||
                      field.type === 'usd' ||
                      field.type === 'change' ||
                      field.type === 'number'
                    ? 'flex-end'
                    : 'flex-start',
                }}
              >
                {TRowCell({ data, field })}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </li>
  );
}

function TRowCell({ data, field }: { data: TableRow; field: TableField }) {
  const value = data[field.value];

  if (field.type === 'imgUrl' && typeof value === 'string') {
    return value.length > 0 ? (
      <Image
        src={value}
        alt=""
        style={{ width: `${field.size ?? 24}px`, height: `${field.size ?? 24}px` }}
      />
    ) : null;
  }
  if (field.type === 'bignumber' || field.type === 'usd') {
    const numberVal =
      value === null || value === undefined
        ? '-'
        : bignumberToFormat({ value, exponent: data.exponent, field });

    return (
      <div title={numberVal} className="FONT-MONO">
        {numberVal}
      </div>
    );
  }
  if (field.abbrOver && typeof value === 'string') {
    const abbrLength = field.abbrOver ?? value.length;
    const abbrVal = abbrOver(value, abbrLength);
    return (
      <CopyHelper toCopy={value} iconPosition="left">
        {' '}
        <div title={value} className="TYPO-BODY-XS md:TYPO-BODY-S">
          {abbrVal}
        </div>
      </CopyHelper>
    );
  }
  if (field.type === 'change' && typeof value === 'number') {
    const absValue = Math.abs(value);
    const changeValue =
      absValue === 0
        ? '0'
        : absValue < 0.01
        ? '<0.01'
        : absValue.toFixed(field.toFixedFallback ?? 2);

    const direction = value > 0 ? '+' : value < 0 ? '-' : null;
    const CSSByDirection = field.strong
      ? 'text-pinkCRE'
      : field.neutral
      ? ''
      : direction === '+'
      ? 'text-success'
      : direction === '-'
      ? 'text-error'
      : '';

    const isGt = field.gt !== undefined && absValue > field.gt;
    const isLt = field.lt !== undefined && absValue < field.lt;
    const isEt = field.et !== undefined && absValue === field.et;

    return (
      <div
        title={`${value}%`}
        className={`FONT-MONO TYPO-BODY-XS md:TYPO-BODY-S ${isGt ? field.gtCSS : ''} ${
          isLt ? field.ltCSS : ''
        } ${isEt ? field.etCSS : ''} ${CSSByDirection}`}
      >
        {!field.neutral && direction}
        {changeValue}%
      </div>
    );
  }
  if ((typeof value === 'string' || typeof value === 'number') && field.type === 'number') {
    const num = typeof value === 'string' ? value.trim().split(',').join('') : value;
    const isGt = field.gt !== undefined && num > field.gt;
    const isLt = field.lt !== undefined && num < field.lt;
    const isEt = field.et !== undefined && num === field.et;

    return (
      <div
        title={`${value}`}
        className={`FONT-MONO TYPO-BODY-XS md:TYPO-BODY-S ${isGt ? field.gtCSS : ''} ${
          isLt ? field.ltCSS : ''
        } ${isEt ? field.etCSS : ''}`}
      >
        {value}
      </div>
    );
  }
  if (field.type === 'object' && typeof value === 'object') {
    const display = value[field.displayValue];
    return (
      <div
        title={typeof display === 'object' ? '' : display}
        className="TYPO-BODY-XS md:TYPO-BODY-S"
      >
        {display}
      </div>
    );
  }
  return (
    <div title={typeof value === 'object' ? '' : value} className="TYPO-BODY-XS md:TYPO-BODY-S">
      {value}
    </div>
  );
}

function EmptyData({ isLoading = false, label, loadingRowsCnt = 4, useNarrow = false }: {
    isLoading?: boolean;
    label?: string | JSX.Element;
    loadingRowsCnt?: number;
    useNarrow?: boolean
}) {
    return (
      <div
        className={`bg-neutral-800 relative flex flex-col p-4 ${useNarrow ? 'rounded-md' : 'rounded-xl'}`}
      >
        {isLoading ? <LoadingRows rowsCnt={loadingRowsCnt} /> : label}
      </div>
    );
}

function cellClass(field: TableField) {
    return `${
        field.responsive && !field.assertThoughResponsive ? 'hidden' : 'flex'
      } grow shrink items-center TYPO-BODY-S !font-medium overflow-hidden md:flex md:TYPO-BODY-M`;
}

function getTRowClassByStatus(status: NotiStatus): string {
  switch (status) {
    case 'success':
      return '!bg-success-light !dark:bg-success-o !border-2 !border-success-o !shadow-md !shadow-success-o';
      break;
    case 'warning':
      return '!bg-warning-light dark:!bg-warning-o !border-2 !border-warning-o !shadow-md !shadow-warning-o';
      break;
    case 'error':
      return '!bg-error-light dark:!bg-error-o !border-2 !border-error-o !shadow-md !shadow-error-o';
      break;
    case 'info':
      return '!bg-info-light dark:!bg-info-o !border-2 !border-info-o !shadow-md !shadow-info-o';
      break;
    default:
      return '';
  }
}

function getFlexAlign(align?: TableFieldAlign) {
  switch (align) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    default:
      return '';
  }
}

export function bignumberToFormat({
  value,
  exponent,
  field,
}: {
  value: BigNumber;
  exponent?: number;
  field: TableFieldBignumber | TableFieldUSD;
}): string {
  const exp = exponent ?? field.toFixedFallback ?? 0;

  let leastVal = '<0.';
  for (let i = 0; i < exp - 1; i += 1) {
    leastVal += '0';
  }
  leastVal += '1';

  return field.type === 'usd'
    ? formatUSDAmount({ value, mantissa: field.toFixedFallback ?? 0 })
    : value.isZero()
    ? '0'
    : value.isLessThan(1 / 10 ** exp)
    ? leastVal
    : value.dp(exp, BigNumber.ROUND_DOWN).toFormat();
}
