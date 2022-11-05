import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/dashboard/Dashboard.vue";
import PageMaster from "../views/page-master/PageMaster.vue";
import Error from "../components/error/Error.vue";

const routes = [
	{
		path: "/",
		name: "Dashboard",
		component: Dashboard,
	},
	{
		path: "/master",
		children: [
			{
				path: "page",
				name: "Page Master",
				component: PageMaster,
			},
		],
	},
	// {
	//   path: "/:id/:path",
	//   name: "Event",
	//   component: Event,
	//   props: (route) => ({ id: parseInt(route.params.id) }),
	// },
	{
		path: "/:catchAll(.*)",
		name: "Error",
		component: Error,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});
export default router;
