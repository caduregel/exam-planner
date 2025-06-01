import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"

function PricingPage() {
    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-4">Pricing</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Studyflows is currently free while we're building out core features.
                        If you sign up now, you'll receive a lifetime discount on all premium features we launch in the future.
                    </p>
                </div>

                <Card className="shadow-xl border border-muted rounded-2xl">
                    <CardHeader className="bg-muted/50 rounded-t-2xl py-6">
                        <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
                            <Badge variant="outline">Beta Offer</Badge>
                            <span>Free While in Beta</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-10">
                        <div className="text-5xl font-bold mb-2">€0</div>
                        <div className="text-muted-foreground mb-6">Free access while in beta</div>

                        <ul className="space-y-4 text-left max-w-md mx-auto">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                Plan unlimited exams
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                Automatic task scheduling
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                Calendar and dashboard views
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                Early supporter discount on future premium features
                            </li>
                        </ul>

                        <Button className="mt-8 text-lg px-8 py-6 hover:cursor-pointer" asChild>
                            <Link to="/signup">
                                Sign up for free
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <div className="mt-12 text-sm text-muted-foreground max-w-xl mx-auto">
                    <p>
                        We’re working on advanced features like smart rescheduling, revision insights, and adaptive planning.
                        Signing up now not only gives you full access for free during beta, but also ensures a discounted rate when we launch paid plans.
                    </p>
                </div>
            </div>
        </>
    )
}

export default PricingPage