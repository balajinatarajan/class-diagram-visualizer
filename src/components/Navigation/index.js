import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function Navigation(props) {
    const result = Array.from(props.data)
    const [eventkey, setEventKey] = useState(0)

    return (
        <Accordion defaultActiveKey={eventkey}>{  
            result.map((category, index)=>(
                <Card key={index}>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={index} onClick={() => setEventKey(index)}>
                        {Object.keys(category)[0]}
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                        {
                            Array.from(category[Object.keys(category)[0]]).map((item) => (
                                <div key={item}><Link to={`/${item}`}>{item}</Link></div>
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