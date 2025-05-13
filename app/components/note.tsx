import {Card, CardContent, CardDescription, CardHeader} from "~/components/ui/card";
import {NoteComponentProps} from "~/index";


const Note = ({ note } : NoteComponentProps) => {

    return (
        <Card className={"w-full"}>
            <CardHeader>
                <CardDescription>{note.text}</CardDescription>
            </CardHeader>
            <CardContent>
                <span className={"block text-right"}>{(new Date(note.createdAt)).toISOString()}</span>
            </CardContent>
        </Card>
    )
}

export default Note