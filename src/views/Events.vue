<template>
  <h1>Events</h1>
  <div v-for="event in events" :key="event.id">
    <router-link :to="{ name: 'Events_id', params:{id:event.id }} ">{{ event.judul }}</router-link>
  </div>
</template>


<script>
const axios = require("axios").default;

export default {
  props: ["id"],
  data() {
    return {
      events: [],
      urlEvents: "http://" + location.hostname + ":8080",
    };
  },
  created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access-token")}`;
    this.getEvents();
  },
  methods: {
    getEvents() {
      console.log(this.urlEvents + "/api/events");
      axios
        .get(this.urlEvents + "/api/events")
        .then((res) => {
          let data = res.data;
          this.events = data.data;
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
    deleteEvents(id) {
      axios
        .delete(this.urlEvents + "/api/events/" + id)
        .then((res) => {
          let data = res.data;
          if (data.status == "success") {
            alert(data);
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
};
</script>