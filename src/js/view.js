import { reactive } from "vue";

export const view = reactive({
  event_details: {},
  set(data) {
    this.event_details = data;
    console.log(this.event_details);
  },
  methods: {
    getEvents() {
      fetch("../../../sample.json")
        .then((response) => response.json())
        .then((data) => (this.events = data));
    },
  },
  mounted() {
    this.getEvents();
  },
});
