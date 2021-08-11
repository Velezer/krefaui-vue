<template>
  <h1>People</h1>
  <div v-for="person in people" :key="person.id">
    <img :src="urlPeople + '/' + person.foto" :alt="person.nama" width="200" />
    <h3>{{ person }}</h3>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  props: ["id"],
  data() {
    return {
      people: [],
      urlPeople: "http://" + location.hostname + ":8080",
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
        .get(this.urlPeople + "/api/people")
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
    deletePeople(id) {
      axios
        .delete(this.urlPeople + "/api/people/" + id)
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