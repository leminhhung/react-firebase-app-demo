import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EnventListAttendee from "./EventListAttendee";

export default function EnventListItem({event, selectEvent, deleteEvent}) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={event.hostPhotoURL}/>
                        <Item.Content>
                            <Item.Header content={event.title}/>
                            <Item.Description>
                                Hosted by {event.hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {event.date}
                    <Icon name='clock'/> {event.venue}
                </span>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees.map(attendee =>(
                        <EnventListAttendee key={attendee.id} attendee={attendee}/>
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <span>{event.description}</span>
                <Button onClick={() => selectEvent(event)} color='teal' floated='right' content='view'/>
                <Button onClick={() => deleteEvent(event.id)} color='red' floated='right' content='delete'/>
            </Segment>
        </Segment.Group>
    )
}