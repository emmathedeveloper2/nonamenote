import { Link, useNavigation } from "react-router";
import {AsteriskSquareIcon, ChevronRightIcon, Link2Icon, LoaderIcon} from "lucide-react";
import {safeTry} from "~/utils";
import {getCurrentSession, getCurrentUser} from "~/.server/utils";
import { redirect } from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import { Route } from "./+types/route";
import {Button} from "~/components/ui/button";

export async function loader({request}: Route.LoaderArgs) {
    const [sessionSuccess, session] = await safeTry(getCurrentSession(request.headers))

    const [userSuccess, user] = await safeTry(getCurrentUser(request.headers))

    if (!userSuccess || !sessionSuccess || !session || !user) return redirect('/signup', {
        headers: {
            'Set-Cookie': await authCookie.serialize('', {maxAge: 1})
        }
    })

    return null
}

export default function ChooseVerificationMethodPage() {

    const {state} = useNavigation()

    const isBusy = state == "loading" || state == "submitting"

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            {
                isBusy ?
                    <LoaderIcon className={"animate-spin"}/>
                    :
                    <div className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>
                        <h1 className={"text-3xl text-center"}>Choose Verification Method</h1>

                        <Button asChild className={"w-full"}>
                            <Link to={'/request-code'}>
                                    <AsteriskSquareIcon/>
                                    Send 6 digit code
                            </Link>
                        </Button>

                        <Button asChild variant={"link"}>
                            <Link to={'/signup'}>
                                Go to Sign Up
                            </Link>
                        </Button>
                    </div>
            }
        </div>
    )
}