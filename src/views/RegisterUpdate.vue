<template>
  <div class="container text-center">
    
    <img src="@/assets/elements/Blue_Lock_Register.png" />
    <!-- <h3>Sudah punya akun ? <a href="#">Masuk</a></h3> -->
  </div>
  <div class="col-sm-5" style="padding-top: 0px">
    <div id="video">
      <img v-if="foto" :src="'http://localhost:8080/'+foto" :alt="nama" />
      <img v-else src="@/assets/elements/Blue_Icon_Profile.png" width="420" />
    </div>
  </div>

  <div class="col-sm-6">
    <form>
      <div class="form-group">
        <input
          v-on:input="attachCam"
          v-model.trim="nama"
          type="text"
          placeholder="Nama Lengkap*"
        />
        <small class="error-message" v-if="errors.nama">{{
          errors.nama
        }}</small>
      </div>
      <div class="form-group">
        <input
          v-on:input="attachCam"
          v-model.trim="whatsapp"
          type="text"
          placeholder="NO. WhatsApp*"
        />
        <small class="error-message" v-if="errors.whatsapp">{{
          errors.whatsapp
        }}</small>
      </div>
      <!-- <div class="form-group">
        <input type="text" placeholder="Instagram*" id="usr" />
      </div> -->
      <div class="form-group">
        <input
          v-on:input="attachCam"
          v-model="alamat"
          type="text"
          placeholder="Alamat Rumah*"
          id="usr"
        />
        <small class="error-message" v-if="errors.alamat">{{
          errors.alamat
        }}</small>
      </div>

      <button type="button3" class="btn2" v-on:click.prevent="register">
        Ambil gambar
      </button>
    </form>

    <!-- <input type="checkbox" class="agreement" value="agreement" />
    <label for="agreement"
      >Saya telah menyetujui kebijakan penggunaan<br />
      dan kebijakan privasi atas platform KreFa</label
    ><br /> -->
  </div>
  <!-- <div class="col-sm-12">
    <button type="button4" class="btn13" style="border-color: #26c7e7">
      Ambil Foto
    </button>
    <button type="button5" class="btn14">Daftar</button>
  </div> -->

  <br />
  <br />
  <br />
  <br />
  <footer class="container-fluid"></footer>
</template>

<script>
import Webcam from "webcamjs";
const axios = require("axios").default;

const callbacks = require("../helper/helper").default;
const config = require("../config/config.js").default;

export default {
  props: ["id"],
  data() {
    return {
      nama: "",
      foto:"",
      whatsapp: "",
      alamat: "",
      statusData: 0,
      statusFace: 0,
      statusConflict: 0,
      errors: {},
      webc: Webcam,
    };
  },
  created() {
    this.fillFields()
    this.attachCam()
  },
  computed: {
    formDataCom() {
      let formData = new FormData();
      formData.append("id", this.whatsapp);

      this.webc.snap(function (data_uri) {
        let base64 = data_uri.replace("data:image/jpeg;base64,", "");

        let blob = Webcam.base64DecToArr(base64); //uint8array
        let file = new File([blob], "image.jpg");
        formData.append("file", file);
      });
      return formData;
    },
  },
  methods: {
    attachCam() {
      this.whatsapp = this.id;
        setTimeout(() => {
          let camNotAttached = document.querySelector("#video video") === null;
          if (camNotAttached&&document.querySelector("#video")) {
            this.webc.set(config.webcam);
            this.webc.attach("#video");
          }
        }, 10000);
    },
    fillFields() {
      let token = localStorage.getItem(config.localStorage.dataToken);
      axios({
        method: "get",
        url: config.urls.person(this.id),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          let data = res.data.data;
          this.nama = data.nama;
          this.foto = data.foto;
          this.whatsapp = this.id;
          this.alamat = data.alamat;
        })
        .catch((err) => {
          callbacks.unauth(err.response.status, err.response.data.message);
        });
    },
    register() {
      this.regData();
      this.regFace();
    },
    updateFace(formData, token) {
      axios({
        method: "put",
        url: config.urls.registerFace,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {})
        .catch((err) => {
          callbacks.unauth(err.response.status, err.response.data.message);
        });
    },

    regData() {
      let formData = this.formDataCom;
      formData.append("nama", this.nama);
      formData.append("whatsapp", this.whatsapp);
      formData.append("alamat", this.alamat);
      formData.append("_method", "PUT");

      let token = localStorage.getItem(config.localStorage.dataToken);

      axios({
        method: "post",
        url: config.urls.person(this.whatsapp),
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.statusData = 200;
            if (this.statusData == 200 && this.statusFace == 200) {
              alert("Database wajah diupdate");
              this.$router.go(-1);
            }
          }
        })
        .catch((err) => {
          if (err.response.status == 409) {
            this.statusConflict = 409;
            alert("WA terpakai!");
          }
          if (err.response.status == 400) {
            console.log(err.response)
            let errors = err.response.data.messages;
            this.errors = errors;
          }
          callbacks.unauth(err.response.status, err.response.data.message);
        });
    },
    regFace() {
      let formData = this.formDataCom;
      formData.append("name", this.nama);

      let token = localStorage.getItem(config.localStorage.gofaceToken);

      axios({
        method: "put",
        url: config.urls.registerFace,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          //console.log(res);
          if (res.status == 200) {
            this.statusFace = 200;
            for (let i = 0; i < 10; i++) {
              this.updateFace(formData, token);
            }
            if (this.statusData == 200 && this.statusFace == 200) {
              alert("Database wajah diupdate");
              this.$router.go(-1);
            }
          }
        })
        .catch((err) => {
          // console.log(err.response.status);
          let error = err.response.data.message;
          if (error !== undefined) {
            alert(error);
          }

          callbacks.unauth(err.response.status, err.response.data.message);
        });
    },
  },
};
</script>

<style>
.container {
  padding-top: 100px;
}
.col-sm-6 img {
  padding-left: 90px;
  padding-top: 100px;
}
.col-sm-5 {
  padding-top: 100px;
}
form input {
  width: 450px;
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
  padding-top: 40px;
}
.btn14 {
  background-color: #26c7e7;
  border: none;
  color: white;
  padding: 10px 52px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 14px 320px;
  cursor: pointer;
  border-radius: 30px;
}
.btn13 {
  background-color: white;
  border-color: #26c7e7;
  color: #26c7e7;
  padding: 10px 38px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 30px;
}
.col-sm-12 .btn4 {
  margin-left: 150px;
  font-size: 20px;
  size: 120px;
  background-color: #26c7e7;
  border: none;
}
footer {
  background-color: white;
  color: white;
  padding: 85px;
}

input.agreement {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
