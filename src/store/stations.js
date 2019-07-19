import { callGet } from "../api/ninjaApi";
import { stat } from "fs";

const SET_STATION_TYPES = "SET_STATION_TYPES";
const TOGGLE_STATION_TYPE = "TOGGLE_STATION_TYPE";
const SET_STATIONS = "SET_STATIONS";
const SET_STATION = "SET_STATION";
const CLEAR_STATIONS = "CLEAR_STATIONS";
const CLEAR = "CLEAR";

export default {
	state: {
		stationTypes: null,
		stationTypesState: null,
		stations: null,
		station: null,
		errors: []
	},
	mutations: {
		[SET_STATION](state, station) {
			state.station = station;
		},
		[SET_STATIONS](state, stations) {
			state.stations = stations;
		},
		[SET_STATION_TYPES](state, stationTypes) {
			state.stationTypes = stationTypes;
			state.stationTypesState = stationTypes.map((_ => {
				return false;
			}));
		},
		[TOGGLE_STATION_TYPE](state, key) {
			state.stationTypesState[key] = !state.stationTypesState[key];
		},
		[CLEAR_STATIONS](state) {
			state.station = null;
			state.stations = [];
		},
		[CLEAR](state) {
			state.station = null;
			state.stations = null;
			state.stationTypes = null;
		}
	},
	actions: {
		async fetchStationTypes({ commit }) {
			return callGet("/")
				.then(response => {
					commit(SET_STATION_TYPES, response);
				})
				.catch(() => {
					commit(CLEAR);
				});
		},
		async toggleStationType({ commit, state }, key) {
			commit(TOGGLE_STATION_TYPE, key);
		},
		async fetchStations({ commit }, st) {
			if (!st) {
				st = "*";
			}
			return callGet("/flat/" + st, {
				limit: -1,
				select: "scode,stype,sname,sorigin,scoordinate",
				where: "scoordinate.neq.null,sactive.eq.true",
				distinct: true
			})
				.then(response => {
					commit(SET_STATIONS, response);
				})
				.catch(e => {
					commit(CLEAR);
				});
		},
		fetchStation({ commit }) {
			/* not implemented yet */
			return null;
		},
		clearStations({ commit }) {
			commit(CLEAR_STATIONS);
		},
		clear({ commit }) {
			commit(CLEAR);
		}
	},
	getters: {
		stationTypes(state) {
			if (state.stationTypes === null) {
				return null;
			}

			return state.stationTypes.map((value, index) => {
				return {
					name: value,
					active: state.stationTypesState[index]
				}
			});
		},
		stationTypesState(state) {
			return state.stationTypesState;
		},
		stations(state) {
			return state.stations;
		},
		getError(state) {
			return state.error;
		},
		station(state) {
			return state.station;
		}
	}
};
