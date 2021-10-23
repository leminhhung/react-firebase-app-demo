import React from "react";
import { Grid } from "semantic-ui-react";
import EnventList from "./EventList";
import { useSelector } from "react-redux";

export const EventDashboard = () => {
    const {events} = useSelector(state => state.event);

    return (
        <Grid>
            <Grid.Column width={10}>
                <EnventList
                    events={events}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <h1>Event filter</h1>
            </Grid.Column>
        </Grid>
    )
}