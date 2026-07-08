import { NavLink } from "react-router-dom";

const menuItems = [
    {label: "Home", path: "/"}, 
    {label: "Popular", path: "/"}, 
    {label: "Explore", path: "/communities"}, 
    {label: "Communities", path: "/communities"}, 
    {label: "Saved", path: "/"},
]; 

function LeftSidebar() {
    return (
        <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
            <div className="sticky space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3 xl:p-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({isActive}) =>
                        `block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium xl:px-4 xl:py-3 ${
                            isActive
                            ? "bg-white text-neutral-950"
                            : "text-neutral-200 hover:bg-white/10"
                        }`
                    }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </aside>
    );
}
export default LeftSidebar;