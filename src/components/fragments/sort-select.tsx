import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export default function SortSelect() {
  return (
    <div className="flex items-center gap-4 pl-2">
      <span className="text-sm">Sort by</span>
      <Select defaultValue="latest">
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="popular">Popular</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm">
        <Calendar className="mr-2 h-4 w-4" />
        Today
      </Button>
    </div>

  )
}