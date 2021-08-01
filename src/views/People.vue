<template>
  <h1>People</h1>
  <div v-for="person in people" :key="person.id">
    <img :src="urlPeople + '/' + person.foto" :alt="person.nama" width="200" />
    <h3>{{ person.nama }}</h3>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  data() {
    return {
      people: "",
      urlPeople: "http://localhost:8080",
    };
  },
  created() {
    this.getAllPeople();
  },
  methods: {
    getAllPeople() {
      axios.get(this.urlPeople + "/api/people").then((res) => {
        let data = res.data
        console.log(data)
        this.people = data.data;
      });
    },
    deletePeopleById(id){
      axios.delete(this.urlPeople + "/api/people/"+id).then((res) => {
        let data = res.data
        if(data.status == 'success'){alert(data)}
      });
    }
  },
};
</script>