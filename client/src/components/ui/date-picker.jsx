import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover"

export function Calendar24() {
      const [open, setOpen] = React.useState(false)
      const [date, setDate] = React.useState(undefined)

      return (
            <div className="flex items-center gap-4">
                  <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger className="" asChild>
                              <Button
                                    variant="outline"
                                    id="date-picker"
                                    className="w-32 justify-between font-normal"
                              >
                                    {date ? date.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                              </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0 z-[9999999]" align="start">
                              <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                          setDate(date)
                                          setOpen(false)
                                    }}
                              />
                        </PopoverContent>
                  </Popover>
                  <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        defaultValue="10:30:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />

            </div>
      )
}
