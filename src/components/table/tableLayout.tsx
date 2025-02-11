import React from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';

interface TableLayoutProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  data: TData[];
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableColumnActions?: boolean;
}

const TableLayout = <TData extends Record<string, any>>({
  columns,
  data,
  enablePagination = true,
  enableSorting = true,
  enableColumnActions = true,
}: TableLayoutProps<TData>) => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enablePagination={enablePagination}
      enableSorting={enableSorting}
      enableColumnActions={enableColumnActions}
    />
  );
};

export default TableLayout;
