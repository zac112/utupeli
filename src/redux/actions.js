import { INITIALIZE, BUILD_BUILDING, REFRESH } from "./actionTypes";

export const build_building = content => ({
  type: BUILD_BUILDING,
  payload: {    
    content
  }
});

export const initialize = payload => ({
	type: INITIALIZE,
	payload
});

export const refresh = payload => ({
	type: REFRESH,
	payload
});