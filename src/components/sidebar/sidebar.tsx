import { SidebarContent } from "./sidebar-content"

export const Sidebar = () => {
    return (
        <aside className="hidden md:block w-64 bg-gradient-to-br from-indigo-950 to-purple-950 shadow-md border-r border-purple-500">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-white">Menu</h2>
            </div>
            <nav className="flex flex-col justify-between h-full">
                <SidebarContent />
            </nav>
        </aside>

    )
}
