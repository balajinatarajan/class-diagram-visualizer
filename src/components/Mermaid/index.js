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
        text = `classDiagram\n${text}`
        mermaid.mermaidAPI.render(props.id, text, svg => {
          updateSvg(svg)
        })
    },[props.diagramKey]
      
    )
  
    return(
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    )
  }
  
  Mermaid.propTypes = {
    id: PropTypes.string.isRequired,
    diagramKey: PropTypes.string.isRequired,
  }
  
  export default Mermaid