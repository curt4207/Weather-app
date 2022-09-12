// react
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// openlayers
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transformExtent } from "ol/proj";

const MapContainer = styled.div`
  width: 80%;
  height: 600px;
  margin: auto;
`;

function MapWrapper(props) {
  // set intial state
  const [mapDisplay, setMapDisplay] = useState(false);
  const [map, setMap] = useState();

  const mapContainer = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  function transform(extent) {
    return transformExtent(extent, "EPSG:4326", "EPSG:3857");
  }

  useEffect(() => {
    const initialMap = new Map({
      target: mapContainer.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 1,
        extent: transform([-135, 23, -53, 49.5]),
      }),
      controls: [],
    });
    setMap(initialMap);
  }, [mapDisplay]);

  const loadMap = () => {
    if (mapDisplay) {
      setMapDisplay(false);
    } else {
      setMapDisplay(true);
    }
  };

  return (
    <div>
      <button onClick={loadMap}>Map</button>
      {mapDisplay && <MapContainer ref={mapContainer}></MapContainer>}
    </div>
  );
}

export default MapWrapper;
