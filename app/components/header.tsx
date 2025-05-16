import {HeaderProps} from "~/index";
import {Switch} from "~/components/ui/switch";
import {useTheme} from "~/components/theme/theme-context";
import {MoonIcon, PaletteIcon, SunIcon} from "lucide-react";
import CopyLinkButton from "~/components/copy-link-button";
import {Button} from "~/components/ui/button";
import ShareLinkButton from "~/components/share-link-button";
import { Link } from "react-router";


const Header = ({user, link}: HeaderProps) => {

    return (
        <header className={"fixed top-0 bg-background/50 backdrop-blur w-full p-4 flex items-center justify-between"}>
            <div className={"flex items-center gap-2 md:gap-4"}>
                <Link to={'/'} className={"cursor-pointer"}>
                    <img src={"/logo.png"} alt={"logo"} className={"size-[30px]"}/>
                </Link>
                {
                    user && link ?
                        <>
                            <h1 className={"font-bold"}>Welcome {user.username}</h1>
                            <CopyLinkButton link={link}/>
                            <ShareLinkButton link={link}/>
                        </>
                        :
                        <h1 className={"font-bold"}>NoNameNote</h1>

                }
            </div>

            <div className={"flex items-center gap-2"}>
                <DarkModeToggle/>
                <ThemeToggle/>
            </div>
        </header>
    )
}

const ThemeToggle = () => {

    return (
        <Button variant={"secondary"} className={"size-[30px] p-0 rounded-full"}>
            <PaletteIcon/>
        </Button>
    )
}

const DarkModeToggle = () => {

    const {isDark, setIsDark} = useTheme()

    return (
        <Switch
            checked={isDark}
            onCheckedChange={setIsDark}
        >
            {isDark ? <MoonIcon size={10}/> : <SunIcon size={10}/>}
        </Switch>
    )
}

export default Header