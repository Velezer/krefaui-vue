<template>
  <div class="container text-center">
    <img src="@/assets/elements/Blue_Calendar.png" />
  </div>
  <div class="col-sm-6">
    <form>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="Nama Acara" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="Pilih kategori" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="Tanggal Acara" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="cth. Jam 7.30 - 9.30" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="Gratis / Berbayar" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="cth. 1500 peserta" />
      </div>
    </form>
  </div>
  <div class="col-sm-3">
    <form>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="Nama Penyelenggara" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="Online / Offline" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="Lokasi / Link Acara" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="*Max. 3 MB" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="*Max. 5 MB" />
      </div>
      <div class="form-group">
        <label for="comment">Deskripsi lengkap acara:</label>
        <input type="text" placeholder="*Max. 70 MB" />
      </div>
    </form>
  </div>
  <div class="comment">
    <div class="form-group">
      <label for="comment">Deskripsi lengkap acara:</label>
      <textarea
        class="form-control"
        rows="10"
        id="comment"
        placeholder="Tulis penjelasan acara secara detail"
      ></textarea>
    </div>
  </div>

  <div class="container text-center">
    <input type="checkbox" class="agreement" value="agreement" />
    <label for="agreement"
      >Saya telah menyetujui kebijakan penggunaan<br />
      dan kebijakan privasi atas platform KreFa</label
    ><br />
    <br />
    <button type="button3" class="btn2">Masuk</button>
  </div>

  <br />
  <br />
  <br />
  <br />
  <footer class="container-fluid"></footer>
</template>



  <style>
.container {
  padding-top: 100px;
}
.col-sm-6 {
  padding-top: 100px;
  padding-left: 430px;
}
.col-sm-3 {
  padding-top: 100px;
}
form input {
  width: 300px;
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
  padding-top: 70px;
}
.btn2 {
  background-color: #26c7e7;
  border: none;
  color: white;
  padding: 10px 52px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 14px 2px;
  cursor: pointer;
  border-radius: 30px;
}

.col-sm-12 .btn4 {
  margin-left: 230px;
  font-size: 20px;
  size: 120px;
  padding: 15px;
  background-color: #26c7e7;
  border: none;
}
footer {
  background-color: white;
  color: white;
  padding: 55px;
}
.comment {
  margin-top: 600px;
  width: 650px;
  margin-left: 450px;
}

input.agreement {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>