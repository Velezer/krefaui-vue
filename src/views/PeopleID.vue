<template>
  <div class="container">
    <table>
      <img
        :src="host + `/` + personData.foto"
        :alt="personData.nama"
        width="300"
      />
      <h3>{{ personData.nama }}</h3>
    </table>
    <h3>Pernah Menghadiri Event Berikut:</h3>
    <table style="width: 85%">
      <tr>
        <th style="padding-left: 10px; padding-right: 10px">No</th>
        <th>Judul</th>
        <th>Hadir Pada</th>
      </tr>

      <tr v-for="(event, i) in attendance" :key="event.id">
        <td>{{ i + 1 }}</td>
        <td>
          <router-link
            :to="{ name: 'Events_id', params: { id: event.id_events } }"
          >
            {{ event.judul }}
          </router-link>
        </td>
        <td>{{ event.hadir_pada }}</td>
      </tr>
    </table>
  </div>

  <br />
  <br />
  <br />
</template>


<script>
const axios = require("axios").default;
const config = require("../config/config.js").default;

export default {
  props: ["id"],
  data() {
    return {
      attendance: [],
      personData: [],
      host: config.baseImgUrl,
    };
  },
  created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem(config.localStorage.dataToken)}`;
    this.getAttendanceByPersonId(this.id);
  },
  methods: {
    getAttendanceByPersonId(id) {
      axios
        .get(config.urls.attendancePeople(id))
        .then((res) => {
          let data = res.data;
          this.attendance = data.data;
          this.personData = this.attendance[0];
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


<style>
@import "../assets/css/TableStyle.css";

.container {
  padding-top: 40px;
}

.container h1 {
  padding-bottom: 40px;
  text-align: center;
}

.container h3 {
  text-align: center;
  padding-bottom: 50px;
  padding: auto;
}
.col-sm-5 {
  padding-left: 180px;
}
</style>
