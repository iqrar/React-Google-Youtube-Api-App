import React from 'react';
import styled from 'styled-components';
import spinnerSvg from './../images/spinner.svg';

const Spinner = () => {
	const SpinnerContainer = styled.div`
	    align-items: center;
		z-index: 1;
		position: fixed;
		left: 0;
		display: flex;
		justify-content: center;
		background: rgba(0, 0, 0, 0.7);
		width: 100vw;
		height: 100vh;
	`;

	return (
		<SpinnerContainer>
			<img src={spinnerSvg} alt='Getting video' />
		</SpinnerContainer>
	);

};

export default Spinner;
