import React, { PureComponent } from 'react';
import GoogleMap from './components/googleMap.component';
import YoutubeVideo from './components/youtubeVideo.component';
import Spinner from './components/spinner.component';

class App extends PureComponent {

	constructor(props) {
		super(props);
		this.updateSpinner = this.updateSpinner.bind(this);
		this.newVideos = this.newVideos.bind(this);
			this.state = {
			tokenId: '',
			loading: true,
			data: null
		};
	}

	componentDidMount() {
		window.onSignIn = (googleUser) => {
			const tokenId = googleUser.getAuthResponse().id_token;
			this.setState({ tokenId });
		};

		setTimeout(() => {
			this.setState({ loading: false });
		}, 3000);
	}

	youtubeVideos() {
		if (this.state.data.items.length) {
			return this.state.data.items.map(item => (
				<YoutubeVideo
					tokenId={this.state.tokenId}
					data={item}
					key={item.id.videoId}
				/>
			));
		}
		return <p>Sorry no video available</p>;
	}

	newVideos(data) {
		this.setState({ data, loading: false });
	}

	updateSpinner(loading) {
		this.setState({ loading });
	}

	render() {
		return (
			<div>
				{this.state.loading && <Spinner loading={this.state.loading} />}
				<GoogleMap
					newVideos={this.newVideos}
					updateSpinner={this.updateSpinner}
				/>
				<br />
				<div className="col-12">
					{this.state.data && this.youtubeVideos()}
				</div>
			</div>
		);
	}
}

export default App;
