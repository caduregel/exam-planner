import logoURL from "../assets/logo.svg"
import darkLogoUrl from "../assets/logo-dark.svg"

function Logo() {
    return (
        <>
            <img src={logoURL} className="dark:hidden" />
            <img src={darkLogoUrl} className="hidden dark:inline" />
        </>
    )
}

export default Logo