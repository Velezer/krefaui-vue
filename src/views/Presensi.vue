<template>
  <div class="container">
    <div class="col-sm-7">
      <img src="@/assets/elements/Blue_Icon_Profile.png" />
    </div>
    <div class="col-sm-4">
      <h1>Silahkan</h1>
      <h1>Hadapkan Wajah</h1>
      <h1>Anda ke Kamera</h1>
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
.container {
  padding-top: 140px;
}
/* .col-sm-6 img{
    padding-left: 150px;
  }*/
.col-sm-4 p {
  font-size: 18px;
}
</style>

