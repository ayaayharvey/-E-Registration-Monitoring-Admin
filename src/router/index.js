import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/dashboard/Dashboard.vue";
// import PageMaster from "../views/page-master/PageMaster.vue";
import EventCategory from "../views/master/event-category/EventCategory.vue";
import PaymentCategory from "../views/master/payment-category/PaymentCategory.vue";
import TicketCategory from "../views/master/ticket-category/TicketCategory.vue";
import EventStatus from "../views/master/event-status/EventStatus.vue";
import EventRatePercentage from "../views/master/event-rate-percentage/EventRatePercentage.vue";
import Roles from "../views/master/roles/Roles.vue";
import ModuleAccess from "../views/roles/module-access/ModuleAccess.vue";
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
			// {
			// 	path: "page",
			// 	name: "Page Master",
			// 	component: PageMaster,
			// },
			{
				path: "event-category",
				name: "Event Category",
				component: EventCategory,
			},
			{
				path: "payment-category",
				name: "Payment Category",
				component: PaymentCategory,
			},
			{
				path: "ticket-category",
				name: "Ticket Category",
				component: TicketCategory,
			},
			// {
			// 	path: "event-status",
			// 	name: "Event Status",
			// 	component: EventStatus,
			// },
			{
				path: "event-rate-percentage",
				name: "Event Rate Percentage",
				component: EventRatePercentage,
			},
			{
				path: "roles",
				name: "Roles",
				component: Roles,
			},
		],
	},
	{
		path: "/roles",
		children: [
			{
				path: "module-access",
				name: "Module Access",
				component: ModuleAccess,
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
