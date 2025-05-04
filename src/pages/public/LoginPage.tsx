import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"
// import { FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react"
import { supabase } from "../../lib/supabaseClient";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "@/components/providers/AuthProvider"

async function handleLogin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        console.error('Login error:', error.message);
        throw error
    } else {
        console.log('Login success:', data);
        return data
    }
}

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();

    const handleShowPassword = () => {
        showPassword ? setShowPassword(false) : setShowPassword(true)
    }

    const signInWithEmail = () => {
        handleLogin(email, password).then(() => {
            console.log("success!")
            navigate("/home/dashboard")
        }).catch((e) => {
            console.log(e)
        })
    }

    const { session } = useAuth()

    if (session) return <Navigate to={"/home"} />

    return (
        <div className="flex flex-col gap-5 items-center px-5">
            <h1 className="text-2xl font-semibold">Welcome back, ready to study?</h1>
            <div className="w-full flex flex-col">
                <Label className="text-md">Email*</Label>
                <Input placeholder="name@example.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>

            <div className="w-full flex flex-col">

                <Label className="text-md">Password*</Label>
                <div className="flex gap-2">
                    <Input type={showPassword ? "text" : "password"} placeholder="" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <Button variant="ghost" size="icon" onClick={handleShowPassword}>
                        {
                            showPassword ? <EyeClosed /> : <Eye />
                        }
                    </Button>
                </div>
            </div>

            <Button className="w-full hover:cursor-pointer" onClick={signInWithEmail}>Log in with email</Button>
            {/*
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="flex flex-col w-full justify-center gap-2">
                <Button className="w-full hover:cursor-pointer" variant="outline"><FaApple /> Apple</Button>
                <Button className="w-full hover:cursor-pointer" variant="outline"><FaGoogle /> Google</Button>
            </div>*/}
        </div>
    )
}

export default LoginPage