import { Link } from "react-router"
import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

function PublicNav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 p-4 flex gap-2 flex-col items-center md:flex-row md:justify-between bg-background transition-shadow ${scrolled && "shadow-md"}`}>
            <div className="hidden md:flex gap-5 items-center">
                <Button variant="ghost" asChild className="text-md"><Link to="/">home</Link></Button>
                <Button variant="ghost" asChild className="text-md"><Link to="/about" >about</Link></Button>
                <Button variant="ghost" asChild className="text-md"><Link to="/pricing" >pricing</Link></Button>
            </div>
            <div className="hidden md:flex gap-2">
                <Button variant="ghost" asChild className="text-md"><Link to="/login">Log in</Link></Button>
                <Button asChild className="text-md"><Link to="/signup">Try for free</Link></Button>
                <ThemeSwitcher />
            </div>
            <div className="flex justify-between items-center w-full md:hidden">
                <p className="font-semibold">
                    Exam Planner
                </p>
                <div className="flex items-center gap-3">
                    <ThemeSwitcher />
                    {open ?
                        <>
                            <X onClick={() => { setOpen(false) }} className="hover:cursor-pointer" />
                        </> : <Menu className="hover:cursor-pointer" onClick={() => { setOpen(true) }} />
                    }
                </div>
            </div>
            {open && <div className="md:hidden flex flex-col gap-2 p-2">
                <Button variant="ghost" asChild className="text-md"><Link to="/">home</Link></Button>
                <Button variant="ghost" asChild className="text-md"><Link to="/about" >about</Link></Button>
                <Button variant="ghost" asChild className="text-md"><Link to="/pricing" >pricing</Link></Button>
                <Button variant="ghost" asChild className="text-md"><Link to="/login">Log in</Link></Button>
                <Button asChild className="text-md"><Link to="/signup">Try for free</Link></Button>
            </div>
            }
        </nav>
    )
}

export default PublicNav