<template>
	<div id="app" class="container-fluid h-100 p-0">
		<div id="nav">
			<router-link to="/table">Table</router-link> |
			<router-link to="/map">Map</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App"
};
</script>

<style>
@import url(https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap.min.css);

#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: left;
	color: #2c3e50;
}
#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
