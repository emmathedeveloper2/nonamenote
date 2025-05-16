import { Form, Link, useNavigation } from "react-router";
import {LoaderIcon} from "lucide-react";
import { redirect } from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import {safeTry} from "~/utils";
import { Route } from "./+types/route";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {signUpWithEmailAndPassword} from "~/.server/bridges/auth.bridge";

export async function action({ request } : Route.ActionArgs){

    //Parse data from request
    const { username , email, password }: any = Object.fromEntries(await request.formData())

    const [ success , session , message ] = await safeTry(signUpWithEmailAndPassword(username , email, password))

    if(!success) return {
        success,
        message
    }

    return redirect('/choose-verification-method' , {
        headers: {
            'Set-Cookie': await authCookie.serialize(session)
        }
    })
}

export default function SignUpPage({ actionData } : Route.ComponentProps){

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
                    type="text"
                    name="username"
                    placeholder={"Your Username"}
                    className={"w-full p-2 shadow-lg"}
                />

                <Input
                    required
                    type="email"
                    name="email"
                    placeholder={"Your Email"}
                    className={"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"}
                />

                <Input
                    required
                    type="password"
                    name="password"
                    placeholder={"Your Password"}
                    className={"w-full p-2 shadow-lg"}
                />

                <Button
                    disabled={isBusy}
                    className={"w-full shadow"}
                >
                    {isBusy ? <LoaderIcon className={"animate-spin"}/> : "SIGN UP"}
                </Button>

                <span className={"flex gap-1"}>
                    Already have an account?
                    <Link to={'/signin'} className={"underline"}>
                        Sign In
                    </Link>
                </span>
            </Form>
        </div>
    )
}