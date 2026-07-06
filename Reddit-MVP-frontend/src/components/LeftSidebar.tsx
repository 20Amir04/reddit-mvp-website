const menuItems = ["Home", "Popular", "Explore", "Communities", "Saved"];

function LeftSidebar() {
    return (
        <aside className="hidden w-56 shrink-0 lg:block xl:w-64">
            <div className="sticky space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3 xl:p-4">
                {menuItems.map((item) => (
                    <button
                        key={item}
                        className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-neutral-200 hover:bg-white/10 xl:px-4 xl:py-3"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </aside>
    );
}
export default LeftSidebar;