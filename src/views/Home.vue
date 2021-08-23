<template>
  <div class="container">
    <div class="col-sm-5">
      <h2>Halo</h2>
      <h2>Selamat Datang</h2>
      <h2>di KreFa!</h2>
      <p>Lorem Ipsum dolor sit amet,<br />Consectular elit</p>
      <router-link :to="{ name: 'Events' }">
        <img src="@/assets/elements/button.png" width="150" alt="" />
      </router-link>
    </div>
    <div class="col-sm-5">
      <img src="@/assets/elements/landing_page_illustration.png" width="330" />
    </div>
  </div>
</template>




<style>
/* Ono Css yang Aktif mempengaruhi <h1></h1> tapi tempat tidak diketahui */

/* .container {
  padding-top: 140px;
}
.col-sm-6 img {
  padding-left: 250px;
}
.col-sm-5 img {
  margin: 20px;
} */
</style>