<template>
  <div>
    <div class="container">
      <h1>Daftar Events</h1>
      <div class="col-sm-5">
        <router-link :to="{ name: 'NewEvent' }">
          <button type="button2" class="btn btn-primary">
            Buat Event Baru
          </button>
        </router-link>
      </div>
      <div class="col-sm-5">
        <router-link :to="{ name: 'People' }">
          <button type="button2" class="btn btn-primary">
            Database Jamaah
          </button>
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
          <th>Action</th>
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
          <td>
            <!-- <button>edit</button> -->
            <button style="color: red" v-on:click="deleteEvents(event)">
              X
            </button>
          </td>
        </tr>
      </table>
    </div>

    <br />
    <br />
    <br />
  </div>
</template>


<script>
const axios = require("axios").default;
const config = require("../config/config.js").default;

export default {
  // props: ["id"],
  data() {
    return {
      events: {},
    };
  },
  created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem(config.localStorage.dataToken)}`;
    this.getEvents();
  },
  methods: {
    getEvents() {
      axios
        .get(config.urls.events)
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
    deleteEvents(item) {
      if (!confirm("Yakin?")) {
        return;
      }
      axios
        .delete(config.urls.event(item.id))
        .then((res) => {
          if (res.status == 200) {
            this.events = this.events.filter((event) => event !== item);
          }
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
};
</script>