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
				icon: "fa fa-chart-area",
				path: "/",
				child: [],
			},
			{
				title: "Master",
				icon: "fa fa-calculator",
				child: [
					{
						title: "Page Master",
						icon: "fa fa-circle",
						path: "/master/page",
					},
					{
						title: "Event Category",
						icon: "fa fa-circle",
						path: "/master/event-category",
					},
					{
						title: "Payment Category",
						icon: "fa fa-circle",
						path: "/master/payment-category",
					},
					{
						title: "Ticket Category",
						icon: "fa fa-circle",
						path: "/master/ticket-category",
					},
					{
						title: "Module Access",
						icon: "fa fa-circle",
						path: "/master/module-access",
					},
					{
						title: "Event Status",
						icon: "fa fa-circle",
						path: "/master/event-status",
					},
					{
						title: "Event Rate Percentage",
						icon: "fa fa-circle",
						path: "/master/event-rate-percentage",
					},
				],
			},
			{
				title: "Tickets",
				icon: "fa fa-user",
				path: "/tickets",
				child: [],
			},
		];
	},
};
</script>
