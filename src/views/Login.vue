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
    console.log(this.urlData + this.sessionEndPoint);
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
          console.log(res);
          alert(res.data.access_token)
          alert(res.data.refresh_token)
        })
        .catch((err) => alert(err));
    },
  },
};
</script>