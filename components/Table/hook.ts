import { useMemo } from 'react';
import { RadioOption } from '../RadioGroup';
import { TableProps, TableRow } from './types';

type MatchedListParams<T extends TableRow> = Pick<TableProps<T>, 'list'> & {
  searchKeyword: string;
  sortBy?: string;
  objSortValue?: string;
  isSortASC: boolean;
  filterOption: RadioOption;
};

export function useMatchedTable<T extends TableRow>({
  list,
  searchKeyword,
  sortBy,
  objSortValue,
  isSortASC,
  filterOption,
}: MatchedListParams<T>) {
  return useMemo(() => {
    // filtering
    const filteredList =
      filterOption.value === 'all'
        ? list
        : list.filter((item) => item.filter?.includes(filterOption.value));

    // searching
    const searchedList = filteredList.filter((item) =>
      Object.values(item).toString().toUpperCase().includes(searchKeyword.toUpperCase()));

    // sorting
    return sortBy
      ? searchedList.sort((a, b) => {
          if (typeof a[sortBy] === 'object' && objSortValue) {
            return isSortASC
              ? a[sortBy][objSortValue] - b[sortBy][objSortValue]
              : b[sortBy][objSortValue] - a[sortBy][objSortValue];
          }
          return isSortASC ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        })
      : searchedList;
  }, [list, searchKeyword, sortBy, objSortValue, isSortASC, filterOption]);
}
