<template>
  <Popup :detected="detected" :id_events="id" v-on:no="no"></Popup>

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
</template>
   




<script>
import Webcam from "webcamjs";
import Popup from "../components/Popup.vue";

const axios = require("axios").default;
const config = require("../config/config.js").default;
const callbacks = require("../helper/helper").default;

export default {
  props: ["id"],
  components: {
    Popup,
  },
  data() {
    return {
      display: ``,
      detected: [],
    };
  },
  methods: {
    redirectToRegister() {
      let person = this.detected[0];
      if (person.name == "Unknown") {
        return this.$router.push({ name: "Register" });
      }
    },
    no() {
      this.detected.splice(0, 1);
      this.redirectToRegister();
      this.getFoto(this.detected[0].id);
    },
    getFoto(id) {
      let token = localStorage.getItem(config.localStorage.dataToken);
      axios
        .get(`${config.urls.person(id)}`, {
          Authorization: `Bearer ${token}`,
        })
        .then((res) => {
          let data = res.data;
          data = data.data;
          this.detected[0].foto = data.foto;
        });
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
        .then(async (res) => {
          if (res.status == 200) {
            let detected = res.data.data;
            this.detected = detected;
            this.redirectToRegister();
            this.getFoto(this.detected[0].id);
            this.toggleModal();
          }
        })
        .catch((err) => {
          callbacks.unauth(err.response.status, err.response.data.message);
          alert(`Gagal!`);
        });
    },
    toggleModal() {
      var modal = document.getElementById("myModal");
      if (modal.style.display == "block") {
        modal.style.display = "none";
      } else if (modal.style.display == "none") {
        modal.style.display = "block";
      } else {
        modal.style.display = "block";
      }
    },
  },
  created() {
    Webcam.set(config.webcam);
    setTimeout(() => {
      Webcam.attach("#video");
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

