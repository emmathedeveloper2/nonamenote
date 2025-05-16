import {Form, Link, useNavigation} from "react-router";
import {LoaderIcon} from "lucide-react";
import {redirect} from "react-router";
import {authCookie} from "~/.server/config/cookies.config";
import {safeTry} from "~/utils";
import {Route} from "./+types/route";
import {Button} from "~/components/ui/button";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "~/components/ui/input-otp";
import {REGEXP_ONLY_DIGITS} from "input-otp";
import {getCurrentUser} from "~/.server/bridges/users.bridge";
import {verifyCode} from "~/.server/bridges/auth.bridge";

export async function loader({request}: Route.LoaderArgs) {

    const [success, user] = await safeTry(getCurrentUser(request.headers))

    if (!success) return redirect('/signup', {
        headers: {
            'Set-Cookie': await authCookie.serialize('', {maxAge: 1})
        }
    })

    return {
        email: user.email
    }
}

export async function action({request}: Route.ActionArgs) {

    const [userFound, _, message] = await safeTry(getCurrentUser(request.headers))

    if (!userFound) return {
        success: false,
        message,
    }

    const {code} = Object.fromEntries(await request.formData())

    const [success, newSession, msg] = await safeTry(verifyCode(request.headers, code as any))

    if (!success) return {
        success,
        message: msg.replace("jwt", "code")
    }

    return redirect('/dashboard', {
        headers: {
            'Set-Cookie': await authCookie.serialize(newSession)
        }
    })
}

export default function CodePage({actionData, loaderData}: Route.ComponentProps) {

    const {email} = loaderData

    const {state} = useNavigation()

    const isBusy = state == 'loading' || state == 'submitting'

    const formatEmail = (text: string) => text.split("").reduce((prev: string, char, idx) => {
        prev += idx > 0 && idx < text.indexOf("@") ? '*' : char

        return prev
    }, "")

    return (
        <div className={"size-full flex flex-col items-center justify-center p-2"}>
            <Form method={"POST"} className={"w-full md:w-[400px] flex flex-col gap-8 items-center"}>
                {
                    actionData && !actionData.success &&
                    <p className={"text-center"}>{actionData.message}</p>
                }

                <p className={"text-center"}>A 6 digit code was sent to {formatEmail(email)}</p>

                <InputOTP
                    required
                    name={"code"}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0}/>
                        <InputOTPSlot index={1}/>
                        <InputOTPSlot index={2}/>
                    </InputOTPGroup>
                    <InputOTPSeparator/>
                    <InputOTPGroup>
                        <InputOTPSlot index={3}/>
                        <InputOTPSlot index={4}/>
                        <InputOTPSlot index={5}/>
                    </InputOTPGroup>
                </InputOTP>


                <Button
                    disabled={isBusy}
                >
                    {isBusy ? <LoaderIcon className={"animate-spin"}/> : "VERIFY ACCOUNT"}
                </Button>


                {!isBusy &&
                    <Button asChild variant={"link"}>
                        <Link to={'/request-code'} className={"underline"}>
                            Resend Code
                        </Link>
                    </Button>
                }
            </Form>
        </div>
    )
}