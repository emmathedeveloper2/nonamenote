import {Card, CardContent, CardDescription, CardHeader} from "~/components/ui/card";
import {NoteComponentProps} from "~/index";
import { formatDate } from "~/lib";
import {Button} from "~/components/ui/button";
import {LoaderIcon, TrashIcon} from "lucide-react";
import {useFetcher} from "react-router";


const Note = ({ note } : NoteComponentProps) => {

    const fetcher = useFetcher()

    const isBusy = fetcher.state != "idle"

    return (
        <Card className={"w-full"}>
            <div className={"w-full flex items-center justify-end p-2"}>
                <fetcher.Form action={`/delete-note/${note.id}`} method={'POST'}>
                    <Button disabled={isBusy} variant={"ghost"}>
                        {isBusy ? <LoaderIcon className={"animate-spin"}/> : <TrashIcon />}
                    </Button>
                </fetcher.Form>
            </div>
            <CardHeader>
                <CardDescription>{note.text}</CardDescription>
            </CardHeader>
            <CardContent>
                <span className={"block text-right text-sm"}>{formatDate(new Date(note.createdAt))}</span>
            </CardContent>
        </Card>
    )
}

export default Note