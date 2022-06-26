// [START maps_react_map]
import React, {useState, useEffect} from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { Modal, Button } from 'react-bootstrap';
import { showNotify } from '../../services/actionsAppService.jsx';

const render = (status) => {
  return <h1>{status}</h1>;
};

const Maps = props => {
  const [modalShow, setModalShow] = useState(false);
  const [clicksOccurrences, setClicksOccurrences] = useState([]);
  const [clicksComplaints, setClicksComplaints] = useState([]);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  });


	useEffect(() => {
		setClicksOccurrences(props.localesOccurrences);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.localesOccurrences]);

	useEffect(() => {
  	setClicksComplaints(props.localesComplaints);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.localesComplaints]);

  const onClick = (e) => {
    props.setLatLocale(e.latLng.toJSON().lat);
    props.setLongLocale(e.latLng.toJSON().lng);
  };

  const onIdle = (m) => {
    props.setZoomLocale(m.getZoom());
    setCenter({lat: props.latLocale, lng: props.longLocale});
  };

  const onHideModal = () => {
    setModalShow(false);
  }

  const alertTeste = (e) => {
    alert(654);
  }

  return (
    <>      
      <div style={{ display: "flex", height: "400px" }}>
        <Wrapper apiKey={"AIzaSyC0iAc-hoK4PFxb0Khhw6bH5ZroPbYGMU4"} render={render}>
          <Map center={center} onClick={onClick} onIdle={onIdle} zoom={props.zoomLocale} style={{ flexGrow: "1", height: "100%" }} >
            {clicksOccurrences?.map((clickOccurrence, i) => (
	            <Marker key={i} position={clickOccurrence.position}
                dataMarker={clickOccurrence.data}
                icon={{
                  url: `${process.env.PUBLIC_URL}/icon-occurrence-locale.png`,
                  scaledSize: new window.google.maps.Size(32,45),
                }}
              />
  	        ))}
  	        {clicksComplaints?.map((clickComplaints, i) => (
	            <Marker key={i} position={clickComplaints.position}
                dataMarker={clickComplaints.data}
                icon={{
                  url: `${process.env.PUBLIC_URL}/icon-complaint-locale.png`,
                  scaledSize: new window.google.maps.Size(32,45),
                }}
              />
  	        ))}
          </Map>
        </Wrapper>
      </div>
      <div style={{width: "100%", marginTop: "15px"}}>
        <label><b>Zoom:</b> {props.zoomLocale} &nbsp;&nbsp; <b>Latitude:</b> {props.latLocale} &nbsp;&nbsp; <b>Longitude:</b> {props.longLocale}</label>
      </div>
        
    </>
  );
  
};

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const ref = React.useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
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
  useEffect(() => {
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
  const [marker, setMarker] = useState();

  const contentString =
    `<div id="content">
        <h4 id="firstHeading" class="firstHeading">${options?.dataMarker?.title}</h4>
        <div id="bodyContent">
          <p style="line-height:21px;">
            <b>Data:</b> ${options?.dataMarker?.date}<br />

            ${options?.dataMarker?.type == 'occurrence' ? `<b>Status: ${options?.dataMarker?.status}` : ''}
            ${options?.dataMarker?.type == 'complaint' ? `<b>Tipo: ${options?.dataMarker?.typeComplaint}` : ''}
          </p>
        </div>
      </div>`;

  const infowindow = new window.google.maps.InfoWindow({
    content: contentString,
  });


  useEffect(() => {
    if (!marker) {

      let markerTemp = new window.google.maps.Marker()

      window.google.maps.event.addListener(markerTemp,'click',function() {
        infowindow.open({
          anchor: markerTemp, 
          shouldFocus: false,
        });
      });
      setMarker(markerTemp);
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
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
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default Maps;