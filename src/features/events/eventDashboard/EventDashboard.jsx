import React from "react";
import { Grid } from "semantic-ui-react";
import EnventList from "./EventList";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilter from "./EventFilter";
import { listenToEvents } from "../eventActions";
import { useDispatch } from "react-redux";
import useFirestoreCollection from "../../../app/hooks/FirestoreCollection";
import { listenToEventsFromFirestore } from "../../../app/firestore/firestoreService";

export const EventDashboard = () => {
    const {events} = useSelector(state => state.event);
    const {loading} = useSelector(state => state.async);
    const dispatch = useDispatch();

    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(),
        data: events => dispatch(listenToEvents(events)),
        deps: [dispatch]
    })

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