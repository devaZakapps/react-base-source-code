import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';
import { cn } from '../../lib/utils';
import React, { useEffect, useState, useRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef as BaseColumnDef,
  RowData,
  ColumnPinningState,
  ExpandedState,
  getExpandedRowModel,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
// Define the custom column definition type
export type CustomColumnDef<TData extends RowData, TValue> = BaseColumnDef<
  TData,
  TValue
> & {
  accessorKey: keyof TData; // or define an accessor function if necessary
  header: string;
  cssClass?: string;
  type?: string;
  cell?: (props: any) => JSX.Element;
  enableSorting?: boolean;
};

// Props for the table component
export interface TanStackTableProps<TData extends Record<string, unknown>> {
  columns: CustomColumnDef<TData, unknown>[];
  data: TData[];
  tableConfigData: TableConfigData;
}

export interface TableConfigData {
  isBorder?: boolean;
  expandRowData?: ExpandRowsDef;
  columnPinningData?: ColumnPinningData;
  sortingData?: SortingData;
  paginationData?: PaginationTableState;
  heightValue?: string;
}

export interface PaginationTableState {
  enablePagination: boolean;
  data: PaginationData;
}

export type PaginationData = {
  pageIndex: number;
  pageSize: number;
  autoResetPageIndex?: boolean; // turn off page index reset when sorting or filtering
};

export interface ExpandRowsDef {
  enableExpand: boolean;
  expandRowsKey: string;
}

export interface ColumnPinningData {
  enablePinning: boolean;
  data: ColumnPinningState;
}

export interface SortingData {
  enableSorting: boolean;
  initialSortingData: SortingState;
  customSortingFunction: (
    updatedSortedData: { id: string; desc: boolean }[]
  ) => void; // Function that takes sorting state
}

const TanStackTable = <TData extends Record<string, unknown>>({
  columns,
  data,
  tableConfigData,
}: TanStackTableProps<TData>) => {
  const [tableBodyData, setTableBodyData] = useState<TData[]>([]);
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    {}
  );
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({});

  useEffect(() => {
    setTableBodyData(data);

    if (tableConfigData.sortingData?.enableSorting) {
      setSorting(tableConfigData.sortingData.initialSortingData);
    }

    if (tableConfigData.columnPinningData?.enablePinning) {
      setColumnPinning({
        left: tableConfigData.columnPinningData?.data?.left?.length
          ? tableConfigData.columnPinningData?.data?.left
          : [], // Check if left has data
        right: tableConfigData.columnPinningData?.data?.right?.length
          ? tableConfigData.columnPinningData?.data?.right
          : [], // Check if right has data
      });
    }

    setExpanded({});

    if (tableConfigData.paginationData?.enablePagination) {
      const paginationData: PaginationData = {
        pageIndex: tableConfigData.paginationData.data.pageIndex,
        pageSize: tableConfigData.paginationData.data.pageSize,
      };
      setPagination(paginationData);
    }
  }, [tableConfigData, data]);

  const table = useReactTable({
    data: tableBodyData,
    columns, // Cast to BaseColumnDef,
    // columns: updatedColumns as BaseColumnDef<TData, unknown>[], // Cast to BaseColumnDef,

    state: {
      ...(tableConfigData.columnPinningData?.enablePinning && {
        columnPinning,
      }), // Conditionally enable column pinning
      ...(tableConfigData.expandRowData?.enableExpand && { expanded }), // Conditionally enable expandRows
      ...(tableConfigData.sortingData?.enableSorting && { sorting }), // Conditionally enable sorting
      ...(tableConfigData.paginationData?.enablePagination && { pagination }), // Conditionally enable pagination
    },

    ...(tableConfigData.sortingData?.enableSorting && {
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
    }), // Conditionally enable sorting

    ...(tableConfigData.expandRowData?.enableExpand && {
      onExpandedChange: setExpanded,
      getSubRows: (row: Record<string, unknown>) =>
        row[tableConfigData.expandRowData?.expandRowsKey as keyof typeof row],
      getExpandedRowModel: getExpandedRowModel(),
    }), // Conditionally enable expandRows

    getCoreRowModel: getCoreRowModel(),

    ...(tableConfigData.columnPinningData?.enablePinning && {
      onColumnPinningChange: setColumnPinning,
    }), // Conditionally enable column pinning

    ...(tableConfigData.paginationData?.enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
    }), // Conditionally enable pagination
  });

  const pinnedLeftColumns = table.getLeftVisibleLeafColumns();
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const calculateOverscan = () => {
      if (parentRef.current) {
        const containerHeight = parentRef.current.clientHeight; // Height of the scrollable area
        const rowHeight = 11; // Replace with your actual row height
        const visibleRows = Math.ceil(containerHeight / rowHeight); // Number of visible rows

        // Calculate overscan based on the number of visible rows
        // You can choose a factor here, e.g., 2 or 3 times the visible rows
        const calculatedOverscan = Math.ceil(visibleRows * 2); // Adjust this multiplier based on your needs

        setOverscan(calculatedOverscan); // Set the calculated overscan dynamically
      }
    };

    calculateOverscan(); // Calculate on mount

    window.addEventListener('resize', calculateOverscan); // Recalculate on resize
    return () => window.removeEventListener('resize', calculateOverscan); // Cleanup
  }, []);
  const [overscan, setOverscan] = useState(0);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 10,
    overscan,
  });

  //access sorting state from the table instance
  return (
    <div className="flex flex-col gap-4 rounded-[4px]">
      <div
        className={`w-full ${tableConfigData.isBorder ? 'rounded-[4px] border' : ''}`}
        ref={parentRef}
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        <Table
          className={`min-w-full border-collapse rounded-[4px]`}
          tableHeight={`${tableConfigData.heightValue ? `${tableConfigData.heightValue}` : '500'}`}
        >
          <TableHeader className="bg-[#2878e8] text-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={`${tableConfigData.isBorder ? '' : 'border-none'}`}
              >
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      'w-28 whitespace-nowrap p-3 text-xs font-semibold',
                      header.column.getIsPinned() ? 'sticky z-10' : 'static',
                      (
                        header.column.columnDef as CustomColumnDef<
                          unknown,
                          unknown
                        >
                      ).cssClass,
                      header.column.getCanSort() ? 'cursor-pointer' : ''
                    )}
                    onClick={() => {
                      if (header.column.getCanSort()) {
                        const isSorted = sorting.find(
                          (sort) => sort.id === header.id
                        );
                        const updatedSortedData = isSorted
                          ? [{ id: header.id, desc: !isSorted.desc }]
                          : [{ id: header.id, desc: false }];
                        setSorting(updatedSortedData);
                        tableConfigData.sortingData?.customSortingFunction(
                          updatedSortedData
                        );
                      }
                    }}
                    style={{
                      left: header.column.getIsPinned()
                        ? `${pinnedLeftColumns.findIndex((col) => col.id === header.column.id) * 100}px`
                        : 'auto',
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <TableRow
                  key={row.id}
                  className={`hover:bg-none transition-colors ${tableConfigData.isBorder ? 'border-b' : 'border-none'} bg-white`}
                // style={{
                //   transform: `translateY(${virtualRow.start}px)`,
                // }}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isMarginColumn = cell.column.id === 'margin';
                    const bgColorClass =
                      isMarginColumn && row.original.marginFlag
                        ? 'bg-red-100 text-red-500'
                        : '';
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'w-28 p-2 text-xs font-normal',
                          cell.column.getIsPinned()
                            ? 'sticky bg-white z-10'
                            : '',
                          (
                            cell.column.columnDef as CustomColumnDef<
                              unknown,
                              unknown
                            >
                          ).cssClass,
                          bgColorClass
                        )}
                        style={{
                          left: cell.column.getIsPinned()
                            ? `${pinnedLeftColumns.findIndex((col) => col.id === cell.column.id) * 100}px`
                            : 'auto',
                          position: cell.column.getIsPinned()
                            ? 'sticky'
                            : 'static',
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* Pagination functionality */}
      {tableConfigData.paginationData?.enablePagination ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 w-full justify-between px-2">
            <div className="flex items-center gap-4">
              <button
                className={`border rounded p-1 ${!table.getCanPreviousPage() ? 'text-gray-500' : ''}`}
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'START'}
              </button>
              <button
                className={`border rounded p-1 ${!table.getCanPreviousPage() ? 'text-gray-500' : ''}`}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'PREVIOUS'}
              </button>
              <button
                className={`border rounded p-1 ${!table.getCanNextPage() ? 'text-gray-500' : ''}`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {'NEXT'}
              </button>
              <button
                className={`border rounded p-1 ${!table.getCanNextPage() ? 'text-gray-500' : ''}`}
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                {'END'}
              </button>
            </div>

            <div className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </div>

            <div className="flex items-center gap-1">
              <span>Go to page:</span>
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                value={pagination.pageIndex + 1}
                className="border p-1 rounded w-16"
              />
            </div>

            <div>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
            {table.getRowCount().toLocaleString()} Rows
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TanStackTable;