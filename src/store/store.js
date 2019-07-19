import Vue from "vue";
import Vuex from "vuex";

import stations from "./stations";
import markers from "./markers";

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [],
	modules: {
		stations,
		markers
	}
});
