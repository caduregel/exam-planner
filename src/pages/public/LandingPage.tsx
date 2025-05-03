import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function LandingPage() {
    return (
        <div className="flex flex-col gap-10 px-10 md:w-[80vw]">
            <div className="md:flex flex-row justify-between">
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl font-semibold">The right way to prepare</h1>
                    <p className="text-xl">Plan. Study. Achieve. With some help from AI.</p>
                    <Button asChild className="text-md md:max-w-fit"><Link to="/signup">Try for free</Link></Button>
                    </div>
                <img src="/favicon.svg" alt="logo" className="w-50 h-50 hidden md:inline" />
            </div>
        </div>
    )
}

export default LandingPage