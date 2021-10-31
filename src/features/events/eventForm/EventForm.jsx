///* global google */
// import cuid from "cuid";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import {listenToEvents} from '../eventActions';
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
// import MyPlaceInput from "../../../app/common/form/MyPlaceInput";
import useFirestoreDoc from "../../../app/hooks/FirestoreDoc";
import { addEventTofirestore, cancelEventToggle, listenToEventFromFirestore, updateEventInFirestore } from "../../../app/firestore/firestoreService";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

export default function Eventform({match, history}) {
    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { loading, error } = useSelector((state) => state.async);
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

    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(true);
        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        } catch (error) {
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }
    
    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required('You must provide a description'),
        // city: Yup.object().shape({
        //     address: Yup.string().required('You must provide a city')
        // }),
        // venue: Yup.object().shape({
        //     address: Yup.string().required('You must provide a city')
        // }),
        date: Yup.string().required('You must provide a city')
    })

    useFirestoreDoc({
        shouldExecute: !!match.params.id,
        query: () => listenToEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    })

    if (loading)
        return <LoadingComponent content='Loading content...'/>

    if (error) return <Redirect to='/error'/>

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        selectedEvent
                            ? await updateEventInFirestore(values)
                            : await addEventTofirestore(values);
                        setSubmitting(false);
                        history.push('/events');
                    } catch (error) {
                        toast.error(error.message);
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, dirty, isValid, values}) => (
                    <Form className='ui form'>
                        <Header sub color='teal' content='Event Details'/>
                        <MyTextInput name='title' placeholder='Event title'/>
                        <MySelectInput name='category' placeholder='Event Category' options={categoryData}/>
                        <MyTextArea name='description' placeholder='Event Description' rows={2}/>
                        <Header sub color='teal' content='Event Location Details'/>
                        {/* <MyPlaceInput name='city' placeholder='Event City'/> */}
                        {/* <MyPlaceInput
                            name='venue'
                            placeholder='Event Venue'
                            disabled={!values.city.latLng}
                            options={{
                                location: new google.maps.LatLng(values.city.latLng),
                                radius: 10000,
                                types: ['establishment']
                            }}
                        /> */}
                        <MyDateInput
                            name='date'
                            placeholderText='Event Date'
                            timeFormat='HH:mm'
                            showTimeSelect
                            timeCation='time'
                            dateFormat='MMMM d, yyyy h:mm a'
                        />
                        { selectedEvent &&
                            <Button
                                loading={loadingCancel}
                                type='button'
                                floated='left'
                                color={selectedEvent.isCancelled ? 'green' : 'red'}
                                content={selectedEvent.isCancelled ? 'Reactivate event' : 'Cancel event'}
                                onClick={() => setConfirmOpen(true)}>
                            </Button>
                        }
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
            <Confirm
                content={selectedEvent?.isCancelled ? 'This will be reactivate the event - are you sure?' :
                'This will cancel the event - are you sure?'}
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => handleCancelToggle(selectedEvent)}
            />
        </Segment>
    )
}