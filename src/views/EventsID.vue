<template>
  <div class="container">
    <h1>Daftar Peserta <br />{{ eventName }}</h1>
    <div class="col-sm-5"></div>
    <div class="col-sm-5">
      <h3>Hari : Senin,1 Juni 2021</h3>
    </div>

    <table style="width: 85%">
      <tr>
        <th style="padding-left: 10px; padding-right: 10px">No</th>
        <th>Nama</th>
        <th>Hadir Pada</th>
      </tr>

      <tr v-for="(person, i) in attendance" :key="person.id">
        <td>{{ i + 1 }}</td>
        <td>
          <router-link :to="{ name: 'People_id', params: { id: person.id } }">
            {{ person.nama }}
          </router-link>
        </td>
        <td>{{ person.hadir_pada }}</td>
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
  props: ["id"],
  data() {
    return {
      attendance: [],
      baseAPIURL: `http://${location.hostname}:8080`,
      eventName: "",
    };
  },
  created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access-token")}`;
    this.getAttendanceById(this.id);
  },
  methods: {
    getAttendanceById(id) {
      axios
        .get(`${this.baseAPIURL}/api/attendance/events/${id}`)
        .then((res) => {
          let data = res.data;
          this.attendance = data.data;
          this.eventName = this.attendance[0]["judul"];
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
    deleteAttendance(id) {
      axios
        .delete(this.baseAPIURL + "/api/attendace/" + id)
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
