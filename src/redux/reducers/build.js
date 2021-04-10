import { INITIALIZE, BUILD_BUILDING, REFRESH } from "../actionTypes";

const initialState = {};

export default function(state = initialState, action) {
	console.log(state);
	console.log("action",action);
  switch (action.type) {
	case INITIALIZE:{
		return ({...action.payload})	
	}
	case REFRESH:{
		return ({
			...state,
			...action.payload
		});
	}
	case BUILD_BUILDING: {
		const { town, building } = action.payload.content;
		let buildings = state.town.buildqueue;
		if (!buildings) buildings = {}
		Object.keys(building).forEach(b => {
			console.log('key:',b, buildings);
			if(!buildings[b]){
				buildings[b] = building[b];
			}else{
				buildings[b] += building[b];
			}
		});    
    return {
        ...state,
        
    };
    }	
    default:
		return state;
  }
}
