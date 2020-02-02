import React from 'react';
import Mermaid from '../Mermaid';
import { main } from '../../data/main';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { 
  BrowserRouter as Router,
  Route 
} from 'react-router-dom';
import Navigation from '../Navigation';
import { Badge } from 'react-bootstrap';

const routes = [
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

class App extends React.Component {
  getGraphData(key) {
    if(key === 'Sweeps'){
      console.log(main[key]);
      let classes = main[key].match(/class.*/g).map((a)=>(a.split(" ")[1]));
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
  render() {
    return (
      <Container>
        <h2>Asset Model Visualizer <Badge variant="secondary">0.0.1</Badge></h2>
        <br></br>
        <Row>
          <Col md={3}>
            <Navigation></Navigation>
          </Col>
          <Col md={9}>
            <Router>
              {
                routes.map((route) => (
                  <Route key={route.path} path={route.path} 
                    render={(props) => <Mermaid id="graph1" content={`classDiagram${this.getGraphData(route.data)}`} />}
                  />
                ))
              }
              </Router>  
          </Col>
        </Row>
      </Container>    
    );
  }
}

export default App;
