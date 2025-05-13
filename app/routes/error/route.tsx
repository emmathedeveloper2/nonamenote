import { Link } from "react-router";
import {Button} from "~/components/ui/button";


export default function ErrorPage(){

    return (
        <div className={"size-full flex flex-col items-center justify-center gap-4"}>
            <h1>Oops, Something went wrong</h1>

            <Button asChild variant={"link"} className={"w-full md:w-[300px]"}>
                <Link to={'/'}>
                    GO HOME
                </Link>
            </Button>
        </div>
    )
}