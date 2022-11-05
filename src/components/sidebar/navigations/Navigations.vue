<template>
  <div class="py-5">
    <div v-for="navigation in navigations">
      <div v-if="navigation.child.length === 0">
        <router-link :to="navigation.path" class="cursor-pointer">
          <Navigation :navigation="navigation" />
        </router-link>
      </div>
      <div v-else>
        <Navigation :navigation="navigation" />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation.vue";
export default {
  name: "Navigations",
  data() {
    return {
      navigations: [],
    };
  },
  components: {
    Navigation,
  },
  created() {
    this.navigations = [
      {
        title: "Dashboard",
        icon: "fas fa-chart-area",
        path: "/",
        child: [],
      },
      {
        title: "Transactions",
        icon: "fas fa-user",
        path: "/transactions",
        child: [],
      },
      {
        title: "Tickets",
        icon: "fas fa-user",
        path: "/tickets",
        child: [],
      },
      // {
      //   title: "Expense Management",
      //   icon: "fas fa-calculator  ",
      //   child: [
      //     {
      //       title: "Expense Categories",
      //       icon: "fas fa-circle",
      //       path: "/expense-management/expense-categories",
      //     },
      //     {
      //       title: "Expenses",
      //       icon: "fas fa-circle",
      //       path: "/expense-management/expenses",
      //     },
      //   ],
      // },
    ];
  },
};
</script>
