import React from "react";
import { Route } from "react-router";
import { Container } from "semantic-ui-react";
import {EventDashboard} from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import Eventform from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";

function App() {
  return (
    <>
    <Route exact path='/' component={HomePage}></Route>
    <Route
      path={'/(.+)'}
      render={() => (
        <>
          <NavBar/>
          <Container className='main'>
            <Route exact path='/events' component={EventDashboard}></Route>
            <Route exact path='/events/:id' component={EventDetailedPage}></Route>
            <Route exact path={['/createEvent', '/manage/:id']} component={Eventform}></Route>
          </Container>
        </>
      )}
    />
    </>
  );
}

export default App;
