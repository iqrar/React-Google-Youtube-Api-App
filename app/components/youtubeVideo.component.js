import React, { PureComponent } from 'react';
import styled from 'styled-components';

const YoutubeVideoContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	& > img {
		flex: 2;
	}
	& > div {
		flex-direction: column;
		padding: 10px;
		flex: 8;
		position: relative;
		display: flex;
		p {
			text-overflow: ellipsis;
            line-height: 19.3px;
		    height: 60px;
            overflow: hidden;
        }
	}
`;

class YoutubeVideo extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<YoutubeVideoContainer>
				<img src={this.props.data.snippet.thumbnails.medium.url}
				    className='float-left'
					alt={this.props.data.snippet.title}
				/>
				<div>
					<h6>{this.props.data.snippet.title}</h6>
					<p>{this.props.data.snippet.description}</p>
				</div>
			</YoutubeVideoContainer>
		);
	}
}

export default YoutubeVideo;

