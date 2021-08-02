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
  props: ['id'],
  data() {
    return {
      people: "",
      urlPeople: "http://"+location.hostname+":8080",
    };
  },
  created() {
    this.getAllPeople();
  },
  methods: {
    getAllPeople() {
      console.log(this.urlPeople)
      axios.get(this.urlPeople + "/api/people").then((res) => {
        let data = res.data
        console.log(data)
        this.people = data.data;
      });
    },
    deletePeople(id){
      axios.delete(this.urlPeople + "/api/people/"+id).then((res) => {
        let data = res.data
        if(data.status == 'success'){alert(data)}
      });
    }
  },
};
</script>