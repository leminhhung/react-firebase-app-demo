import React, {useState} from "react";
import { Container } from "semantic-ui-react";
import {EventDashboard} from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

function App() {
  const [formOpen, setformOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectedEvent(event) {
    setSelectedEvent(event);
    setformOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setformOpen(true)
  }

  return (
    <>
      <NavBar setformOpen={handleCreateFormOpen}/>
      <Container className='main'>
        <EventDashboard
          formOpen={formOpen}
          setformOpen={setformOpen}
          selectEvent={handleSelectedEvent}
          selectedEvent={selectedEvent}
        />
      </Container>
    </>
  );
}

export default App;
