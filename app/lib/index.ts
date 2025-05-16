
export const formatDate = (date: Date) => Intl.DateTimeFormat('en-US' , {
    dateStyle: "medium",
    timeStyle: "short"
}).format(date)