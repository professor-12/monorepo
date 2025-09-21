import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { CornerRightUp } from "lucide-react"
import { MoveUp } from "lucide-react"
import ChatBotUI from "./Chat"
import { Bot } from "lucide-react"

const AI = () => {
      return (
            <Sheet className="z-[999999]">
                  <SheetTrigger>
                        <div className={`aspect-square  flex items-center justify-center bg-[#E7E7E9] !text-black cursor-pointer rounded-[0.6rem] text-center border-b last:border-none border-border`}>
                              <span className='text-lg'><Bot /></span>
                        </div>
                  </SheetTrigger>
                  <SheetContent className="w-full max-w-[800px] m-1 rounded-xl flex flex-col sm:w-[700px]">
                        <SheetHeader>
                              <SheetTitle>Campus Connect Assistant</SheetTitle>
                        </SheetHeader>

                        <ChatBotUI />
                  </SheetContent>
            </Sheet>
      )
}

export default AI