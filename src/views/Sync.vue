<template>
  <div class="container">
    <h1>Daftar Descriptors</h1>

    <table style="width: 85%">
      <tr>
        <th style="padding-left: 10px; padding-right: 10px">No</th>
        <th>Nama</th>
        <th>Status Whatsapp/ID</th>
        <th>Descriptors</th>
        <th>Action</th>
      </tr>

      <tr v-for="(face, i) in faces" :key="face.id">
        <td>{{ i + 1 }}</td>

        <td>
          <router-link :to="{ name: 'People_id', params: { id: face.id } }">
            {{ face.name }}
          </router-link>
        </td>
        <td>{{ face.idStatus }}</td>
        <td>{{ face.descriptors }}</td>
        <td>
          <button style="color: red" v-on:click="deleteFace(face)">X</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const axios = require("axios").default;
const config = require("../config/config.js").default;
const callbacks = require("../helper/helper").default;

export default {
  props: ["id"],
  data() {
    return {
      faces: [],
      faceStatus: {},
    };
  },
  created() {
    this.getAllFaces();
  },
  computed: {},
  methods: {
    is200() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem(config.localStorage.dataToken)}`;

      this.faces.forEach(async (f) => {
        let status = await axios
          .get(config.urls.person(f.id))
          .then((res) => {
            return res.status;
          })
          .catch((err) => {
            return err.response.status;
          });
        if (status == 401) {
          this.$router.push({ name: "Login" });
        }
        if (status == 200) {
          status = `OK`;
        }
        if (status == 404) {
          status = `Not Found`;
        }
        f.idStatus = status;
      });
    },
    getAllFaces() {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem(config.localStorage.gofaceToken)}`;
      axios
        .get(config.urls.allFace)
        .then((res) => {
          let data = res.data;
          this.faces = data.data;
          this.is200();
        })
        .catch((err) => {
          if (err.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
    deleteFace(item) {
      if (!confirm("Yakin?")) {
        return;
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem(config.localStorage.gofaceToken)}`;
      axios
        .delete(config.urls.face(item.id))
        .then((res) => {
          if (res.status == 200) {
            this.faces = this.faces.filter((people) => people !== item);
          }
        })
        .catch(function (err) {
          console.log(err.response);
          callbacks.unauth(err.response.status, err.response.data.message);
        });
    },
  },
};
</script>