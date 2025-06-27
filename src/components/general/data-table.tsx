import { flexRender, Table as ITable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { cn } from "@/lib/utils"

interface DataTableProps<TData> {
  isLoading: boolean
  table: ITable<TData>
}

export function GeneralDataTable<TData>({
  isLoading,
  table,
}: DataTableProps<TData>) {
  return (
    <div className="rounded-md border overflow-clip">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "bg-muted z-10",
                      header.column.getIsPinned() && `sticky ${header.column.getIsPinned()}-0`,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "bg-background",
                      cell.column.getIsPinned() && `sticky ${cell.column.getIsPinned()}-0 flex justify-center`,
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
              <TableRow className="hover:bg-white">
                <TableCell colSpan={9} className="h-24 text-center">
                  {isLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  )
}

export default GeneralDataTable
