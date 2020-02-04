import React, { useState, useEffect } from 'react'
import Mermaid from '../Mermaid'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { 
  BrowserRouter as Router,
  Route 
} from 'react-router-dom'
import Navigation from '../Navigation'
import { Badge } from 'react-bootstrap'
import { PROPERTIES } from '../../constants'
import yaml from 'js-yaml'

function App() {
  const [data, updateData] = useState({})
  const baseURL = (process.env.REACT_APP_REPO_URL !== undefined) ? process.env.REACT_APP_REPO_URL : PROPERTIES.BASE_CONFIG_URL

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(baseURL + 'category.yml')
      const text = await response.text()
      updateData(yaml.safeLoad(text))
    }
    fetchData()
  }, [])

    return (
      <Router><Container>
        <h2>Asset Model Visualizer <Badge variant="secondary">0.0.1</Badge></h2>
        <br></br>
        <Row>
          <Col md={3}>
            <Navigation data={data}></Navigation>
          </Col>
          <Col md={9}>
              {
                Array.from(data).map((category)=>(
                  Array.from(category[Object.keys(category)[0]]).map((item) => (
                    <Route key={item} path={`/${item}`} render={() => <Mermaid id="graph1" diagramKey={item} />}/>
                    //<Route key={item} path={`/${item}`} render={() => <h3>{item}</h3>}/>
                  ))
                ))
              }
              <Route exact path="/" render={() => (
                <Jumbotron>
                  <h1>Welcome to the Visualizer!</h1>
                  <p>
                    Click on the tabs on the sidebar to begin viewing the diagrams here
                  </p>
              </Jumbotron>)}/>
          </Col>
        </Row>
      </Container></Router>  
    );
}
export default App;