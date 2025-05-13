import {NotesContainerProps} from "~/index";
import Note from "~/components/note";


const NotesContainer = ({ notes } : NotesContainerProps) => {

    return (
        <div className={"w-full flex flex-col gap-4"}>
            {notes.map(note => <Note key={note.id} note={note}/>)}
        </div>
    )
}

export default NotesContainer