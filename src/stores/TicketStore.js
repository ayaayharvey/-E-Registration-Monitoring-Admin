import { defineStore } from "pinia";

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    events: [],
    event: [],
    loading: false,
  }),
  getters: {
    //   getEvent: (state) => {
    //     return (eventId) => state.events.find((event) => event.id === eventId);
    //   },
    getEvent: (state) => {
      return (eventId) => (state.event_id = eventId);
      // console.log("this.event_id", this.event_id);
    },
  },
  actions: {
    async getEvents() {
      this.loading = true;
      const res = await fetch("http://localhost:3000/events");
      const data = await res.json();
      this.events = data;
      console.log("fetching", this.events);
      this.loading = false;
    },

    async fetchEvent(id) {
      this.loading = true;
      const res = await fetch("http://localhost:3000/events/" + id);
      const data = await res.json();
      this.event = data;
      console.log("fetching 1 event", this.event);
      this.loading = false;
    },
  },
});

// import { reactive } from "vue";
// export const view = reactive({
//   event_details: {},
//   set(data) {
//     this.event_details = data;
//     console.log(this.event_details);
//   },
//   methods: {
//     getEvents() {
//       fetch("../../../sample.json")
//         .then((response) => response.json())
//         .then((data) => (this.events = data));
//       // .then((data) => console.log(data));
//     },
//   },
//   mounted() {
//     this.getEvents();
//   },
// });
