import {safeTry} from "~/utils";
import {redirect, useNavigation} from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import {Route} from "./+types/route";
import {LoaderIcon} from "lucide-react";
import CopyLinkCard from "~/components/copy-link-card";
import NotesContainer from "~/components/notes-container";
import NotesQuotaDisplay from "~/components/notes-quota-display";
import Header from "~/components/header";
import {getCurrentUser} from "~/.server/bridges/users.bridge";
import {getNotes} from "~/.server/bridges/notes.bridge";

export async function loader({request}: Route.LoaderArgs) {

    const [success, user] = await safeTry(getCurrentUser(request.headers))

    if (!success) return redirect('/signup', {
        headers: {
            'Set-Cookie': await authCookie.serialize('', {maxAge: 1})
        }
    })

    if (!user.verified) return redirect('/choose-verification-method')

    const [noteSuccess, notes] = await safeTry(getNotes(user.id))

    if (!noteSuccess) return redirect('/error')

    return {user, notes, appUrl: request.url.slice(0, request.url.lastIndexOf('/'))}
}

export default function DashboardPage({loaderData}: Route.ComponentProps) {

    const {user, notes, appUrl} = loaderData

    const {state} = useNavigation()

    const isBusy = state != 'idle'

    const link = appUrl + '/send-note/' + user.id

    return (
        <>
            <Header
                user={user}
                link={link}
            />
            <div className={"size-full flex flex-col items-center justify-center p-2 pt-8"}>

                {
                    isBusy ? <LoaderIcon className={"animate-spin"}/> :

                        <div className={"w-full min-h-full md:w-[600px] pt-8 md:pt-14 flex flex-col gap-4"}>
                            {
                                notes.length < 1 ?
                                    <CopyLinkCard link={link} user={user}/>
                                    :
                                    <>
                                        <NotesQuotaDisplay used={notes.length}/>
                                        <NotesContainer notes={notes}/>
                                    </>
                            }
                        </div>
                }
            </div>
        </>
    )
}