<template>
	<div>
		<h1><slot></slot></h1>
		<slot name="subtitle" v-bind:hey="hey"></slot>
		<ul v-if="stationTypes">
			<li v-for="(value, key) in stationTypes" v-bind:key="key">
				<input
					class="form-check-input"
					type="checkbox"
					:id="key"
					:value="value['active']"
					@change="toggleStationType(key)"
				/>
				<label :for="key">{{ value['name'] }}</label>
			</li>
		</ul>
		<p v-else>No station types or categories found!</p>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "Categories",
	data() {
		return {
			hey: 'hoi'
		}
	},
	computed: {
		...mapGetters(["stationTypes"])
	},
	methods: {
		...mapActions(["fetchStationTypes", "toggleStationType"]),
	},
	async mounted() {
		this.fetchStationTypes();
	}
};
</script>

<style>
ul {
	list-style: none;
}
</style>
