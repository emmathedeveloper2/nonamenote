import {Link} from "react-router";
import {safeTry} from "~/utils";
import {Route} from "./+types/_index";
import {Button} from "~/components/ui/button";
import Header from "~/components/header";
import {getCurrentUser} from "~/.server/bridges/users.bridge";
import {ArrowRightIcon} from "lucide-react";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "NoNameNotes"},
        {name: "description", content: "No names. No pressure. Just pure thoughts."},
        {property: "og:url", content: "https://nonamenote.vercel.app/"},
        {property: "og:type", content: "website"},
        {property: "og:title", content: "NoNameNotes"},
        {property: "og:description", content: "No names. No pressure. Just pure thoughts."},
        {property: "og:image", content: "https://nonamenote.vercel.app/opengraph.png"},
        {property: "twitter:card", content: "summary_large_image"},
        {property: "twitter:title", content: "NoNameNotes"},
        {property: "twitter:description", content: "No names. No pressure. Just pure thoughts."},
        {property: "twitter:image", content: "https://nonamenote.vercel.app/opengraph.png"},
        {property: "twitter:site", content: "@emmathedev"},
    ];
}


export async function loader({request}: Route.LoaderArgs) {

    const [success, user] = await safeTry(getCurrentUser(request.headers))

    if (!success) return {}

    return {
        user
    }
}

export default function Index({loaderData}: Route.ComponentProps) {

    const {user} = loaderData

    return (
        <>
            <Header/>
            <div className={"size-full flex flex-col items-center justify-center p-2"}>
                <div className={"w-full max-w-[1200px] flex flex-col gap-8"}>

                    <h1 className={"text-xl md:text-5xl lg:text-7xl font-bold"}>No names. No pressure. Just pure
                        thoughts.</h1>

                    <ul className={"flex flex-col gap-2 list-disc px-6"}>
                        <li>😶 Spill the tea, stay incognito.</li>
                        <li>💬 Share and receive messages without identities.</li>
                    </ul>

                    <Button asChild className={"w-full md:w-[300px] group gap-4"}>
                        <Link to={user ? '/dashboard' : '/signup'}>
                            <ArrowRightIcon className={"rotate-45 group-hover:rotate-0 transition-transform"}/>
                            {user ? "DASHBOARD" : "GET STARTED"}
                        </Link>
                    </Button>

                    <p className={"mt-4 md:mt-8"}>
                        Made with 💖
                        <Button variant={"link"} className={"p-0 inline"}>
                            <Link to={'https://emmathedev.vercel.app'}>
                                emmathedeveloper
                            </Link>
                        </Button>
                    </p>
                </div>
            </div>
        </>
    );
}
