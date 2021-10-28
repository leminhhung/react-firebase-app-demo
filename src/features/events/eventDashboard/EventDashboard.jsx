import React from "react";
import { Grid } from "semantic-ui-react";
import EnventList from "./EventList";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilter from "./EventFilter";

export const EventDashboard = () => {
    const {events} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);

    return (
        <Grid>
            <Grid.Column width={10}>
                {loading &&
                    <>
                        <EventListItemPlaceholder/>
                        <EventListItemPlaceholder/>
                    </>
                }
                <EnventList
                    events={events}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventFilter/>
            </Grid.Column>
        </Grid>
    )
}