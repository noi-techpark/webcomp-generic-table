import Vue from "vue";
import Router from "vue-router";
import TableView from "./views/TableView.vue";
import MapView from "./views/MapView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/table",
      name: "table",
      component: TableView
    },
    {
      path: "/map",
      name: "map",
      component: MapView
    }

  ]
});
