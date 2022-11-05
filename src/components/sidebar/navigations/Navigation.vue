<template>
	<button
		@click="toggleChild()"
		class="w-full hover:bg-white hover:text-gray-700 hover:font-semibold flex justify-between px-3 py-2 rounded content-center transition"
	>
		<div class="flex">
			<span class="pr-2">
				<i :class="navigation.icon"></i>
			</span>
			<h3 class="font-semibold">
				{{ navigation.title }}
			</h3>
		</div>
		<span
			class="pr-2 right"
			v-show="navigation.child.length !== 0"
		>
			<i :class="`${showChild ? 'fas fa-angle-down' : 'fas fa-angle-up'}`"></i>
		</span>
	</button>
	<button
		v-show="showChild"
		v-for="child in navigation.child"
		class="w-full px-3"
	>
		<router-link
			:to="child.path"
			class="flex px-3 py-1 hover:bg-white hover:text-gray-700 hover:font-semibold rounded cursor-pointer transition"
		>
			<span class="pr-3">•</span>
			<h3 class="font-semibold">
				{{ child.title }}
			</h3>
		</router-link>
	</button>
</template>

<script>
export default {
	name: "Navigation",
	props: {
		navigation: Object,
	},
	data() {
		return {
			showChild: false,
		};
	},
	methods: {
		toggleChild() {
			this.showChild = !this.showChild;
		},
	},
};
</script>
