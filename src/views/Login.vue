<template>
  <h1>Login</h1>
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
    this.loginBasicAuth();
  },
  methods: {
    loginBasicAuth() {
      axios
        .post(
          this.urlData + this.sessionEndPoint,
          {
            grant_type: "password",
            username: "krefa",
            password: "krefa",
          },
          {
            auth: {
              username: "testclient",
              password: "testsecret",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("access-token", res.data.access_token);
          localStorage.setItem("refresh-token", res.data.refresh_token);
          this.$router.go(-1);
        })
        .catch((err) => {
          localStorage.removeItem("access-token"); // if the request fails, remove any possible user token if possible
          localStorage.removeItem("refresh-token"); // if the request fails, remove any possible user token if possible
          alert(err);
        });
    },
  },
};
</script>