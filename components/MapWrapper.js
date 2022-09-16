// react
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// openlayers
import { Map, View, Feature } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { transformExtent, fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style, Circle, Fill, Stroke } from "ol/style";
import { Point } from "ol/geom";
import TileJSON from "ol/source/TileJSON";

const MapContainer = styled.div`
  width: 80%;
  height: 600px;
  margin: auto;
`;

function MapWrapper(props) {
  // set intial state
  const { longLat, map, setMap, mapLayerSwitch, setMapLayerSwitch } = props;
  const [mapDisplay, setMapDisplay] = useState(false);

  const mapContainer = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  const initialLayer = new TileLayer({
    source: new OSM(),
  });
  const marker = new Feature({
    geometry: new Point(fromLonLat([longLat[0], longLat[1]])),
  });
  let vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [marker],
    }),
  });
  const pointStyle = new Style({
    image: new Circle({
      radius: 12,
      fill: new Fill({
        color: "orange",
      }),
      stroke: new Stroke({
        color: "orange",
        width: 2,
      }),
    }),
  });
  vectorLayer.setStyle(pointStyle);

  function transform(extent) {
    return transformExtent(extent, "EPSG:4326", "EPSG:3857");
  }

  useEffect(() => {
    const initialMap = new Map({
      target: mapContainer.current,
      layers: [initialLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 1,
        extent: transform([-140, 25, -57, 49.5]),
      }),
      controls: [],
    });

    setMap(initialMap);
  }, [mapDisplay]);

  useEffect(() => {
    if (map) {
      const layerLength = map.getLayers().array_.length;
      map.addLayer(vectorLayer);
      if (layerLength > 1) {
        map.removeLayer(map.getLayers().array_[1]);
      }
    }
  }, [longLat]);

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
