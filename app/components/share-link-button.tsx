import {Share2Icon} from "lucide-react";
import {Button} from "~/components/ui/button";


const ShareLinkButton = ({link, className}: { className?: string, link: string }) => {

    const handleClick = async () => {

        await navigator.share({title: 'NoNameNote', text: 'Send me an anonymous message', url: link})
    }

    return (
        <Button
            variant={"secondary"}
            className={"w-max " + className}
            onClick={handleClick}
        >
            <span className={"hidden md:block"}>Share Link</span> <Share2Icon />
        </Button>
    )
}

export default ShareLinkButton