import {CheckIcon, CopyIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {useState} from "react";


const CopyLinkButton = ({ link , className } : { className?: string , link: string }) => {

    const [justCopied, setJustCopied] = useState(false)

    const handleClick = async () => {

        if (justCopied) return

        await navigator.clipboard.writeText(link)

        setJustCopied(true)

        setTimeout(() => {
            setJustCopied(false)
        }, 1000)
    }

    return (
        <Button
            variant={"secondary"}
            className={"w-max " + className}
            onClick={handleClick}
        >
            {
                justCopied ?
                    <>
                        <span className={"hidden md:block"}>Link copied </span> <CheckIcon/>
                    </>
                    :
                    <>
                        <span className={"hidden md:block"}>Copy Link</span> <CopyIcon/>
                    </>
            }
        </Button>
    )
}

export default CopyLinkButton