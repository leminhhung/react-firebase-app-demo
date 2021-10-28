import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from 'react-calendar';

export default function EventFilter() {
    return (
        <>
            <Menu vertical size='large' style={{witdh: '100%'}}>
                <Header icon='filter' attached color='teal' content='Filter'/>
                <Menu.Item content='All Events'/>
                <Menu.Item content="I'm going"/>
                <Menu.Item content="I'm hosting"/>
            </Menu>
            <Header icon='calendar' attached color='teal' content='Select date'/>
            <Calendar/>
        </>
    )
}