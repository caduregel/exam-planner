import { ProfilePageSkeleton } from "@/components/skeletons/ProfilePageSkeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"
import { getUserProfile } from "@/util/api/Get/GetUserProfiles"
import { addProfilePicture, updateUserProfile } from "@/util/api/Put/PutUserProfiles"
import { Label } from "@radix-ui/react-dropdown-menu"
import { CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import useSWR, { mutate } from "swr"

function ProfilePage() {
    // const { profile, loading, setProfile } = useProfile()
    const { data: profile, isLoading } = useSWR("profile", () => getUserProfile())

    const fileInputRef = useRef<HTMLInputElement>(null)

    const [newUsername, setNewUsername] = useState("")
    const [nameUpdateSucces, setNameUpdateSucces] = useState<boolean>(false)
    const [avatarKey, setAvatarKey] = useState(0) // Used to force image refresh

    useEffect(() => {
        if (profile) { setNewUsername(profile.username) }
    }, [profile])

    useEffect(() => {
        if (nameUpdateSucces) {
            const timer = setTimeout(() => {
                setNameUpdateSucces(false);
            }, 3000); // Hide alert after 3 seconds
            return () => clearTimeout(timer); // Clean up the timer on unmount or state change
        }
    }, [nameUpdateSucces]);

    const handleFileClick = () => {
        fileInputRef.current?.click()
    }

    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            try {
                const image = event.target.files[0]
                const { data: { user }, error: userError } = await supabase.auth.getUser();
                
                if (userError || !user) throw new Error('User not authenticated');
                await addProfilePicture(image, user.id);
                
                const { data } = await supabase.storage
                .from('avatars')
                .getPublicUrl(`${user.id}/avatar`);
                
                // Add a cache-busting query param to force image refresh
                const avatarURL = `${data.publicUrl}?t=${Date.now()}`;
                
                await updateUserProfile({ username: profile?.username, avatar_url: avatarURL });
                
                mutate("profile");
                setAvatarKey(prev => prev + 1); // Force image re-render
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSave = () => {
        try {
            updateUserProfile({ username: newUsername, avatar_url: profile?.avatar_url })
        } catch (error) {
            console.log("Failed to update username")
        } finally {
            setNameUpdateSucces(true)
        }
    }

    if (isLoading) return <ProfilePageSkeleton />

    if (!profile) return <h1 className="p-5 text-2xl">No profile found</h1>

    // Add cache-busting param to avatar_url to force refresh
    const avatarUrlWithCacheBust = profile?.avatar_url
        ? `${profile.avatar_url}${profile.avatar_url.includes('?') ? '&' : '?'}cb=${avatarKey}`
        : "https://cobrosgueehmzppfqlkp.supabase.co/storage/v1/object/public/avatars//placeholderProfilePic.jpg";

    return (
        <>
            <div className="flex flex-col md:items-start gap-5 items-center p-5" >
                <h1 className="text-4xl">Profile Settings</h1>
                <div className="flex flex-col md:flex-row w-full gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center flex-col gap-5">
                            <img
                                key={avatarKey}
                                src={avatarUrlWithCacheBust}
                                className="size-40 rounded-full"
                                alt="Profile"
                            />
                            <p>JPG or PNG no larger than 5 MB</p>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Input ref={fileInputRef} type="file" onChange={onFileChange} placeholder="Upload new image" accept="image/png, image/jpeg" className="hidden" />
                            <Button variant={"outline"} onClick={handleFileClick} className="hover:cursor-pointer">Upload New Image</Button>
                        </CardFooter>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Account details</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <Label>Username {"(how you will appear on the site)"} </Label>
                            <Input type="text" placeholder="username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-2">
                            {
                                profile?.username == newUsername
                                    ? < Button disabled>Save</Button>
                                    : < Button onClick={handleSave} className="hover:cursor-pointer">Save</Button>
                            }
                        </CardFooter>
                    </Card>
                </div>
                {nameUpdateSucces && (
                    <Alert className="fixed bottom-5 max-w-fit right-4 bg-green-500/20 dark:bg-green-500/30 border-green-500 dark:border-green-400 text-green-700 dark:text-green-300 transition-opacity opacity-100 duration-300 ease-in-out">
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-300" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription className="text-green">
                            Your name has been successfully updated!
                        </AlertDescription>
                    </Alert>
                )}
            </div >
        </>
    )
}

export default ProfilePage
