<template>
  <div class="container">
    <div class="col-sm-5" style="text-align: left;">
      <h2>Halo</h2>
      <h2>Selamat Datang</h2>
      <h2>di KreFA!</h2>
      <p>Semoga berkah</p>
      <router-link :to="{ name: 'Events' }">
        <img src="@/assets/elements/button.png" width="150" alt="" />
      </router-link>
    </div>
    <div class="col-sm-5">
      <router-link :to="{ name: 'Sync' }">
      <img src="@/assets/elements/landing_page_illustration.png" width="330" />
          </router-link>

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