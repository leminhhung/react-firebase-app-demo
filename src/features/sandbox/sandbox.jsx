import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

export default function Sanbox() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data);
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
    };
    const [location, setLocation] = useState(defaultProps);

    function handleSeclectLocation(latLng) {
        setLocation({...location, center: {lat: latLng.lat, lng: latLng.lng}})
    }

    return (
        <>
            <h1>Testing 123</h1>
            <h3>The data is: {data}</h3>
            <Button onClick={() => dispatch(increment(10))} content='Increment' color='green'/>
            <Button onClick={() => dispatch(decrement(10))} content='Decrement' color='red'/>
            <Button
                onClick={() => dispatch(openModal({modalType: 'TestModal', modalProps: {data}}))}
                content='Test Open Modal' color='teal'
            />
            <div style={{marginTop: 15}}>
                <TestPlaceInput setLocation={handleSeclectLocation}/>
                <TestMap location={location}></TestMap>
            </div>
        </>
    )
}