<template>

  <div class="container">
    <h1>Daftar <br />Presensi Kehadiran</h1>
    <div class="col-sm-6">
      <h4>Event : Peresmian KreFa</h4>
    </div>
    <div class="col-sm-6">
      <h4>Hari : Senin,1 Juni 2021</h4>
    </div>

    <table style="width: 85%">
      <tr>
        <th style="padding-left: 10px; padding-right: 10px">No</th>
        <th>Nama</th>
        <th>No Tiket</th>
        <th>Tanggal</th>
        <th>Status</th>
      </tr>

      <tr>
        <td>1</td>
        <td style="text-align: left; padding-right: 220px">Lorem Ipsum</td>
        <td>#786788389349</td>
        <td>29 Juni 2021, 16.00</td>
        <td>Datang</td>
      </tr>
      <tr>
        <td>2</td>
        <td style="text-align: left">Lorem Ipsum</td>
        <td>#84759868949894</td>
        <td>29 Juni 2021, 16.00</td>
        <td>Datang</td>
      </tr>
      <tr>
        <td>3</td>
        <td style="text-align: left">Lorem Ipsum</td>
        <td>#589789894589</td>
        <td>29 Juni 2021, 16.00</td>
        <td>Belum Datang</td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  props: ["id"],
};
</script>



<style>
@import "../assets/css/TableStyle.css";

.container {
  padding-top: 40px;
}

.container h1 {
  padding-bottom: 40px;
  text-align: center;
}

.container h4 {
  text-align: center;
  padding-bottom: 50px;
}
</style>
