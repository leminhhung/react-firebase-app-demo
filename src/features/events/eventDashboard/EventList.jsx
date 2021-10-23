import React from "react";
import EnventListItem from "./EventListItem";

export default function EnventList({events}) {
    return (
        <>
            {events.map(event => (
                <EnventListItem
                    key={event.id}
                    event={event}
                />
            ))}
        </>
    )
}