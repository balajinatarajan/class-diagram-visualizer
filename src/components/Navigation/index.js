import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const routes = [
    {
      path: '/all',
      data: 'all'
    },
    {
      path: '/main',
      data: 'main'
    },
    {
      path: '/channel',
      data: 'Channel'
    },
    {
      path: '/sweeps',
      data: 'Sweeps'
    }
  ]

const Navigation = () => (
    <Accordion defaultActiveKey="0">
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Pages
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                {
                    routes.map((route) => (
                        <div><a href={route.path}>{route.data}</a></div>
                    ))
                }
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Page Components
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
            <Card.Body>ContentGroup</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Core Components
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
            <Card.Body>Channel</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
);
export default Navigation;