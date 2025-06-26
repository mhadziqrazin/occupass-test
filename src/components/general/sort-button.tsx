import { cn } from "@/lib/utils"
import { ChevronUpIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

interface SortButtonProps {
  sortBy: string
  label: string
}

const SortButton: React.FC<SortButtonProps> = ({ sortBy, label }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  // determines whether sort is active
  const orderBy = searchParams.get("OrderBy")
  const orderByDesc = searchParams.get("OrderByDesc")
  const isOrdered = useMemo(() => {
    return orderBy === sortBy || orderByDesc === sortBy
  }, [orderBy, orderByDesc])

  const [isAsc, setIsAsc] = useState(!!orderBy) // initial based on search params

  const handleClick = () => {
    const newParams = new URLSearchParams(searchParams.toString())

    // set parameter by the ascending state
    if (isAsc) {
      setIsAsc(false)
      newParams.set("OrderByDesc", sortBy)
      newParams.delete("OrderBy")
    } else {
      setIsAsc(true)
      newParams.set("OrderBy", sortBy)
      newParams.delete("OrderByDesc")
    }

    router.replace(
      `${window.location.pathname}?${newParams.toString()}`,
      { scroll: false }
    )
  }

  return (
    <button onClick={handleClick} className="flex items-center gap-2 cursor-pointer">
      {label}
      <ChevronUpIcon
        size={16}
        className={cn(
          "transition-transform",
          !isAsc && "rotate-180",
          !isOrdered && "opacity-30",
        )}
      />
    </button>
  )
}

export default SortButton
