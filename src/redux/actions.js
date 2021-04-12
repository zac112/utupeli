import types from "./actionTypes";

export const updateTown = town => ({
	type: types.UPDATE_TOWN,
	payload: town
});

export const initialize = payload => ({
	type: types.INITIALIZE,
	payload
});

export const refresh = payload => ({
	type: types.REFRESH,
	payload
});

export const tick = payload => ({
	type: types.TICK,
	'nextTick':payload.nextTick
});

export const townchange = townid => ({
	type: types.TOWNCHANGE,
	payload:{townid:townid}
});
