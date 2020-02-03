import React from 'react'
import yaml from 'js-yaml'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Navigation(props) {
    /* converting yaml to json */
    const result = Array.from(props.data)
    return (
        <Accordion defaultActiveKey="0">{  
            result.map((category, index)=>(
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                        {Object.keys(category)[0]}
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                        {
                            Array.from(category[Object.keys(category)[0]]).map((item) => (
                                <div><a href={`/${item}`}>{item}</a></div>
                            ))
                        }
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            ))}
        </Accordion>
    )
}

export default Navigation