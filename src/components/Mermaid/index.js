import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import mermaid from 'mermaid'
import { PROPERTIES } from '../../constants'

function Mermaid(props) {

    const [svg, updateSvg] = useState({})

    useEffect(
      async () => {
        mermaid.mermaidAPI.initialize({
          startOnLoad: false,
        })
        const response = await fetch(`${PROPERTIES.BASE_URL}${props.diagramKey}.txt`)
        let text = await response.text()

        let classes = text.match(/class[ a-zA-Z]*/g).map((a)=>(a.split(" ")[1]));
        console.log(classes);
      
        let promises = [];
        classes.forEach(async(element) => {
          // parse the main response to get other definitions from the respective files 
          promises.push(fetch(`${PROPERTIES.BASE_URL}${element}.txt`).then( response => response.text()))
        });

        Promise.all(promises).then(finalResponse => {
          let aggregatedResult = text;
          finalResponse.map(element => aggregatedResult += `\n${element}`)
          aggregatedResult = `classDiagram\n${aggregatedResult}`
          console.log(aggregatedResult);

          mermaid.mermaidAPI.render(props.id, aggregatedResult, svg => {
            updateSvg(svg)
          })
        })
    },[props.diagramKey])
  
    return(
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    )
  }
  
  Mermaid.propTypes = {
    id: PropTypes.string.isRequired,
    diagramKey: PropTypes.string.isRequired,
  }
  
  export default Mermaid