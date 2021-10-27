import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import { deleteEvent } from "../eventActions";
import EnventListAttendee from "./EventListAttendee";
import {format} from 'date-fns';

export default function EnventListItem({event}) {
    const dispatch = useDispatch();
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
                    <Icon name='clock'/> {format(event.date, 'MMM d, yyy h:mm a')}
                    <Icon name='clock'/> {event.venue.address}
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
                <Button as={Link} to={`/events/${event.id}`} color='teal' floated='right' content='view'/>
                <Button
                    onClick={() => dispatch(deleteEvent(event.id))}
                    color='red'
                    floated='right'
                    content='delete'/>
            </Segment>
        </Segment.Group>
    )
}