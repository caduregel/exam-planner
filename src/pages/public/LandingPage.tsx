import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import dashboardImageURl from "../../assets/dashboardSS.png"
import examImageURl from "../../assets/examsSS.png"
import tasksImageURl from "../../assets/tasksSS.png"
import calendarImageURl from "../../assets/calendarSS.png"





function LandingPage() {

    return (
        <div className="flex flex-col gap-10 px-10 md:w-[80vw] p-5">
            <div className="md:flex flex-row justify-between py-20">
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl font-semibold">The right way to prepare</h1>
                    <p className="text-xl">Plan. Study. Achieve. With some help from AI.</p>
                    <Button asChild className="text-md md:max-w-fit"><Link to="/signup">Try for free</Link></Button>
                </div>
                <img src="/favicon.svg" alt="logo" className="w-50 h-50 hidden md:inline" />
            </div>
            <Carousel className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-10 rounded-2xl" >
                <CarouselContent>
                    <CarouselItem>
                        <div className="overflow-hidden w-full h-40 sm:h-auto sm:w-auto">
                            <img
                                src={dashboardImageURl}
                                alt="dashboard screenshot"
                                className="rounded-lg w-auto h-full sm:h-auto sm:w-full object-cover object-left-top scale-150 sm:scale-100"
                            />
                        </div>
                    </CarouselItem>

                    <CarouselItem>
                        <div className="overflow-hidden w-full h-40 sm:h-auto sm:w-auto">
                            <img
                                src={examImageURl}
                                alt="exam page screenshot"
                                className="rounded-lg w-auto h-full sm:h-auto sm:w-full object-cover object-left-top scale-150 sm:scale-100"
                            />
                        </div>
                    </CarouselItem>

                    <CarouselItem>
                        <div className="overflow-hidden w-full h-40 sm:h-auto sm:w-auto">
                            <img
                                src={tasksImageURl}
                                alt="tasks page screenshot"
                                className="rounded-lg w-auto h-full sm:h-auto sm:w-full object-cover object-left-top scale-150 sm:scale-100"
                            />
                        </div>
                    </CarouselItem>

                    <CarouselItem>
                        <div className="overflow-hidden w-full h-40 sm:h-auto sm:w-auto">
                            <img
                                src={calendarImageURl}
                                alt="calendar screenshot"
                                className="rounded-lg w-auto h-full sm:h-auto sm:w-full object-cover object-left-top scale-150 sm:scale-100"
                            />
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default LandingPage