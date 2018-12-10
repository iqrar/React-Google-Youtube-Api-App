import React, { PureComponent } from 'react';
import styled from 'styled-components';
import config from '../config';

const GoogleMapContainer = styled.div.attrs({
	id: 'map',
})`
	height: 60vh;
	width: 100vw;
`;

class Map extends PureComponent {
    constructor(props) {
		super(props);
		this.youtubeVideos = {
			key: 'AIzaSyCDgyQ2LpzXLftt6X6F5WcjrnK2qJY_ZQk',
			locationRadius: '5mi',
			type: 'video',
			q: 'surfing',
			part: 'snippet'
		};
        this.map = {};
        this.marker = {};
   		this.changeRegion = this.changeRegion.bind(this);
   		this.history = this.history.bind(this);
   		this.arry = [];
   		this.goForward = this.goForward.bind(this);
   		this.goBackward = this.goBackward.bind(this);
		
	}

	componentWillMount() {
        window.initMap = () => {
			const center = { lat: -25.363, lng: 131.044 };

			this.map = new window.google.maps.Map(document.getElementById('map'), {
				zoom: 4,
				center
			});

			this.marker = new window.google.maps.Marker({
				position: center,
				map: this.map,
			});

			this.map.addListener('click', this.changeRegion);
   
		};
	}

	componentDidMount() {
		config.getData('search', Object.assign({}, this.youtubeVideos, { location: '-25.363,131.044' })).then(res => this.props.newVideos(res));
	}

	changeRegion(e) {
		const lat = e.latLng.lat();
		const lng = e.latLng.lng();
		const location = `${lat}, ${lng}`;
		const current = {}; 
		const status = []; 
		this.marker.setPosition({ lat, lng });
		this.history(lat, lng);
		this.props.updateSpinner(true);
		config.getData('search', Object.assign({}, this.youtubeVideos, { location })).then(res => {
		this.props.newVideos(res)});
	}

	history(lat, lng) {
         var newData = {}
         newData.lat = lat;
         newData.lng = lng;
		 this.arry.push(newData);
	}

    goForward() {
   	 if ( this.arry.length > 0 ) {
         var currentV = {};
   	     currentV = this.arry.shift();
         const location = `${currentV.lat}, ${currentV.lng}`;
   	     this.marker.setPosition(currentV);
         config.getData('search', Object.assign({}, this.youtubeVideos, { location })).then(res => {
		 this.props.newVideos(res)});
         this.arry.push(currentV);
   	  }
   }

   goBackward() {
     if (  this.arry.length > 0 ) {
        var currentV = {};
   	    currentV = this.arry.shift();
   	    const location = `${currentV.lat}, ${currentV.lng}`;
   	    this.marker.setPosition(currentV);
   	    config.getData('search', Object.assign({}, this.youtubeVideos, { location })).then(res => {
		this.props.newVideos(res)});
        this.arry.push(currentV);
   	 }
   }

   render() {
		return (
           <div>
			 <GoogleMapContainer/>
			  <button onClick={this.goBackward}>Back</button>
			 <button onClick={this.goForward}>Forward</button>
			</div>
		);
	}
}

export default Map;



