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
    </div>
  </div>
</template>
   




<script>
import Webcam from "webcamjs";

export default {
  props: ["id"],
  data() {
    return {
      config: { width: 600, height: 600, refreshTime: 175, },
    };
  },
  created() {
    Webcam.set({
      width: this.config.width, // 4
      height: this.config.height, // 3
      image_format: "jpeg",
      jpeg_quality: 70,
    });
    setTimeout(() => {
      Webcam.attach("#video");
      
    }, 5000);
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

.col-sm-7{
  
}
</style>

