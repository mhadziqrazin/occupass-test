import { cn } from "@/lib/utils"
import { ArrowDownZaIcon, ArrowUpAzIcon, ChevronUpIcon, FilterIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface SortButtonProps {
  sortBy: string
  label: string
}

type SortDirection = "asc" | "desc" | ""

let debounce: NodeJS.Timeout // for filter debounce

const SortButton: React.FC<SortButtonProps> = ({ sortBy, label }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const filterParams = searchParams.get(sortBy)
  const [filter, setFilter] = useState(filterParams ?? "")
  const orderBy = searchParams.get("orderBy")?.split(',') ?? []

  // get sort state based on orderBy params
  const getSortState = () => {
    const indexAsc = orderBy.indexOf(sortBy)
    if (indexAsc >= 0) {
      return "asc"
    }
    const indexDesc = orderBy.indexOf(`-${sortBy}`)
    if (indexDesc >= 0) {
      return "desc"
    }
    return ""
  }
  const [sort, setSort] = useState<SortDirection>(getSortState())

  // listens sort change from external source
  useEffect(() => {
    setSort(getSortState())
  }, [orderBy])
  // listens filter change from external source
  useEffect(() => {
    setFilter(filterParams ?? "")
  }, [filterParams])

  const handleClick = (newSort: SortDirection) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", "1") // reset page when sorting applied
    const newPrefix = newSort === "desc" ? "-" : "" // using '-' for descending sort
    const currentPrefix = sort === "desc" ? "-" : ""
    const index = orderBy.indexOf(`${currentPrefix}${sortBy}`)

    // from deactivated state or change to opposite state
    if (!sort || (newSort && newSort !== sort)) {
      setSort(newSort)
      if (index >= 0) {
        orderBy.splice(index, 1)
      }
      orderBy.push(`${newPrefix}${sortBy}`)
    }
    // from activated state and same state, then deactivate
    if (sort && newSort === sort) {
      setSort("")
      if (index >= 0) {
        orderBy.splice(index, 1)
      }
    }

    if (orderBy.length > 0) {
      newParams.set("orderBy", orderBy.join(","))
    } else {
      newParams.delete("orderBy")
    }
    router.replace(
      `${window.location.pathname}?${newParams.toString()}`,
      { scroll: false }
    )
    setIsOpen(false)
  }

  const handleFilterOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilter(value)
    clearTimeout(debounce)
    debounce = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams)
      if (value) {
        newParams.set(sortBy, value)
      } else {
        newParams.delete(sortBy)
      }
      router.replace(
        `${window.location.pathname}?${newParams.toString()}`,
        { scroll: false }
      )
    }, 250)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} onClick={() => setIsOpen((prev) => !prev)} className="group flex items-center gap-2 cursor-pointer">
          {label}
          {sort || filter ? (
            <FilterIcon />
          ) : (
              <ChevronUpIcon
                size={16}
                className={cn(
                  "transition-all group-hover:opacity-100",
                  !isOpen && "rotate-180",
                  !isOpen && "opacity-30",
                )}
              />
            )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort</DropdownMenuLabel>
        <div className="flex gap-1 px-2 py-[6px]">
          <Button
            onClick={() => handleClick("asc")}
            variant={sort === "asc" ? "default" : "ghost"}
            size={"sm"}
            className="font-normal flex-1"
          >
            <ArrowUpAzIcon />
            ASC
          </Button>
          <Button
            onClick={() => handleClick("desc")}
            variant={sort === "desc" ? "default" : "ghost"}
            size={"sm"}
            className="font-normal flex-1"
          >
            <ArrowDownZaIcon />
            DESC
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <div className="px-2 py-[6px]">
          <Input placeholder="Match.." value={filter} onChange={handleFilterOnChange} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortButton
