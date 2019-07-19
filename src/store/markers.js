const SET_MARKER = "SET_MARKER";
const REMOVE_MARKER = "REMOVE_MARKER";
const CLEAR = "CLEAR";

export default {
	state: {
		markers: {},
		changed: false
	},
	mutations: {
		[SET_MARKER](state, { markerId, marker }) {
			state.markers[markerId] = marker;
			state.changed = !state.changed;
		},
		[REMOVE_MARKER](state, markerId) {
			delete state.markers[markerId];
			state.changed = !state.changed;
		},
		[CLEAR](state) {
			state.markers = null;
			state.changed = !state.changed;
		}
	},
	actions: {
		addMarker({ commit }, { markerId, marker }) {
			// console.log(markerId + " ::: " + marker);
			commit(SET_MARKER, { markerId, marker });
		},
		removeMarker({ commit }, markerId) {
			commit(REMOVE_MARKER, markerId);
		},
		clear({ commit }) {
			commit(CLEAR);
		}
	},
	getters: {
		markers(state) {
			return state.markers;
		},
		markersChanged(state) {
			return state.changed;
		}
	}
};
