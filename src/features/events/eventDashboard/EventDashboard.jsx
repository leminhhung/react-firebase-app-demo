import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import EnventList from "./EventList";
import {sampleData} from '../../../app/api/SampleData'

export const EventDashboard = () => {
    const [events, setEvents] = useState(sampleData);
    

    // function handleCreateEvent(event) {
    //     setEvents([...events, event]);
    // }

    // function handleUpdateEvent(updateEvent) {
    //     setEvents(events.map(evt => evt.id === updateEvent.id ? updateEvent : evt))
    // }

    function handleDeleteEvent(eventId) {
        setEvents(events.filter(evt => evt.id !== eventId));
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EnventList
                    events={events}
                    deleteEvent={handleDeleteEvent}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <h1>Event filter</h1>
            </Grid.Column>
        </Grid>
    )
}