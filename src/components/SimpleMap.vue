<template>
    <div class="simple-map">
		<div class="col p-0 h-100 text-left search-container">
			<input type="text" v-model="search" placeholder="Search" />
			<div id="map" class="map"></div>
		</div>
		<div id="d">
			<ul v-if="filteredData && filteredData.length">
				<li v-for="(error, index) of filteredData" v-bind:key="index">
					{{
						error.sname
						+ " ["
						+ error.scoordinate.x
						+ ", "
						+ error.scoordinate.y
						+ "]"
					}}
				</li>
			</ul>
		</div>
    </div>

</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
	components: {
        L,
        LMap,
        LTileLayer,
        LMarker
    },
    data() {
        return {
            search: '',
			filteredData: [],
			map: null,
			markers: {},
			tileLayer: null
        }
    },
    props: {
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
            if (this.search == '') {
                this.filteredData = this.data
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
			this.updateMarkers();
		},
		updateMarkers() {
			if (!this.map) {
				return;
			}
			for (let id in this.markers) {
				let marker = this.markers[id];
				marker.leafletObj.removeFrom(this.map);
				marker.active = false;
			}
			this.filteredData.forEach((row) => {
				if (row && row.scoordinate && row.scoordinate.x > 0 && row.scoordinate.y > 0) {
					// console.log(row)
					let type = row.stype;
					let name = row.scode;

					if (this.markers[type+"_"+name]) {
						this.markers[type+"_"+name].active = true;
					} else {
						let marker = L.marker(
							[
								row.scoordinate.y,
								row.scoordinate.x
							]
						).bindPopup(name);

						this.markers[type+"_"+name] = {
							active: true,
							leafletObj: marker
						}
					}
				}
			});
			for (let id in this.markers) {
				let marker = this.markers[id]
				if (marker.active) {
					marker.leafletObj.addTo(this.map);
				}
			}
		},
        initMap() {
			this.map = L.map("map").setView([46.49067, 11.33982], 8);
            this.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
				maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
			});
			this.tileLayer.addTo(this.map);
		},
		initMarkers() {
			if (!this.map) {
				return;
			}
			this.data.forEach((row) => {
				if (row && row.scoordinate && row.scoordinate.x > 0 && row.scoordinate.y > 0) {
					// console.log(row)
					let type = row.stype;
					let name = row.scode;

					if (! this.markers[type+"_"+name]) {
						let marker = L.marker(
							[
								row.scoordinate.y,
								row.scoordinate.x
							]
						).bindPopup(type + ": " + name);

						this.markers[type+"_"+name] = {
							active: false,
							leafletObj: marker
						}
					}
				}
			});
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
        this.search = '';
		this.reloadTableData();
		this.initMap();
		this.initMarkers();
    }
}
</script>
