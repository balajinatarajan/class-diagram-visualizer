import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import mermaid from 'mermaid'
import { PROPERTIES } from '../../constants'

function Mermaid(props) {

    const [svg, updateSvg] = useState({})

    useEffect(() => {
      async function featchData() {
        mermaid.mermaidAPI.initialize({
          startOnLoad: false,
        })
        const categoryResponse = await fetch(`${PROPERTIES.BASE_URL}${props.diagramKey}.txt`)
        let categoryText = await categoryResponse.text()

        /* extarct class names from main response */
        let classes = categoryText.match(/class[ a-zA-Z]*/g).map((a)=>(a.split(" ")[1]));
      
        let subsequentFetches = [];
        classes.forEach(async(element) => {
          // parse the main response to get other definitions from the respective files 
          if(props.diagramKey !== element) {
            subsequentFetches.push(fetch(`${PROPERTIES.BASE_URL}${element}.txt`).then( response => response.text()))
          }
        });

        Promise.all(subsequentFetches).then(finalResponse => {
          let aggregatedResult = categoryText;
          finalResponse.map(response => aggregatedResult += `\n${response}`)
          aggregatedResult = `classDiagram\n${aggregatedResult}`
          mermaid.mermaidAPI.render(props.id, aggregatedResult, svg => {
            updateSvg(svg)
          })
        })
    }
    featchData()
  },[props.id, props.diagramKey])
  
    return(
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    )
  }
  
  Mermaid.propTypes = {
    id: PropTypes.string.isRequired,
    diagramKey: PropTypes.string.isRequired,
  }
  
  export default Mermaid