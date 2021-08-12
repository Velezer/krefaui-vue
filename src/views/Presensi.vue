<template>
  <div class="container">
    <div class="col-sm-7">
      <img src="@/assets/elements/Blue_Icon_Profile.png" />
    </div>
    <div class="col-sm-4" style="padding-top: 100px">
      <h2>Silahkan</h2>
      <h2>Hadapkan Wajah</h2>
      <h2>Anda ke Kamera</h2>
      <p>
        Sistem kami akan medeteksi dan<br />memproses wajah anda secara otomatis
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>



<style>
.col-sm-4 h2{
  font-size: 40px;
}
.container {
  padding-top: 140px;
}
/* .col-sm-6 img{
    padding-left: 150px;
  }*/
.col-sm-4 p {
  font-size: 18px;
  padding-top: 50px;
}
</style>

