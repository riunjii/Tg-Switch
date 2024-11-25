import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, RefreshCw } from "lucide-react"
import { Button } from "./ui/button"
import { SidebarContent } from "./sidebar/sidebar-content"

export const Header = () => {
    return (
        <header className="bg-gradient-to-br to-purple-950 from-indigo-950  shadow-sm border-b border-purple-500">
            <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden mr-2">
                                <Menu size={200} className="text-white" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="max-w-[300px] sm:w-[400px] bg-gradient-to-br to-purple-950 from-indigo-950 ">
                            <div className="py-4">
                                <h2 className="text-xl font-semibold text-gray-200 mb-4">Menu</h2>
                                <SidebarContent />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <RefreshCw className="h-8 w-8 text-indigo-600 mr-2" />
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-200">Switch</h1>
                </div>
                <div className="text-gray-200 text-sm sm:text-base max-sm:hidden">
                    {new Date().toLocaleDateString('pt-br', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>
        </header>
    )
}
