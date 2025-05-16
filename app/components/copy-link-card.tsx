import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Input} from "~/components/ui/input";
import {CopyLinkCardProps} from "~/index";
import CopyLinkButton from "~/components/copy-link-button";
import ShareLinkButton from "~/components/share-link-button";


const CopyLinkCard = ({link}: CopyLinkCardProps) => {

    return (
        <Card className={"w-full mt-4"}>
            <CardHeader>
                <CardTitle>Nothing here 📪</CardTitle>
                <CardDescription>No one has sent you a nameless note</CardDescription>
            </CardHeader>

            <CardContent className={"flex flex-col gap-4 py-2"}>
                <Input
                    readOnly
                    value={link}
                />
                <div className={"flex items-center gap-4"}>
                    <CopyLinkButton link={link} className={"flex-1"}/>
                    <ShareLinkButton link={link} className={"flex-1"}/>
                </div>
            </CardContent>
        </Card>
    )
}

export default CopyLinkCard