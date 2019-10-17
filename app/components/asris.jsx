import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import SoilMap from "./map.jsx";
import { clearSoilData } from "../reducers/soilReducer/actions";
import formatXml from './xmlformatter.js'

const mapStateToProps = state => {
  return {
    soilData: state.soilReducer,
    appLoading: state.baseReducer.loadingData,
    appError: state.baseReducer.error
  };
};

const mapDispatchToProps = { clearSoilData };

class ASRIS extends Component {
  constructor(props) {
    super(props);
    
    this.xmlCont = React.createRef();
    
    this.state = {
      showXML: false
    }
    
    this.xmlSwitch = this.xmlSwitch.bind(this);
  }
  
  xmlSwitch() {
    if (this.state.showXML) {
      this.xmlCont.current.classList.add("noRender");
      this.setState({
        showXML: false
      });
    } else {
      this.xmlCont.current.classList.remove("noRender");
      this.setState({
        showXML: true
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div>
              <h1>A S R I S</h1>
              <strong>
                Australian Soil Resource Information System Interactive Map
              </strong>
              <p>
                Click on the map below to find the geographically closest
                measured APSIM Soil parameter files for any location in
                Australia. Powered by the{" "}
                <a
                  target="_blank"
                  href="http://www.asris.csiro.au/ASRISApi#!/APSIM32Services/ApsoilFromGrid_getClosestApsoil"
                >
                  ARSIS Soil Data Web API
                </a>
                .
              </p>
              {window.location.protocol == "https:" ? (
                <div className="alert alert-warning">
                  <strong>WARNING!</strong> The ASRIS api does not work over
                  HTTPS. <a href="http://asris-map.glitch.me/">Click here</a> to access this page over an unsecured connection.
                </div>
              ) : null}
              {this.props.appError != null ? (
                <div className="alert alert-danger">
                  <strong>ERROR!</strong> {this.props.appError.message}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <SoilMap />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.appLoading || this.props.soilData.soilName != null ? (
              <div className="vessel">
                <h4>Soil Data</h4>
                {this.props.appLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <span><strong>Soil Name</strong>: {this.props.soilData.soilName}</span><br />
                    <span><strong>Soil Type</strong>: {this.props.soilData.soilType}</span><br />
                    <span><strong>Site</strong>: {this.props.soilData.site}</span><br />
                    <span><strong>Nearest Town</strong>: {this.props.soilData.nearestTown}</span><br />
                    <span><strong>Region</strong>: {this.props.soilData.region}</span><br />
                    <span><strong>State</strong>: {this.props.soilData.state}</span><br />
                    <span><strong>Latitude</strong>: {this.props.soilData.latitude}</span><br />
                    <span><strong>Longitude</strong>: {this.props.soilData.longitude}</span><br />
                    <span><strong>Data Source</strong>: {this.props.soilData.dataSource}</span><br /><br />
                    <span><strong>Comments</strong>: {this.props.soilData.comments}</span><br /><br />
                    <div ref={this.xmlCont} className="noRender">
                      <pre lang="xml">{formatXml(this.props.soilData.xml)}</pre>
                    </div>
                    <button onClick={this.xmlSwitch}>Click to {this.state.showXML ? "close" : "open"} full XML results</button>
                  </>
                )}
                <button onClick={this.props.clearSoilData}>
                  Clear Data
                </button>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ASRIS);
