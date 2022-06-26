// [START maps_react_map]
import * as React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { Modal, Button } from 'react-bootstrap';

const render = (status) => {
  return <h1>{status}</h1>;
};

const Maps = props => {
  const [modalShow, setModalShow] = React.useState(false);
  const [click, setClick] = React.useState({});
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0
  });

  //setZoom(Number(event.target.value))
  //setCenter({ ...center, lat: Number(event.target.value) })
  //setCenter({ ...center, lng: Number(event.target.value) })

  const onClick = (e) => {
    setClick(e.latLng);
    console.log(e.latLng);
    props.setLatLocale(e.latLng.toJSON().lat);
    props.setLongLocale(e.latLng.toJSON().lng);
  };

  const onIdle = (m) => {
    props.setZoomLocale(m.getZoom());
    setCenter({lat: props.latLocale, lng: props.longLocale});
    if(props.latLocale !== 0 && props.longLocale !== 0){
      setClick({lat: props.latLocale, lng: props.longLocale})
    }
    
  };

  const onHideModalSave = () => {
    setModalShow(false);
  }

  const onHideModalCancel = () => {
    props.setLatLocale(0);
    props.setLongLocale(0);
    setClick({});
    setModalShow(false);
  }

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)}>
        Abrir mapa
      </Button>

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Clique no mapa para marcar a localização
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <div style={{ display: "flex", height: "400px" }}>
            <Wrapper apiKey={"AIzaSyC0iAc-hoK4PFxb0Khhw6bH5ZroPbYGMU4"} render={render}>
              <Map center={center} onClick={onClick} onIdle={onIdle} zoom={props.zoomLocale} style={{ flexGrow: "1", height: "100%" }} >
                {
                  Object.keys(click).length !== 0 ? <Marker position={click} /> : ''
                }
              </Map>
            </Wrapper>
          </div>
          <div style={{width: "100%", marginTop: "15px"}}>
            <label><b>Zoom:</b> {props.zoomLocale} &nbsp;&nbsp; <b>Latitude:</b> {props.latLocale} &nbsp;&nbsp; <b>Longitude:</b> {props.longLocale}</label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onHideModalSave}>Salvar</Button>
          <Button variant="danger" onClick={onHideModalCancel}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
};

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  // [END maps_react_map_component_add_map_hooks]
  // [START maps_react_map_component_options_hook]
  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  // [END maps_react_map_component_options_hook]
  // [START maps_react_map_component_event_hooks]
  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  // [END maps_react_map_component_event_hooks]
  // [START maps_react_map_component_return]
  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
  // [END maps_react_map_component_return]
};

// [START maps_react_map_marker_component]
const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

// [END maps_react_map_marker_component]
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof window.google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default Maps;