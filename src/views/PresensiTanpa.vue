<template>
  <div class="container text-center">
    <h1>Presensi Biasa</h1>
  </div>
  <div class="col-sm-5" style="padding-top: 0px">
    <div id="video">
      <img src="@/assets/elements/Blue_Icon_Profile.png" width="420" />
    </div>
  </div>

  <div class="col-sm-6">
    <form>
      
      <div class="form-group">
        <input
          v-model.trim="whatsapp"
          type="text"
          placeholder="NO. WhatsApp*"
        />
        <small class="error-message" v-if="errors.id_people">
          Required!
        </small>
      </div>
     

      <button type="button3" class="btn2" v-on:click.prevent="hadirBos(whatsapp)">
        Submit
      </button>
    </form>


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
const callbacks = require("../helper/helper").default;

export default {
  props: ["id"],
  data() {
    return {
      whatsapp: "",
      errors:{}
    };
  },
  methods: {
    hadirBos(id_people) {
      this.errors={}
      let formData = new FormData();
      formData.append("id_events", this.id);
      formData.append("id_people", id_people);

      let token = localStorage.getItem(config.localStorage.dataToken);

      axios({
        method: "post",
        url: config.urls.attendancehadir,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          alert("Semoga Sukses!");
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err.response)
          if (err.response.status == 400) {
            let errors = err.response.data.messages;
            this.errors = errors;
            if(errors.error==`Anda sudah hadir`){
              alert(errors.error)
            }
          }
          callbacks.unauth(err.response.status);
        });
    },
    
  },
  
};
</script>



<style>
.col-sm-4 h2 {
  font-size: 40px;
  height: 5px;
  padding-top: 40px;
}
.container {
  padding-top: 120px;
}
/* .col-sm-6 img{
    padding-left: 150px;
  }*/
.col-sm-4 p {
  font-size: 18px;
  padding-top: 50px;
}

.col-sm-7 img {
  width: 450px;
  padding-left: 60px;
  padding-top: 120px;
}
</style>

