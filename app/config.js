async function getData(uri, parameters, fetch) {
	let mainURL = 'https://content.googleapis.com/youtube/v3/';
	if (parameters) {
		const parametersKeys = Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join('&');
		mainURL = `${mainURL}${uri}?${parametersKeys}`;
	}
	const Fetch = fetch || window.fetch;
	const promise = await Fetch(mainURL);
	const json = await promise.json();
	return json;
}

const service = {
	getData,
};

module.exports = service;

