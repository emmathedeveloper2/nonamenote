import { Form, Link, useNavigation } from "react-router";
import {LoaderIcon} from "lucide-react";
import { redirect } from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import {safeTry} from "~/utils";
import {signInWithEmailAndPassword} from "~/.server";
import { Route } from "./+types/route";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";

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

                <Input
                    required
                    type="email"
                    name="email"
                    placeholder={"Your Email"}
                    className={"w-full p-2"}
                />

                <Input
                    required
                    type="password"
                    name="password"
                    placeholder={"Your Password"}
                    className={"w-full p-2"}
                />
                <Button
                    disabled={isBusy}
                    className={"w-full"}
                >
                    {isBusy ? <LoaderIcon className={"animate-spin"}/> : "SIGN IN"}
                </Button>

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