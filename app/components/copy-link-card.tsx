import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";
import {CheckIcon, CopyIcon, Link2Icon} from "lucide-react";
import {Input} from "~/components/ui/input";
import {CopyLinkCardProps} from "~/index";
import {useState} from "react";


const CopyLinkCard = ({noLink , appUrl, user}: CopyLinkCardProps) => {

    const link = appUrl + '/message/' + user.id

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
        <Card className={"w-full mt-4"}>
            {
                noLink &&
                <CardHeader>
                    <CardTitle>Nothing here 📪</CardTitle>
                    <CardDescription>No one has sent you a nameless note</CardDescription>
                </CardHeader>
            }
            <CardContent className={"flex flex-col gap-4 py-2"}>
                <Input
                    readOnly
                    value={link}
                />
                <Button
                    variant={"secondary"}
                    className={"w-full"}
                    onClick={handleClick}
                >
                    {
                        justCopied ?
                            <>
                                Link copied <CheckIcon/>
                            </>
                            :
                            <>
                                Copy Link <CopyIcon/>
                            </>
                    }
                </Button>
            </CardContent>
        </Card>
    )
}

export default CopyLinkCard