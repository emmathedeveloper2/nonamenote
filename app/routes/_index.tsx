import { Link } from "react-router";
import {getCurrentUser} from "~/.server";
import {safeTry} from "~/utils";
import { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NoNameNotes" },
    { name: "description", content: "No names. No pressure. Just pure thoughts." },
    { property: "og:url", content: "https://nonamenote.vercel.app" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "NoNameNotes" },
    { property: "og:description", content: "No names. No pressure. Just pure thoughts." },
    { property: "og:image", content: "https://nonamenote.vercel.app/opengraph.png" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: "NoNameNotes" },
    { property: "twitter:description", content: "No names. No pressure. Just pure thoughts." },
    { property: "twitter:image", content: "https://nonamenote.vercel.app/opengraph.png" },
    { property: "twitter:site", content: "@emmathedev" },
  ];
}


export async function loader({ request } : Route.LoaderArgs){

  const [success , user] = await safeTry(getCurrentUser(request.headers))

  if(!success) return {}

  return {
    user
  }
}

export default function Index({ loaderData } : Route.ComponentProps) {

  const { user } = loaderData

  return (
    <div className={"size-full flex flex-col items-center justify-center p-2"}>
        <div className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>

          <h1 className={"text-xl md:text-5xl font-black"}>MixStack 🧃</h1>

          <Link to={user ? '/dashboard' : '/signup'} className={"bg-black text-white dark:bg-white dark:text-black p-2 w-full text-center"}>
            {user ? "DASHBOARD" : "GET STARTED"}
          </Link>
        </div>
    </div>
  );
}
