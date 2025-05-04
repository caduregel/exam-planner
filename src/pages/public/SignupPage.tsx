import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeClosed } from "lucide-react"
// import { FaGoogle, FaApple } from "react-icons/fa"
import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"
import { useNavigate } from "react-router"

async function handleSignup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Signup error:', error.message)
        throw error
    } else {
        console.log('Signup success:', data)
        return data
    }
}

function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repPassword, setRepPassword] = useState("")
    const [username, setUsername]= useState("")
    const [errors, setErrors] = useState<string[]>([])

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const validateInputs = (): boolean => {
        const newErrors: string[] = []
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) {
            newErrors.push("Invalid email")
        }
        if (password.length < 8) {
            newErrors.push("Password must be at least 8 characters long")
        }
        if (password !== repPassword) {
            newErrors.push("Passwords do not match")
        }
        
        if (username.length === 0){
            newErrors.push("Please enter a username")
        }

        setErrors(newErrors)
        return newErrors.length === 0
    }

    const signUpWithEmail = async () => {
        if (!validateInputs()) {
            return
        }
        try {
            const data = await handleSignup(email, password)
            if (data.user) {
                await supabase.from('profiles').insert({
                    id: data.user.id,
                    username: username, // from signup form
                    avatar_url: "",
                });
            }
            console.log("success!")
            navigate("/home")
        } catch (e) {
            if (e instanceof Error) setErrors([`Signup failed: ${e.message || e}`])
        }
    }

    return (
        <div className="flex flex-col gap-5 items-center px-5">
            <h1 className="text-2xl font-semibold">Create an account</h1>
            <p className="text-stone-700">Enter the following fields to create your account</p>

            <div className="w-full flex flex-col">
                <Label className="text-md">Email*</Label>
                <Input
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="w-full flex flex-col">
                <Label className="text-md">Username*</Label>
                <Input
                    placeholder="E.g. supercoolbob"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="w-full flex flex-col">
                <Label className="text-md">Password*</Label>
                <div className="flex gap-2">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                </div>
            </div>

            <div className="w-full flex flex-col">
                <Label className="text-md">Repeat Password*</Label>
                <div className="flex gap-2">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder=""
                        value={repPassword}
                        onChange={(e) => setRepPassword(e.target.value)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                </div>
            </div>

            {errors.length > 0 && (
                <div className="w-full bg-red-100 text-red-700 p-2 rounded">
                    {errors.map((err, idx) => (
                        <div key={idx}>{err}</div>
                    ))}
                </div>
            )}

            <Button className="w-full hover:cursor-pointer" onClick={signUpWithEmail}>
                Sign up with email
            </Button>
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
                <Button className="w-full hover:cursor-pointer" variant="outline" onClick={signUpWithApple}>
                    <FaApple /> Apple
                </Button>
                <Button className="w-full hover:cursor-pointer" variant="outline" onClick={signUpWithEmail}>
                    <FaGoogle /> Google
                </Button>
            </div>*/}
        </div>
    )
}

export default SignupPage