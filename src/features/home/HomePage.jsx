import React from "react";
import { Button, Container, Header, Icon, Image, Segment } from "semantic-ui-react";

export default function HomePage({history}) {
    return (
        <Segment inverted textAlign='center' vertical className='masthread'>
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' style={{marginBottom: 12}}></Image>
                    lmh.hunglm@gmail.com
                </Header>
                <Button size='huge' inverted onClick={() => history.push('/events')}>
                    Get started
                    <Icon name='right arrow' inverted/>
                </Button>
            </Container>
        </Segment>
    )
}