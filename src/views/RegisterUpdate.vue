<template>
  <div class="container text-center">
    <img src="@/assets/elements/Blue_Lock_Register.png" />
    <!-- <h3>Sudah punya akun ? <a href="#">Masuk</a></h3> -->
  </div>
  <div class="col-sm-5" style="padding-top: 0px">
    <div id="video">
      <img v-if="foto" :src="`http://` + host + `:8080/` + foto" :alt="nama" />
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

      <div class="form-group">
        <input
          v-on:input="attachCam"
          v-model.trim="tanggal_lahir"
          type="text"
          placeholder="YYYY-MM-DD"
        />
        <p class="error-message" v-if="errors.tanggal_lahir">
          {{ errors.tanggal_lahir }}
        </p>
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

       <div id="checkbox">
        <h3>Status Sekolah :</h3>
        <p class="error-message" v-if="errors.status_sekolah">
          {{ errors.status_sekolah }}
        </p>
        <input
          type="radio"
          id="Sekolah"
          name="sekolah"
          value="SMP"
          v-model="status_sekolah"
        />
        <label for="SMP"> SMP</label><br />
        <input
          type="radio"
          id="Sekolah"
          name="sekolah"
          value="SMA"
          v-model="status_sekolah"
        />
        <label for="SMA"> SMA</label><br />
        <input
          type="radio"
          id="Sekolah"
          name="sekolah"
          value="Kuliah"
          v-model="status_sekolah"
        />
        <label for="Kuliah"> Kuliah</label><br />
        <h3>Status Kerja :</h3>
        <p class="error-message" v-if="errors.status_sekolah">
          {{ errors.status_sekolah }}
        </p>
        <input
          type="radio"
          id="Pekerjaan"
          name="pekerjaan"
          value="Kerja"
          v-model="status_kerja"
        />
        <label for="Kerja"> Kerja</label><br />
        <input
          type="radio"
          id="Pekerjaan"
          name="pekerjaan"
          value="Tidak Kerja"
          v-model="status_kerja"
        />
        <label for="Tidak Kerja"> Tidak Kerja</label><br />
      </div>

      <button type="button3" class="btn2" v-on:click.prevent="register">
        Update
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
      foto: "",
      whatsapp: "",
      tanggal_lahir: ``,
      alamat: "",
      status_sekolah: ``,
      status_kerja: ``,
      statusData: 0,
      statusFace: 0,
      statusConflict: 0,
      errors: {},
      webc: Webcam,
      host: location.hostname,
      statusRegFace: 0,
    };
  },
  created() {
    this.fillFields();
    this.attachCam();
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
        if (camNotAttached && document.querySelector("#video")) {
          this.webc.set(config.webcam);
          this.webc.attach("#video");
        }
      }, 5000);
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
          this.tanggal_lahir = data.tanggal_lahir;
          this.status_sekolah = data.status_sekolah;
          this.status_kerja = data.status_kerja;
        })
        .catch((err) => {
          callbacks.unauth(err.response.status, err.response.data.message);
        });
    },
    async register() {
      await this.regFace().then();
      await this.regData().then();
      if (this.statusData == 200 && this.statusRegFace == 201) {
        alert("Data diupdate dan wajah ditambahkan");
      } else if (this.statusData == 200 && this.statusFace == 200) {
        alert("Data dan wajah diupdate");
      } else if (this.statusData == 200 && this.statusFace != 200) {
        alert("Hanya data yg diupdate!");
      } else {
        alert("Gagal");
        return;
      }
      this.$router.go(-1);
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
      formData.append("tanggal_lahir", this.tanggal_lahir);
      formData.append("alamat", this.alamat);
      formData.append("status_sekolah", this.status_sekolah);
      formData.append("status_kerja", this.status_kerja);
      formData.append("_method", "PUT");

      let token = localStorage.getItem(config.localStorage.dataToken);

      return axios({
        method: "post",
        url: config.urls.person(this.whatsapp),
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.statusData = 200;
          }
        })
        .catch((err) => {
          if (err.response.status == 409) {
            this.statusConflict = 409;
            alert("WA terpakai!");
          }
          if (err.response.status == 400) {
            console.log(err.response);
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
      setTimeout(async () => {
        await axios({
          method: "post",
          url: config.urls.registerFace,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          //console.log(res);
          if (res.status == 201) {
            this.statusRegFace = 201;
          }
        });
      }, 0);
      return axios({
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
            for (let i = 0; i < 5; i++) {
              this.updateFace(formData, token);
            }
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
           return this.$router.push({ name: "Login" });
          }
          let error = err.response.data.message;
          if (error !== undefined) {
            alert(error);
          }

        });
    },
  },
};
</script>

<style>
form {
  padding-right: 280px;
}
.container {
  padding-top: 100px;
}
.col-sm-6 img {
  padding-left: 60px;
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
