/* global google */
import cuid from "cuid";
import { Formik, Form } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import {updateEvent, createEvent} from '../eventActions';
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyPlaceInput from "../../../app/common/form/MyPlaceInput";

export default function Eventform({match, history}) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find((e) => e.id === match.params.id));
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: {
            address: '',
            latLng: null
        },
        venue: {
            address: '',
            latLng: null
        },
        date: ''
    }
    
    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required('You must provide a description'),
        city: Yup.object().shape({
            address: Yup.string().required('You must provide a city')
        }),
        venue: Yup.object().shape({
            address: Yup.string().required('You must provide a city')
        }),
        date: Yup.string().required('You must provide a city')
    })

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    selectedEvent
                    ? dispatch(updateEvent({...selectedEvent, ...values}))
                    : dispatch(createEvent({...values,
                        id: cuid(),
                        hostedBy: 'Hung',
                        attendees: [],
                        hostPhotoURL: '/assets/user.png'
                    }));
                    history.push('/events');
                }}
            >
                {({isSubmitting, dirty, isValid, values}) => (
                    <Form className='ui form'>
                        <Header sub color='teal' content='Event Details'/>
                        <MyTextInput name='title' placeholder='Event title'/>
                        <MySelectInput name='category' placeholder='Event Category' options={categoryData}/>
                        <MyTextArea name='description' placeholder='Event Description' rows={2}/>
                        <Header sub color='teal' content='Event Location Details'/>
                        <MyPlaceInput name='city' placeholder='Event City'/>
                        <MyPlaceInput
                            name='venue'
                            disabled={!values.city.latLng}
                            placeholder='Event Venue'
                            options={{
                                location: new google.maps.LatLng(values.city.latLng),
                                radius: 1000,
                                types: ['establishment']
                            }}
                        />
                        <MyDateInput
                            name='date'
                            placeholderText='Event Date'
                            timeFormat='HH:mm'
                            showTimeSelect
                            timeCation='time'
                            dateFormat='MMMM d, yyyy h:mm a'
                        />
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            floated='right'
                            positive
                            content='submit'>
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            as={Link} to={'/events'}
                            type='submit'
                            floated='right'
                            content='Cancel'>
                        </Button>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}