import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { updateSoilData, updateMarkers } from '../reducers/soilReducer/actions';
import { setLoadingTrue, setLoadingFalse, setError, clearError } from '../reducers/actions';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const mapStateToProps = (state) => {
  return {
    appLoading: state.baseReducer.loadingData,
    appError: state.baseReducer.error,
    markers: state.soilReducer.markers
  }
}

const mapDispatchToProps = { updateSoilData, updateMarkers, setLoadingTrue, setLoadingFalse, setError, clearError }

class SoilMap extends Component {
  constructor(props) {
    super(props);
    
    // this.position = [-27.0000, 135.0000];
    this.bounds = [[-6.22, 86.22],[-45.08,184.13]]
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    if (!this.props.appLoading) {
      
      const tryRetrieveData = (data, tagName) => {
        try {
          return data.getElementsByTagName(tagName)[0].textContent
        } catch {
          return null
        }
      }
      
      let componentRef = this;
      let long = e.latlng.lng;
      let lat = e.latlng.lat;
      if (this.props.appError != null) {
        this.props.clearError();
      }
      this.props.setLoadingTrue();
      fetch("https://www.asris.csiro.au/ASRISApi/api/APSIM/getClosestApsoil?longitude=" + long + "&latitude=" + lat + "&maxCnt=1")
        .then(response => {
          if (!response.ok) {
            throw new Error("Bad Request")
          } else {
            return response
          }
        })
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
                let dataLat = parseFloat(tryRetrieveData(data, "Latitude"));
                let dataLong = parseFloat(tryRetrieveData(data, "Longitude"));
                componentRef.props.updateSoilData({
                  name: data.getElementsByTagName("Soil")[0].attributes[0].value,
                  distanceFromQueryLocation: parseFloat(tryRetrieveData(data, "distanceFromQueryLocation")),
                  soilType: tryRetrieveData(data, "SoilType"),
                  site: tryRetrieveData(data, "Site"),
                  nearestTown: tryRetrieveData(data, "NearestTown"),
                  region: tryRetrieveData(data, "Region"),
                  state: tryRetrieveData(data, "State"),
                  latitude: dataLat,
                  longitude: dataLong,
                  dataSource: tryRetrieveData(data, "DataSource"),
                  comments: tryRetrieveData(data, "Comments"),
                  xml: new XMLSerializer().serializeToString(data)
                });
                componentRef.props.updateMarkers([[dataLat,dataLong]])
                componentRef.props.setLoadingFalse();
              })
        .catch(error => {
          console.log(error);
          componentRef.props.setError(error);
          componentRef.props.setLoadingFalse();
        })
    }
  }

  render() {
      return (
        <Map bounds={this.bounds} zoom={4} maxBounds={this.bounds} dragging={true} onClick={this.handleClick}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.props.markers.map((position, idx) => 
          <Marker key={`marker-${idx}`} position={position}></Marker>
        )}
        </Map>
      );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SoilMap)