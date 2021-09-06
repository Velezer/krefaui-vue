<template>
  <div class="container text-center">
    <img src="@/assets/elements/Blue_Calendar.png" />
  </div>
  
    <form id="form-event">
      <div class="col-sm-6">
      <div class="form-group">
        <label for="comment">Judul Acara</label>
        <input 
          type="text"
          v-model.trim="judul"
          name="judul"
          placeholder="Judul"
        />
        <small class="error-message" v-if="errors.judul">{{ errors.judul }}</small>
      </div>
      <div class="form-group">
        <label for="comment">Pembicara</label>
        <input
          type="text"
          v-model.trim="pembicara"
          name="pembicara"
          placeholder="Pembicara"
        />
        <small class="error-message" v-if="errors.pembicara">{{ errors.pembicara }}</small>
      </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
        <label for="comment">Tempat Pelaksanaan</label>
        <input
          type="text"
          v-model.trim="tempat"
          name="tempat"
          placeholder="Tempat"
        />
        <small class="error-message" v-if="errors.tempat">{{ errors.tempat }}</small>
      </div>
      <div class="form-group">
        <label for="comment">Tanggal Pelaksanaan</label>
        <input
          type="text"
          v-model.trim="tanggal"
          name="tanggal"
          placeholder="YYYY-MM-DD"
        />
        <p class="error-message" v-if="errors.tanggal">{{ errors.tanggal }}</p>
      </div>
      </div>


    <button type="button3" class="btn2" v-on:click.prevent="createEvent" style="margin-left: 400px">Buat</button>

      
    </form>
  
  

  <div class="container text-center">
    <!-- <input type="checkbox" class="agreement" value="agreement" />
    <label for="agreement"
      >Saya telah menyetujui kebijakan penggunaan<br />
      dan kebijakan privasi atas platform KreFa</label
    ><br />
    <br /> -->
    <!-- <button type="button3" class="btn2" v-on:click="createEvent">Buat</button> -->
  </div>

  <br />
  <br />
  <br />
  <br />
  <footer class="container-fluid"></footer>
</template>

<script>
const axios = require("axios").default;
const config = require("../config/config.js").default;

export default {
  data() {
    return {
      judul: "",
      pembicara: "",
      tempat: "",
      tanggal: "",
      errors: "",
    };
  },
  created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem(config.localStorage.dataToken)}`;
  },
  methods: {
    createEvent() {
      let formData = new FormData()
      formData.append('judul', this.judul)
      formData.append('pembicara', this.pembicara)
      formData.append('tempat', this.tempat)
      formData.append('tanggal', this.tanggal)
      axios({
        method: "post",
        url: config.urls.events,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          if (res.status == 201){
            alert("Event baru berhasil dibuat")
            this.$router.push({ name: "Events" });
          }
        })
        .catch((err) => {
          console.log(err.response);

          if (err.response.status == 400) {
            this.errors = err.response.data.messages;
          }
          if (err.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
};
</script>

  <style>
.container {
  padding-top: 100px;
}
.col-sm-6 {
  padding-top: 100px;
  padding-left: 430px;
}
.col-sm-3 {
  padding-top: 100px;
}
form input {
  width: 300px;
  height: 60px;
  border-radius: 50px;
  border-color: #26c7e7;
  border-width: 2px;
}
::placeholder {
  padding-left: 10px;
  color: #c6c5c5;
  font-size: 20px;
}

label input {
  width: 50px;
  height: 30px;
  border-radius: 50px;
  border-color: #26c7e7;
  border-width: 2px;
}
.col-sm-12 {
  padding-left: 430px;
  padding-top: 70px;
}
.btn2 {
  background-color: #26c7e7;
  border: none;
  color: white;
  padding: 10px 52px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 14px 2px;
  cursor: pointer;
  border-radius: 30px;
}

.col-sm-12 .btn4 {
  margin-left: 230px;
  font-size: 20px;
  size: 120px;
  padding: 15px;
  background-color: #26c7e7;
  border: none;
}
footer {
  background-color: white;
  color: white;
  padding: 55px;
}
.comment {
  margin-top: 600px;
  width: 650px;
  margin-left: 450px;
}

input.agreement {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

</style>