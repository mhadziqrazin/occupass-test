"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
}

export function CustomerDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      columnPinning: {
        right: ['action'],
      },
      pagination: {
        pageIndex: parseInt(searchParams.get("page") ?? "1") - 1 // 0 based
      }
    },
  })

  // update page params on page change
  const handlePageOneChange = (page: number) => {
    if (page >= 1 && page <= table.getPageCount()) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set("page", (page).toString())
      router.replace(
        `${window.location.pathname}?${newParams.toString()}`,
        { scroll: false }
      )
    }
  }

  const handleFirst = () => {
    handlePageOneChange(1) // first page index
    table.firstPage()
  }

  const handlePrev = () => {
    handlePageOneChange(table.getState().pagination.pageIndex) // -1, 0 based
    table.previousPage()
  }

  const handleNext = () => {
    handlePageOneChange(table.getState().pagination.pageIndex + 2) // +1, 0 based
    table.nextPage()
  }

  const handleLast = () => {
    handlePageOneChange(table.getPageCount()) // last page index
    table.lastPage()
  }

  return (
    <div className="w-full">
      <div className="rounded-md border overflow-clip">
        <Table className="min-w-max">
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
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFirst}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronFirstIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLast}
            disabled={!table.getCanNextPage()}
          >
            <ChevronLastIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
