import React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useLocation } from "react-router"

export const DynamicBreadCrumbs: React.FC = () => {
    const location = useLocation()
    const { pathname } = location

    // Split the pathname into segments and filter out empty ones
    const pathSegments = pathname.split("/").filter(Boolean)

    // Build cumulative paths like /home, /home/exams, /home/exams/123
    const cumulativePaths = pathSegments.map((_, index) => {
        return `/${pathSegments.slice(0, index + 1).join("/")}`
    })

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {cumulativePaths.map((path, index) => {
                    const isLast = index === cumulativePaths.length - 1
                    const segment = decodeURIComponent(pathSegments[index])

                    return (
                        <React.Fragment key={path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={path}>
                                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}