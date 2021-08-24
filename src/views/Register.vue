<template>
  <div class="container text-center">
    <img src="@/assets/elements/Blue_Lock_Register.png" />
    <!-- <h3>Sudah punya akun ? <a href="#">Masuk</a></h3> -->
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
          v-on:input="attachCam"
          v-model.trim="nama"
          type="text"
          placeholder="Nama Lengkap*"
        />
      </div>
      <div class="form-group">
        <input
          v-on:input="attachCam"
          v-model.trim="whatsapp"
          type="text"
          placeholder="NO. WhatsApp*"
        />
      </div>
      <!-- <div class="form-group">
        <input type="text" placeholder="Instagram*" id="usr" />
      </div> -->
      <div class="form-group">
        <input
          v-on:input="attachCam"
          v-model.trim="alamat"
          type="text"
          placeholder="Almat Rumah*"
          id="usr"
        />
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

const config = require("../config/config.js").default;

export default {
  props: ["id"],
  data() {
    return {
      nama: "",
      whatsapp: "",
      alamat: "",
    };
  },
  created() {},
  methods: {
    attachCam() {
      if (this.nama && this.whatsapp && this.alamat) {
        setTimeout(() => {
          let camNotAttached = document.querySelector("#video video") === null;
          if (camNotAttached) {
            Webcam.set(config.webcam);
            Webcam.attach("#video");
          }
        }, 1000);
      }
    },
    register() {
      // this.regData()
      this.regFace();
    },
    updateFace(formData,token){
       axios({
        method: "put",
        url: config.urls.registerFace,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then()
    },
    regFace() {
      let formData = new FormData();
      formData.append("id", this.whatsapp);
      formData.append("name", this.nama);

      Webcam.snap(function (data_uri) {
        let base64 = data_uri.replace("data:image/jpeg;base64,", "");

        let blob = Webcam.base64DecToArr(base64); //uint8array
        let file = new File([blob], "image.jpg");
        formData.append("file", file);
      });

      let token = localStorage.getItem(config.localStorage.gofaceToken);

      axios({
        method: "post",
        url: config.urls.registerFace,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.status == 201) {
            // alert(res.data.detail)
            // let detected = res.data.data;
            for (let i = 0; i < 5; i++) {
              this.updateFace(formData,token)
            }
            alert('Database wajah ditambahkan')
          // this.$router.push({ name: "Presensi" });
            
          }
          // alert("Event baru berhasil dibuat");
        })
        .catch((err) => {
          console.log(err.response.status)
          if (err.response.status == 409) {
            for (let i = 0; i < 5; i++) {
              
              this.updateFace(formData,token)
            }
            alert('Database wajah diupdate')

          }
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
