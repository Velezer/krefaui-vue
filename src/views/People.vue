<template>
  <div class="container">
    <h1>Daftar Jamaah</h1>
    <div class="col-sm-5">
      <router-link :to="{ name: 'Register' }">
        <button type="button2" class="btn btn-primary">Register Jamaah</button>
      </router-link>
    </div>
    <div class="col-sm-5">
      <router-link :to="{ name: 'Events' }">
        <button type="button2" class="btn btn-primary">Database Events</button>
      </router-link>
      <h3></h3>
    </div>

    <table style="width: 85%">
      <tr>
        <th style="padding-left: 10px; padding-right: 10px">No</th>
        <th>Foto</th>
        <th>Nama</th>
        <th>Whatsapp</th>
        <th>Alamat</th>
        <th>Action</th>
      </tr>

      <tr v-for="(person, i) in people" :key="person.id">
        <td>{{ i + 1 }}</td>
        <td><img :src="person.foto" :alt="person.nama" width="100" /></td>
        <td>
          <router-link :to="{ name: 'People_id', params: { id: person.id } }">
            {{ person.nama }}
          </router-link>
        </td>
        <td>{{ person.whatsapp }}</td>
        <td>{{ person.alamat }}</td>
        <td>
          <!-- <button>edit</button> -->
          <button style="color: red" v-on:click="deletePeople(event)">X</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const axios = require("axios").default;
const config = require("../config/config.js").default;

export default {
  props: ["id"],
  data() {
    return {
      people: [],
    };
  },
  created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("access-token")}`;
    this.getAllPeople();
  },
  methods: {
    getAllPeople() {
      axios
        .get(config.urls.people)
        .then((res) => {
          let data = res.data;
          this.people = data.data;
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
    deletePeople(item) {
      if (!confirm("Yakin?")) {
        return;
      }
      axios
        .delete(config.urls.person(item.id))
        .then((res) => {
          if (res.status == 200) {
            this.events = this.events.filter((event) => event !== item);
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