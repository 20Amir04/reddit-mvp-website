import { useState } from "react";
import {
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const mobileMenuItems = ["Home", "Popular", "Explore", "Communities", "Saved"];                                                         

function Navbar() {
    const [isMenuOpen, SetIsMenuOpen] = useState(false);

    return(
        <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-3 sm:h-16 sm:gap-4 sm:px-4 lg:px-6">
                <button
                    type="button"
                    onClick={() => SetIsMenuOpen((prev) => !prev)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-200 hover:bg-white/10 lg:hidden"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>

                <div className="flex shrink-0 items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white sm:h-9 sm:w-9 sm:text-base">
                        R
                    </div>

                    <span className="hidden text-lg font-bold text-white sm:block lg:text-xl">
                        Reddit MVP
                    </span>
                </div>

                <div className="hidden flex-1 justify-center md:flex">
                    <div className="relative w-full max-w-md lg:max-w-xl">
                        <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                        <input
                            type="text"
                            placeholder="Search Reddit MVP"
                            className="w-full rounded-full border border-white/10 bg-white/10 py-2 pl-11 pr-4 text-sm text-white outline-none placeholder:text-neutral-400 focus:border-orange-500"
                        />
                    </div>
                </div>

                <div className="flex flex-1 justify-end md:hidden">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-200 hover:bg-white/10">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                    <button className="hidden rounded-full px-3 py-2 text-sm font-semibold text-neutral-200 hover:bg-white/10 sm:block lg:px-4">
                        Log In
                    </button>

                    <button className="rounded-full bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-orange-600 sm:px-4 sm:py-2">
                        Sign Up
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t border-white/10 bg-neutral-950 px-3 py-4 lg:hidden">
                    <div className="mx-auto max-w-7xl space-y-4">
                        <div className="relative md:hidden">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                            <input
                                type="text"
                                placeholder="Search Reddit MVP"
                                className="w-full rounded-full border border-white/10 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-neutral-400 focus:border-orange-500"
                            />
                        </div>

                        <nav className="space-y-1">
                            {mobileMenuItems.map((item) => (
                                <button
                                    key={item}
                                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-neutral-200 hover:bg-white/10"
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>

                        <div className="grid grid-cols-2 gap-2 sm:hidden">
                            <button className="rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-neutral-200 hover:bg-white/10">
                                Log In
                            </button>

                            <button className="rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;