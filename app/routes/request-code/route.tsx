import { redirect } from "react-router";
import {safeTry} from "~/utils";
import {authCookie} from "~/.server/config/cookies.config";
import { Route } from "./+types/route";
import {getCurrentSession, getCurrentUser} from "~/.server/bridges/users.bridge";
import {sendCode} from "~/.server/bridges/auth.bridge";

export const loader = async ({ request } : Route.LoaderArgs) => {

    const [ sessionSuccess , session ] = await safeTry(getCurrentSession(request.headers))

    const [ userSuccess , user ] = await safeTry(getCurrentUser(request.headers))

    if(!userSuccess || !sessionSuccess || !session || !user) return redirect('/signup' , {
        headers: {
            'Set-Cookie': await authCookie.serialize('' , { maxAge: 1 })
        }
    })

    const [ success , updatedSession ] = await safeTry(sendCode(session , user.email))

    if(!success) return redirect('/error')

    return redirect('/enter-code' , {
        headers: { 'Set-Cookie': await authCookie.serialize(updatedSession)}
    })
}