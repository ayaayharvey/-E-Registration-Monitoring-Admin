import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Transactions from "../views/transactions/Transactions.vue";
import Tickets from "../views/tickets/Tickets.vue";
import Error from "../components/error/Error.vue";
// import Roles from "../views/admin/user-management/roles/Roles.vue";
// import Users from "../views/admin/user-management/users/Users.vue";
// import ExpenseCategories from "../views/admin/expense-management/ExpenseCategories.vue";
// import Expenses from "../views/admin/expense-management/Expenses.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
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
