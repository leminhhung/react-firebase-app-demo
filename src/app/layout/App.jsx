import React from "react";
import { Route, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import {EventDashboard} from "../../features/events/eventDashboard/EventDashboard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import Eventform from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import Sanbox from "../../features/sandbox/sandbox";
import ModalManager from "../common/modals/ModalManager";

function App() {
  const {key} = useLocation();
  return (
    <>
    <ModalManager/>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <Route exact path='/' component={HomePage}></Route>
    <Route
      path={'/(.+)'}
      render={() => (
        <>
          <NavBar/>
          <Container className='main'>
            <Route exact path='/events' component={EventDashboard}></Route>
            <Route exact path='/sandbox' component={Sanbox}></Route>
            <Route exact path='/events/:id' component={EventDetailedPage}></Route>
            <Route exact path={['/createEvent', '/manage/:id']} component={Eventform} key={key}></Route>
          </Container>
        </>
      )}
    />
    </>
  );
}

export default App;
