import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

export function ProfilePageSkeleton() {
    return (
        <>
            <div className="flex flex-col md:items-start gap-5 items-center p-5 w-full"  >
                <h1 className="text-4xl">Profile Settings</h1>
                <div className="flex w-full gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center flex-col gap-5">
                            <Skeleton className="size-40 rounded-full"></Skeleton>
                            <p>JPG or PNG no larger than 5 MB</p>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button disabled>Upload New Image</Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Account details</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <Label>Username {"(how you will appear on the site)"} </Label>
                            <Skeleton className="w-full h-10" />
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2">
                            < Button disabled>Save</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div >
        </>
    )
}