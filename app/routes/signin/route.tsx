import { Form, Link, useNavigation } from "react-router";
import {LoaderIcon} from "lucide-react";
import { redirect } from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import {safeTry} from "~/utils";
import {signInWithEmailAndPassword} from "~/.server";
import { Route } from "./+types/route";

export async function action({ request } : Route.ActionArgs){

    const { email , password } = Object.fromEntries(await request.formData()) as Record<string , string>

    const [ success , data ] = await safeTry(signInWithEmailAndPassword(email , password))

    if(!success) return { success , message: data.message }

    return redirect('/dashboard' , {
        headers: {
            'Set-Cookie': await authCookie.serialize(data)
        }
    })
}

export default function SignInPage({ actionData } : Route.ComponentProps){

    const { state } = useNavigation()

    const isBusy = state == 'loading' || state == 'submitting'

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <Form method={"POST"} className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>
                {
                    actionData && !actionData.success &&
                    <p className={"text-center"}>{actionData.message}</p>
                }

                <input
                    required
                    type="email"
                    name="email"
                    placeholder={"Your Email"}
                    className={"w-full p-2"}
                />

                <input
                    required
                    type="password"
                    name="password"
                    placeholder={"Your Password"}
                    className={"w-full p-2"}
                />
                <button
                    disabled={isBusy}
                    className={"bg-black text-white dark:bg-white dark:text-black p-2 w-full flex items-center justify-center"}
                >
                    {isBusy ? <LoaderIcon className={"animate-spin"}/> : "SIGN IN"}
                </button>

                <span className={"flex gap-1"}>
                    Don't have an account?
                    <Link to={'/signup'} className={"underline"}>
                        Sign Up
                    </Link>
                </span>
            </Form>
        </div>
    )
}