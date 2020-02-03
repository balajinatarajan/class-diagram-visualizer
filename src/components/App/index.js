import React, { useState, useEffect } from 'react'
import Mermaid from '../Mermaid'
import { main } from '../../data/main'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { 
  BrowserRouter as Router,
  Route 
} from 'react-router-dom'
import Navigation from '../Navigation'
import { Badge } from 'react-bootstrap'
//import { useFetch } from '../../utils/fetch'
import { PROPERTIES } from '../../constants'
import yaml from 'js-yaml'

function App() {
  const [data, updateData] = useState({})

  useEffect(
    async () => {
      const response = await fetch(PROPERTIES.category_url)
      const text = await response.text()
      updateData(yaml.safeLoad(text))
  }, [PROPERTIES.category_url])
  

  /*getGraphData(key) {
    if(key === 'Sweeps'){
      console.log(main[key]);
      let classes = main[key].match(/class.*//*REMOVE COMMENT HEREg).map((a)=>(a.split(" ")[1]));
      console.log(classes);
      let aggregatedResult = main[key];
      classes.forEach(element => {
        aggregatedResult += (main[element] !== undefined)?main[element]:'';
      });

      console.log(aggregatedResult);
      return aggregatedResult;
    }
    return main[key];
  }
  render() {*/
    return (
      <Container>
        <h2>Asset Model Visualizer <Badge variant="secondary">0.0.1</Badge></h2>
        <br></br>
        <Row>
          <Col md={3}>
            <Navigation data={data}></Navigation>
          </Col>
          <Col md={9}>
            <Router>
              {
                Array.from(data).map((category)=>(
                  Array.from(category[Object.keys(category)[0]]).map((item) => (
                    //<div><a href={`/${item}`}>{item}</a></div>
                    
                    /*<Route key={item} path={item} 
                    render={() => <Mermaid id="graph1" diagramKey={item} />}
                    />*/
                    
                    <Route key={item} path={`/${item}`} render={() => <Mermaid id="graph1" diagramKey={item} />}/>
                  ))
                ))
                  
                /*getRoutes().map((route) => (
                 
                ))*/
              }
              </Router>  
          </Col>
        </Row>
      </Container>    
    );
  /*}*/
}

export default App;
