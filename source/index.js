const createComponent = ({
	ui = ({ el }) => ({ el }), 
	init = () => ({ }), 
	update = () => ({ }),
	subscriptions = () => { },
	view = () => { }
}) => (el, options = {}) => {
	const cachedElements = ui({ el, options });
	let state = init({ ui: cachedElements });
	let history = [];

	const pushUpdate = (message, ...args) => {
		// create a copy of the current state
		const lastState = Object.assign({}, state);

		// get the patch function based on message and state
		const patchFn = update({ 
			message, 
			state, 
			lastState, 
			options 
		});

		// run the patch function to get the data 
		// needed to update the state
		const patch = patchFn(...args);

		// mutate the application state
		state = Object.assign({}, state, patch);

		// push the update to the history stack 
		history.push([message, ...args]);

		// view the current state
		view({ 
			ui: cachedElements, 
			update: patch, 
			state, 
			lastState,
			history, 
			options 
		});
	}

	subscriptions({ 
		ui: cachedElements, 
		state, 
		pushUpdate, 
		options 
	});
};