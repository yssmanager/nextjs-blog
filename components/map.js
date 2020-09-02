import React, { useState, useEffect, useRef } from "react"
import { geoMercator, geoPath } from "d3-geo"
import { feature } from "topojson-client"

const projection = geoMercator()
  .scale(6000)
  .center([140.0032936, 35.3219088]);

export default function Map() {
  const [geographies, setGeographies] = useState([])

  useEffect(() => {
    fetch("/map.topojson")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(json => {
          setGeographies(feature(json, json.objects.sample).features)
        })
      })
  }, [])


  return (
    <svg width={ 800 } height={ 450 } viewBox="0 0 800 450">
      <g className="sample">
        {
          geographies.map((d,i) => (
            <path
              key={ `path-${ i }` }
              d={ geoPath().projection(projection)(d) }
              className="country"
              fill={ `rgba(38,50,56)` }
              stroke="#FFFFFF"
              strokeWidth={ 0.5 }
            />
          ))
        }
      </g>
    </svg>
  )
}

const getJson = () => {

  return res
}
