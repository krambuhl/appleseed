import assign from 'object-assign';

export default ({
	ui = ({ el }) => ({ el }), 
	init = () => ({}), 
	update = () => ({}),
	subscriptions = () => {},
	view = () => {}
}) => (el, options = {}) => {
	const cachedElements = ui({ el, options });
	let state = init({ ui: cachedElements });
	let history = [];

	// define a function that pushes data through the component
	// subscriptions will be given this function to update 
	// the components state data
	const pushUpdate = (message, ...args) => {
		// create a copy of the current state
		const lastState = assign({}, state);

		// get the patch function based on message and state
		const patchFn = update({ 
			message, 
			state, 
			lastState, 
			options 
		});

		// run the patch function to get the data 
		// needed to update the state
		const patch = typeof patchFn === 'function' ? patchFn(...args) : {};

		// mutate the application state by applying
		// the patch to the current state data
		assign(state, patch);

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