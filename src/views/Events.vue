<template>
  <div class="container">
    <h1>Daftar Events</h1>
    <div class="col-sm-5">
      <router-link :to="{ name: 'NewEvent' }">
        <button type="button2" class="btn btn-primary">Buat Event Baru</button>
      </router-link>
    </div>
    <div class="col-sm-5">
      <router-link :to="{ name: 'People' }">
        <button type="button2" class="btn btn-primary">Database Jamaah</button>
      </router-link>
      <h3></h3>
    </div>

    <table style="width: 85%">
      <tr>
        <th style="padding-left: 10px; padding-right: 10px">No</th>
        <th>Judul</th>
        <th>Pembicara</th>
        <th>Tempat</th>
        <th>Tanggal</th>
      </tr>

      <tr v-for="(event, i) in events" :key="event.id">
        <td>{{ i + 1 }}</td>
        <td>
          <router-link :to="{ name: 'Events_id', params: { id: event.id } }">
            {{ event.judul }}
          </router-link>
        </td>
        <td>{{ event.pembicara }}</td>
        <td>{{ event.tempat }}</td>
        <td>{{ event.tanggal }}</td>
      </tr>
    </table>
  </div>

  <br />
  <br />
  <br />
</template>


<script>
const axios = require("axios").default;

export default {
  // props: ["id"],
  data() {
    return {
      events: [],
      urlEvents: `http://${location.hostname}:8080`,
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
          this.events = data.data.reverse();
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