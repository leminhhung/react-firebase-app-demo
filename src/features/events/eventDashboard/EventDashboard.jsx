import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Eventform from "../eventForm/EventForm";
import EnventList from "./EventList";
import {sampleData} from '../../../app/api/SampleData'

export const EventDashboard = ({formOpen, setformOpen, selectEvent, selectedEvent}) => {
    const [events, setEvents] = useState(sampleData);
    

    function handleCreateEvent(event) {
        setEvents([...events, event]);
    }

    function handleUpdateEvent(updateEvent) {
        setEvents(events.map(evt => evt.id === updateEvent.id ? updateEvent : evt))
        selectEvent(null);
    }

    function handleDeleteEvent(eventId) {
        setEvents(events.filter(evt => evt.id !== eventId));
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EnventList
                    events={events}
                    selectEvent={selectEvent}
                    deleteEvent={handleDeleteEvent}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen && (
                    <Eventform 
                        setformOpen={setformOpen} 
                        setEvents={setEvents}
                        createEvent={handleCreateEvent}
                        selectedEvent={selectedEvent}
                        handleUpdateEvent={handleUpdateEvent}
                        key={selectedEvent ? selectedEvent.id : null}
                    />
                )}
            </Grid.Column>
        </Grid>
    )
}