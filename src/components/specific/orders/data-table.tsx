"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  onPageChange(newPage: number): void
  hasMore: boolean
  isLoading: boolean
}

export function OrderDataTable<TData, TValue>({
  columns,
  data,
  page,
  onPageChange,
  hasMore,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        right: ['action'],
      },
    },
  })

  // update page params on page change
  const handlePageOneChange = (page: number) => {
    if (hasMore) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set("page", (page).toString())
      router.replace(
        `${window.location.pathname}?${newParams.toString()}`,
        { scroll: false }
      )
    }
  }

  const handlePrev = () => {
    const newValue = page - 1
    handlePageOneChange(newValue) // -1 based 0
    onPageChange(newValue)
  }

  const handleNext = () => {
    const newValue = page + 1
    handlePageOneChange(newValue) // +1 based 0
    onPageChange(newValue)
  }


  return (
    <div>
      <div className="rounded-md border">
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
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {isLoading ? "Loading..." : "No results."}
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between py-4">
        <span>
          Page {page}
        </span>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={page <= 1}
          >
            {'<'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={!hasMore}
          >
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  )
}
