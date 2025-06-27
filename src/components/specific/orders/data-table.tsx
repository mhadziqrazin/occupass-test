"use client"

import {
  ColumnDef,
  getCoreRowModel,
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
  pageCount: number
}

export function OrderDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get("page") ?? "1")
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
  const handlePageOnChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", (page).toString())
    router.replace(
      `${window.location.pathname}?${newParams.toString()}`,
      { scroll: false }
    )
  }

  return (
    <div className="w-full">
      <GeneralDataTable isLoading={isLoading} table={table} />
      <div className="flex justify-between py-4">
        <span>
          Page {page} of {pageCount}
        </span>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageOnChange(1)}
            disabled={page <= 1}
          >
            <ChevronFirstIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageOnChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageOnChange(page + 1)}
            disabled={page >= pageCount}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageOnChange(pageCount)}
            disabled={page >= pageCount}
          >
            <ChevronLastIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
