
// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
	crear: (item) => {
		//return { type: types.CREAR, payload: item }
		return 2;
	},
}


export const reducer = (state = initialState, action) => {
	const { pedidos } = state
	const { type, payload } = action

	switch (type) {
		case types.CREAR: {
			return {
				...state,
				pedidos: [payload, ...pedidos],
			}
		}
		case types.REMOVE: {
			return {
				...state,
				pedidos: pedidos.filter((pedido, i) => i !== payload),
			}
		}
	}

	return state
}