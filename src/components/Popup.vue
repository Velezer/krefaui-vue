
<template>
  <!-- The Modal -->
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <section style="width: fit-content; margin: auto">
        <img :src="foto" width="120" />
      </section>
      <article>
        <h5>Nama : {{ mnama ? mnama : nama }}</h5>
        <h5>Whatsapp : {{ mwhatsapp ? mwhatsapp : whatsapp }}</h5>
        <!-- <h5>Alamat : Kudus</h5> -->
        <h3>Apa Benar Ini Anda?</h3>
        <button type="button3" class="btn2" @click="yes">
          Ya benar, ini saya
        </button>
        <button type="button3" class="btn3" @click="no">Bukan</button>
      </article>
    </div>
  </div>
</template>>


<script>
const axios = require("axios").default;
const config = require("../config/config.js").default;
const callbacks = require("../helper/helper").default;

export default {
  props: [`foto`, `nama`, `whatsapp`, `detected`, `id_events`],
  data() {
    return {
      mfoto: ``,
      mnama: ``,
      mwhatsapp: ``,
      mdetected: [],
    };
  },
  methods: {
    hadirBos(id_people) {
      let formData = new FormData();
      formData.append("id_events", this.id_events); //props
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
          if (err.response.status == 400) {
            let errors = err.response.data.messages;
            if (errors.error == `Anda sudah hadir`) {
              alert(errors.error);
              this.$router.go(-1);
            }
          }
          callbacks.unauth(err.response.status);
          alert(`Gagal!`);
        });
    },
    yes() {
      this.hadirBos(this.whatsapp);
    },
    no() {
      this.mdetected.splice(0, 1);
    },
    changeDetected(i) {
      let person = this.detected[i];
      this.mfoto = person.foto;
      this.mnama = person.nama;
      this.mwhatsapp = person.whatsapp;
      if (person.name == "Unknown") {
        return this.$router.push({ name: "Register" });
      }
    },
  },
  mounted() {
    this.changeDetected(0);
  },
};
// Get the modal
// var modal = document.getElementById("myModal");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// // btn.onclick = function () {
// //   modal.style.display = "block";
// // };

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   modal.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
</script>





<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 420px;
  height: 400px;
  border-radius: 30px;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

article h5 {
  margin-top: 10px;
  margin-bottom: 10px;
}

article h3 {
  text-align: center;
}

.btn2 {
  background-color: #26c7e7;
  border: none;
  color: white;
  padding: 10px 42px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 14px 2px;
  cursor: pointer;
  border-radius: 30px;
}

.btn3 {
  background-color: white;
  border-width: 2px;
  border-color: gray;
  color: gray;
  padding: 10px 42px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 14px 2px;
  cursor: pointer;
  border-radius: 30px;
}
</style>
