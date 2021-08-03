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
      token: '7963fdc99d914b88daa2c53f015f113794da0a72'
    };
  },
  created() {
    this.getAllPeople();
  },
  methods: {
    getAllPeople() {
      console.log(this.urlPeople);
      axios
        .get(this.urlPeople + "/api/people", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          let data = res.data;
          console.log(data);
          this.people = data.data;
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    deletePeople(id) {
      axios.delete(this.urlPeople + "/api/people/" + id).then((res) => {
        let data = res.data;
        if (data.status == "success") {
          alert(data);
        }
      });
    },
  },
};
</script>