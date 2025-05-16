import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";


const NotesQuotaDisplay = ({ used } : { used: number }) => {

    return (
        <Card className={"w-full py-4"}>
            <CardHeader className={"py-0 px-6 mb-6"}>
                <CardTitle>
                    Note{used == 1 ? '' : 's'} quota used
                </CardTitle>
            </CardHeader>
            <CardContent className={"flex items-center px-6 py-0"}>
                <p>
                    <span className={"text-4xl"}>{used}/</span><span className={"opacity-80"}>50</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default NotesQuotaDisplay