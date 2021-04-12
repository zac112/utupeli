import types from "../actionTypes";

const initialState = {};

export default function(state = initialState, action) {
	console.log(state);
	console.log("action",action);
  switch (action.type) {
	case types.INITIALIZE:{
		return ({...action.payload})	
	}
	case types.REFRESH:{
		return ({
			...state,
			...action.payload
		});
	}
	case types.UPDATE_TOWN:{
		
		let newState = {...state};
		newState.towns[state.townIndex] = action.payload
		return(newState);
		
	}
	case types.TOWNCHANGE:{
		return {
			...state,
			'townIndex':action.payload.townid
		}
	}
	case types.TICK:{
		return({
			...state,
			'nextTick':action.nextTick
		})
	}
    default:
		return state;
  }
}
