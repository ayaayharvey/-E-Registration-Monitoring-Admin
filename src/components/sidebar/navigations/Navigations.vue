<template>
	<div class="py-5">
		<div v-for="navigation in navigations">
			<div v-if="navigation.child.length === 0">
				<router-link
					:to="navigation.path"
					class="cursor-pointer"
				>
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
				title: "Master",
				icon: "fas fa-calculator  ",
				child: [
					{
						title: "Page Master",
						icon: "fas fa-circle",
						path: "/master/page",
					},
					{
						title: "Event Category",
						icon: "fas fa-circle",
						path: "/master/event-category",
					},
					{
						title: "Payment Category",
						icon: "fas fa-circle",
						path: "/master/payment-category",
					},
					{
						title: "Ticket Category",
						icon: "fas fa-circle",
						path: "/master/ticket-category",
					},
					{
						title: "Access",
						icon: "fas fa-circle",
						path: "/master/access",
					},
					{
						title: "Event Status",
						icon: "fas fa-circle",
						path: "/master/event-status",
					},
					{
						title: "Event Rate Percentage",
						icon: "fas fa-circle",
						path: "/master/event-rate-percentage",
					},
				],
			},
			{
				title: "Tickets",
				icon: "fas fa-user",
				path: "/tickets",
				child: [],
			},
		];
	},
};
</script>
