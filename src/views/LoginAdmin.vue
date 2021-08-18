<template>
  <div class="container text-center">
    <img src="@/assets/elements/Blue_Lock_Login.png" />
  </div>

  <div class="col-sm-6">
    <!-- <form>
      <div class="form-group">
        <input type="text" placeholder="Masuk dengan Google" />
      </div>
      <div class="form-group">
        <input type="text" placeholder="Masuk dengan Facebook" />
      </div>
    </form> -->
    <h3>Belum punya akun ? <a href="#">Mendaftar</a></h3>
  </div>
  <div class="col-sm-5">
    <form id="form-login">
      <div class="form-group">
        <input type="text" v-model.trim="username" name="username" placeholder="Username" />
      </div>
      <div class="form-group">
        <input type="text" v-model.trim.lazy="password" name="password" placeholder="Password" />
      </div>
    </form>
    <button type="button3" class="btn2" v-on:click="getToken">Masuk</button>
    <button type="button4" class="btn3">Lupa Password</button>
  </div>


  <br />
  <br />
  <br />
  <br />
  <footer class="container-fluid"></footer>
</template>

<script>
const axios = require("axios").default;

export default {
  data() {
    return {
      urlData: "http://" + location.hostname + ":8080",
      sessionEndPoint: "/oauth2/login",
    };
  },
  created() {
  },
  methods: {
    getToken() {
      axios
        .post(
          this.urlData + this.sessionEndPoint,
          {
            grant_type: "password",
            username: this.username,
            password: this.password,
          },
          {
            auth: {
              username: this.username,
              password: this.username,
            },
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.setItem("access-token", res.data.access_token);
          localStorage.setItem("refresh-token", res.data.refresh_token);
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("access-token"); // if the request fails, remove any possible user token if possible
          localStorage.removeItem("refresh-token"); // if the request fails, remove any possible user token if possible
          alert(err);
        });
    },
  },
};
</script>




<style>
.container {
  padding-top: 100px;
}
.col-sm-6 {
  padding-top: 100px;
  padding-left: 370px;
}
.col-sm-5 {
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
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 30px;
}
.btn3 {
  font-size: 14px;
  size: 120px;
  padding: 15px;
  background-color: white;
  border: none;
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
.col-sm-6 h3 {
  padding-top: 12px;
}
</style>

