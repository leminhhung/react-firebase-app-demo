import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import GoogleMapReact from 'google-map-react';

function Marker() {
    return(
        <Icon name='marker' size='big' color='red'></Icon>
    )
}

export default function EventDetailedMap({latLng}) {
    const zoom = 14;

    return (
        <Segment attached='bottom' style={{padding: 0}}>
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyD0F3h4ftkUMvIsix69psgiHaQRJZVb_vE" }}
                    center={latLng}
                    zoom={zoom}
                >
                    <Marker lat={latLng.lat} lng={latLng.lng}/>
                </GoogleMapReact>
            </div>
        </Segment>
    )
}