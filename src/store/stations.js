import { callGet } from '../api/ninjaApi';

const SET_STATION_TYPES = 'SET_STATION_TYPES'
const SET_STATIONS = 'SET_STATIONS'
const SET_STATION = 'SET_STATION'
const CLEAR_STATIONS = 'CLEAR_STATIONS'
const CLEAR = 'CLEAR'

export default {
	state: {
		stationTypes: null,
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
				.then((response) => {
					commit(SET_STATION_TYPES, response)
				})
				.catch(() => {
					commit(CLEAR)
				})
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
					commit(SET_STATIONS, response)
				})
				.catch(e => {
					commit(CLEAR)
				});
		},
		fetchStation({ commit }) {
			/* not implemented yet */
			return null;
		},
		clearStations({ commit }) {
			commit(CLEAR_STATIONS)
		},
		clear({ commit }) {
			commit(CLEAR)
		}
	},
	getters: {
		stationTypes(state) {
			return state.stationTypes;
		},
		stations(state) {
			return state.stations
		},
		getError(state) {
			return state.error
		},
		station(state) {
			return state.station
		},
	}
}
