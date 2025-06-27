"use client"

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import GeneralDataTable from "@/components/general/data-table"

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
      <GeneralDataTable isLoading={isLoading} table={table} />
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
