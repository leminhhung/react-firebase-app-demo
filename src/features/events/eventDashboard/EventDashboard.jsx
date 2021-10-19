import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Eventform from "../eventForm/EventForm";
import EnventList from "./EventList";
import {sampleData} from '../../../app/api/SampleData'

export const EventDashboard = ({formOpen, setformOpen}) => {
    const [events, setEvents] = useState(sampleData);
    return (
        <Grid>
            <Grid.Column width={10}>
                <EnventList events={events}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {formOpen && <Eventform setformOpen={setformOpen}/>}
            </Grid.Column>
        </Grid>
    )
}