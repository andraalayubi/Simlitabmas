import React from "react";
import { MantineReactTable, MRT_ColumnDef, MRT_Row, MRT_TableInstance } from "mantine-react-table";

export interface TableLayoutProps<TData extends Record<string, any>> {
  columns: MRT_ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableColumnActions?: boolean;
  enableRowClick?: boolean;
  enableExpanding?: boolean;
  enableExpandAll?: boolean;
  renderDetailPanel?: (props: {
    row: MRT_Row<TData>;
    table: MRT_TableInstance<TData>;
  }) => React.ReactNode;
  getRowClickUrl?: (row: TData) => string;
}

const TableLayout = <TData extends Record<string, any>>({
  columns,
  data,
  isLoading = true,
  enablePagination = true,
  enableSorting = true,
  enableColumnActions = true,
  enableRowClick = false,
  enableExpanding = false,
  enableExpandAll = false,
  renderDetailPanel,
  getRowClickUrl,
}: TableLayoutProps<TData> & {
  enableRowClick?: boolean;
  getRowClickUrl?: (row: TData) => string;
}) => {
  return (
    <MantineReactTable
      columns={columns}
      data={data}
      enablePagination={enablePagination}
      enableSorting={enableSorting}
      enableColumnActions={enableColumnActions}
      enableExpanding={enableExpanding}
      enableExpandAll={enableExpandAll}
      renderDetailPanel={renderDetailPanel}
      mantineTableHeadCellProps={{ style: { backgroundColor: "#f5f5f5" } }}
      initialState={{ showGlobalFilter: true }}
      state={{ showSkeletons: isLoading }}
      defaultColumn={{ grow: true, minSize: 100, maxSize: 1000 }}
      mantineTableBodyRowProps={({ row }) =>
        enableRowClick && getRowClickUrl
          ? {
              onClick: () => {
                const url = getRowClickUrl(row.original);
                if (url) {
                  window.location.href = url;
                }
              },
              style: { cursor: "pointer" },
            }
          : {}
      }
    />
  );
};

export default TableLayout;
