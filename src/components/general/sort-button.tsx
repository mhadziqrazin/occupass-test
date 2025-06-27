import { cn } from "@/lib/utils"
import { ArrowDownZaIcon, ArrowUpAzIcon, ChevronUpIcon, FilterIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

interface SortButtonProps {
  sortBy: string
  label: string
}

type SortDirection = "asc" | "desc" | ""

const SortButton: React.FC<SortButtonProps> = ({ sortBy, label }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const orderBy = searchParams.get("orderBy")?.split(',') ?? []
  const [sort, setSort] = useState<SortDirection>(() => {
    // determines the initial state based on search params
    const indexAsc = orderBy.indexOf(sortBy)
    if (indexAsc >= 0) {
      return "asc"
    }
    const indexDesc = orderBy.indexOf(`-${sortBy}`)
    if (indexDesc >= 0) {
      return "desc"
    }
    return ""
  })

  const handleClick = (newSort: SortDirection) => {
    const newParams = new URLSearchParams(searchParams.toString())
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

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} onClick={() => setIsOpen((prev) => !prev)} className="group flex items-center gap-2 cursor-pointer">
          {label}
          {sort ? (
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
        <div className="flex gap-1">
          <Button
            onClick={() => handleClick("asc")}
            variant={sort === "asc" ? "default" : "ghost"}
            size={"sm"}
            className="font-normal"
          >
            <ArrowUpAzIcon />
            ASC
          </Button>
          <Button
            onClick={() => handleClick("desc")}
            variant={sort === "desc" ? "default" : "ghost"}
            size={"sm"}
            className="font-normal"
          >
            <ArrowDownZaIcon />
            DESC
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortButton
