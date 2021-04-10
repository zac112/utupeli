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
	case types.BUILD_BUILDING: {
		console.log("BUILD",state)
		const { town, building } = action.payload.content;
		let queue = {...state.town.buildqueue}
		Object.keys(building).forEach(b => {
			console.log('key:',b, queue);
			if(!queue[b]){
				queue[b] = building[b];
			}else{
				queue[b] += building[b];
			}
		});    
    var newState = {
        ...state        
    };
	console.log("newstate",newState)
	newState['towns'][town]['buildqueue'] = queue;
	console.log("newstate",newState)
	return newState;
    }
	case types.TOWNCHANGE:{
		return {
			...state,
			'town':state.towns[action.payload.townid]
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
