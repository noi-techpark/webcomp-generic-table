<template>
	<div class="row">
		<div class="col-md-3">
			<label class="form-check-label">
			<ul v-if="categories && categories.length">
				<li v-for="(stationType, index) of categories" v-bind:key="index">
				<input
					class="form-check-input"
					type="checkbox"
					v-model="stationType.active"
					@change="stationTypesChanged(stationType.id, stationType.active)"
				/>
				{{ stationType.name }}
				</li>
			</ul>
			<p v-else>No station types or categories found!</p>
			</label>
		</div>
		<div class="col-md-9">
			<div class="table">
			<simple-table :cols="tableCols" :data="tableData" searchKey="sname" />
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
import SimpleTable from "../components/SimpleTable";

export default {
	name: "Table",
  	components: {
    	SimpleTable
  	},
  	data() {
    	return {
			title: "Table",
			categories: [],
			tableData: [],
			errors: [],
			tableCols: [
				{
					title: "Category",
					key: "stype"
				},
				{
					title: "Name",
					key: "sname"
				},
				{
					title: "Origin",
					key: "sorigin"
				}
			]
		};
	},
	computed: {
    	...mapGetters(
			[
				"stationTypes",
				"stations"
			]
		)
  	},
  	watch: {
		stationTypes() {
			this.reloadStationTypes();
		},
		stations() {
			this.tableData = this.stations.data;
		}
  	},
  	methods: {
		...mapActions(
			[
				"fetchStationTypes",
				"fetchStations"
			]
		),
		stationTypesChanged(id, active) {
			let stationTypes = ""
            this.categories.forEach((category) => {
				if (category.active)
					stationTypes += category.name + ","
			});
			stationTypes = stationTypes.substring(0, stationTypes.length - 1)
			this.fetchStations(stationTypes);
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
  	mounted() {
		this.fetchStationTypes();
		this.fetchStations();
	}
};
</script>

<style>
table {
  margin: 0 auto;
}
</style>

