
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
 function App(props) {
  const mapStyles = {
    maxWidth: '100%',
    maxHeight: '100%',
  };
  return (
    <div className="App">
        <Map
          google={props.google}
          zoom={5}
          style={mapStyles}
          initialCenter={{ lat:props.countryCordinates[0], lng:props.countryCordinates[1]}}
        >
          <Marker position={{ lat: props.capitalCityCordinates.latlng[0], lng: props.capitalCityCordinates.latlng[1]}} />
        </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_TITLE
})(App);
