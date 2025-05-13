import {Route} from "./+types/route";
import {safeTry} from "~/utils";
import {generateLink, getCurrentUser} from "~/.server";
import {redirect} from "react-router";

export async function loader({ request }: Route.LoaderArgs) {

    const [ success , user ] = await safeTry(getCurrentUser(request.headers))

    if(!success || !user) return redirect('/signin')

    const [  ] = await safeTry(generateLink())

    return {}
}

export default function GenerateLinkPage({loaderData}: Route.ComponentProps) {

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>

        </div>
    )
}