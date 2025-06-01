import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, CheckCircle, Target, Users, Zap } from "lucide-react"
import { Link } from "react-router"

function AboutPage() {
    return (
        <>
<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section */}
                <div className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-4xl mx-auto px-6 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                About StudyFlows
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                We believe exam preparation shouldn't be stressful. StudyFlows automatically creates personalized study plans, so you can focus on learning instead of planning.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Every student deserves to feel confident and prepared for their exams. We're here to eliminate the guesswork and stress from study planning, giving you more time to actually learn and succeed.
                        </p>
                    </div>

                    {/* How It Works */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">How StudyFlows Works</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Input Your Exam</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Tell us about your exam: title, tasks, date, and how you want your study time distributed.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Automatic Planning</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        Our smart algorithm creates a personalized study schedule that fits your preferences and timeline.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardContent className="pt-6">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3. Follow Your Plan</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        View your tasks in a beautiful calendar, track progress, and let us handle rescheduling when needed.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Students Choose StudyFlows</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Maximum Automation</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">No more manual scheduling. Just input your exam details and we'll handle the rest.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Stress-Free Planning</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Never wonder if you're studying enough or starting too late. We optimize your study timeline.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Visual Organization</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Color-coded exams and intuitive calendar views make it easy to see what's coming up.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <Target className="w-6 h-6 text-blue-500 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Flexible Scheduling</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Choose how to distribute your study time - evenly, front-loaded, or however works best for you.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Users className="w-6 h-6 text-purple-500 dark:text-purple-400 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Built for All Students</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Whether you're in high school, college, or professional studies - StudyFlows adapts to your needs.</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar className="w-6 h-6 text-orange-500 dark:text-orange-400 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Smart Rescheduling</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Life happens. When plans change, we automatically adjust your study schedule to keep you on track.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Study Routine?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Join other students who've discovered the power of automated study planning. Focus on learning, not logistics.
                        </p>
                        <Button className="mt-8 text-lg px-8 py-6 hover:cursor-pointer bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" asChild>
                            <Link to="/signup">
                                Get Started Today
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPage