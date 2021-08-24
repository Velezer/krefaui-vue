<template>
  <div class="container">
    <div class="col-sm-7">
      <div id="video">
        <img src="@/assets/elements/Blue_Icon_Profile.png" />
      </div>
    </div>

    <div class="col-sm-4" style="padding-top: 100px">
      <h2>Silahkan</h2>
      <h2>Hadapkan Wajah</h2>
      <h2>Anda ke Kamera</h2>
      <p>
        Sistem kami akan medeteksi dan<br />memproses wajah anda secara otomatis
      </p>
      <button type="button3" class="btn2" v-on:click="findPerson">
        Ambil gambar
      </button>
    </div>
  </div>
  s
</template>
   




<script>
import Webcam from "webcamjs";
const axios = require("axios").default;
const config = require("../config/config.js").default;

export default {
  props: ["id"],
  data() {
    return {
      imageFile: [],
      token: "",
    };
  },
  methods: {
    beginDetectFace() {
      setInterval(async () => {
        this.findPerson();
      }, 5000);
    },
    findPerson() {
      let formData = new FormData();
      Webcam.snap(function (data_uri) {
        let base64 = data_uri.replace("data:image/jpeg;base64,", "");

        let blob = Webcam.base64DecToArr(base64); //uint8array
        let file = new File([blob], "image.jpg");
        formData.append("file", file);
      });

      let token = localStorage.getItem(config.localStorage.gofaceToken);

      axios({
        method: "post",
        url: config.urls.findFace,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status == 200) {
            let detected = res.data.data;
            for (const i in detected) {
              const person = detected[i];
              if (person.name == "Unknown") {
                return this.$router.push({ name: "Register" });
              }
              if (confirm(person.name)) {
                // call_post_data_mysql
                break;
              }
            }
          }
          // alert("Event baru berhasil dibuat");
          // this.$router.push({ name: "Events" });
        })
        .catch((err) => {
          console.log(err.response.data);

          if (err.response.status == 400) {
            let error = err.response.data.message;
            if (error == "missing or malformed jwt") {
              this.$router.push({ name: "Login" });
            }
          }
          if (err.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
  created() {
    Webcam.set(config.webcam);
    setTimeout(() => {
      Webcam.attach("#video");
      // this.beginDetectFace();
    }, 1000);
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

