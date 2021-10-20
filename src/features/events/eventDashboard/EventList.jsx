import React from "react";
import EnventListItem from "./EventListItem";

export default function EnventList({events, selectEvent, deleteEvent}) {
    return (
        <>
            {events.map(event => (
                <EnventListItem
                    key={event.id}
                    event={event}
                    selectEvent={selectEvent}
                    deleteEvent={deleteEvent}
                />
            ))}
        </>
    )
}