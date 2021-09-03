<template>
  <div class="container">
    <h1>Daftar Peserta <br />{{ eventName }}</h1>
    <div class="col-sm-5">
      <router-link :to="{ name: 'Presensi', params: { id: id }  }">
        <button type="button2" class="btn btn-primary">Presensi</button>
      </router-link>
    </div>
    <div class="col-sm-5">
      <router-link :to="{ name: 'PresensiTanpa' }">
        <button type="button2" class="btn btn-primary">Presensi Tanpa Wajah</button>
      </router-link>
      <h3></h3>
    </div>

    <table style="width: 85%">
      <tr>
        <th style="padding-left: 10px; padding-right: 10px">No</th>
        <th>Nama</th>
        <th>Hadir Pada</th>
        <th>Action</th>
      </tr>

      <tr v-for="(person, i) in attendance" :key="person.id">
        <td>{{ i + 1 }}</td>
        <td>
          <router-link :to="{ name: 'People_id', params: { id: person.id_people } }">
            {{ person.nama }}
          </router-link>
        </td>
        <td>{{ person.hadir_pada }}</td>
        <td>
          <button style="color: red" v-on:click="deletePresence(person)">
            X
          </button>
        </td>
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
const callbacks = require("../helper/helper").default;

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
    ] = `Bearer ${localStorage.getItem(config.localStorage.dataToken)}`;
    this.getAttendanceById(this.id);
  },
  methods: {
    deletePresence(item){
      if (!confirm("Yakin?")) {
        return;
      }
      axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem(config.localStorage.dataToken)}`;
      axios
        .delete(config.urls.deleteAttendance(item.id_events,item.id_people))
        .then((res) => {
          if (res.status == 200) {
            this.attendance = this.attendance.filter((att) => att !== item);
            axios.delete(config.urls.face(item.id)).then();
          }
        })
        .catch((err) => {
          console.log(err.response);
          callbacks.unauth(err.response.status, err.response.data.message);
        });
    },
    getAttendanceById(id) {
      axios
        .get(`${this.baseAPIURL}/api/attendance/events/${id}`)
        .then((res) => {
          console.log(res)

          let data = res.data;
          this.attendance = data.data;
          this.eventName = this.attendance[0]["judul"];
        })
        .catch((err) => {
          console.log(err.response)
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
