import React, {useState} from "react";
import { Container } from "semantic-ui-react";
import {EventDashboard} from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";

function App() {
  const [formOpen, setformOpen] = useState(false);
  return (
    <>
      <NavBar setformOpen={setformOpen}/>
      <Container className='main'>
        <EventDashboard formOpen={formOpen} setformOpen={setformOpen}/>
      </Container>
    </>
  );
}

export default App;
