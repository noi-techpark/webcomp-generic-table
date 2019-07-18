<template>
	<div class="row">
		<div class="col-md-3">
			<label class="form-check-label">
			<ul v-if="categories">
				<li v-for="(value, key) in categories" v-bind:key="key">
				<input
					class="form-check-input"
					type="checkbox"
					v-model="value.active"
					@change="stationTypesChanged(key, value.active)"
				/>
				{{ value.name }}
				</li>
			</ul>
			<p v-else>No station types or categories found!</p>
			</label>
		</div>
		<div class="col-md-9">
			<div class="map">
				<simple-map :data="markersGiven" searchKey="sname"></simple-map>
            </div>
		</div>
		<div id="errors">
			<ul v-if="errors && errors.length">
				<li v-for="(error, index) of errors" v-bind:key="index">{{ error.message }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SimpleMap from "../components/SimpleMap";

export default {
	name: "Map",
	components: {
    	SimpleMap
  	},
    data() {
        return {
			title: "Map",
			categories: {},
			markersGiven: [],
            errors: [],
        }
	},
	computed: {
    	...mapGetters(
			[
				"stationTypes",
				"stations",
				"markers",
				"markersChanged"
			]
		)
  	},
	watch: {
		stationTypes() {
			console.log("stationtypes changed")
			this.reloadStationTypes();
		},
		stations() {
			console.log("stations changed")
			this.markersGiven = this.stations.data;
		},
  	},
    methods: {
				...mapActions(
			[
				"fetchStationTypes",
				"fetchStations",
				"clearStations"
			]
		),
		stationTypesChanged(id, active) {
			let stationTypes = ""
			let something = false;
            this.categories.forEach((category) => {
				if (category.active) {
					stationTypes += category.name + ","
					something = true;
				}
			});
			if (something) {
				stationTypes = stationTypes.substring(0, stationTypes.length - 1)
				this.fetchStations(stationTypes);
			} else {
				this.clearStations();
			}
		},
		reloadStationTypes() {
			this.categories = [];
			if(this.stationTypes !== null) {
				this.stationTypes.forEach(key => {
					this.categories.push({
						id: this.categories.length + 1,
						active: false,
						name: key
					})
				})
			}
		}
    },
    async mounted() {
		this.fetchStationTypes();
    },
}
</script>

<style>
    @import url(https://unpkg.com/leaflet@1.2.0/dist/leaflet.css);

    .map {
        margin: 0 auto;
        height: 600px;
        width: 100%;
    }
    ul {
        list-style: none;
    }
</style>

