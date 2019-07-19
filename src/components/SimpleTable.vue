<template>
	<div class="simple-table">
		<div class="col p-0 h-100 text-left search-container">
			<input type="text" v-model="search" placeholder="Search" />

			<table class="col p-0 h-100">
				<thead>
					<th v-for="(col, index) in cols" :key="index">
						{{ col.title || "" }}
					</th>
				</thead>
				<tbody>
					<tr v-for="(row, index) in filteredData" :key="index">
						<td v-for="(col, index) in cols" :key="index">
							{{ row[col.key] }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			search: "",
			filteredData: []
		};
	},
	props: {
		cols: {
			type: Array,
			default: () => []
		},
		data: {
			type: Array,
			default: () => []
		},
		searchKey: {
			type: String,
			default: () => "name"
		}
	},
	methods: {
		reloadTableData() {
			if (this.search == "") {
				this.filteredData = this.data;
			} else {
				this.filteredData = this.data
					.slice(0)
					.filter(row => {
						return typeof row !== "undefined";
					})
					.filter(row => {
						return row[this.searchKey]
							.toLowerCase()
							.includes(this.search.toLowerCase());
					});
			}
		}
	},
	watch: {
		search() {
			this.reloadTableData();
		},
		data() {
			this.reloadTableData();
		}
	},
	async mounted() {
		this.search = "";
		this.reloadTableData();
	}
};
</script>
