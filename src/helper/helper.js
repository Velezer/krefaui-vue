let callbacks = {
    unauth(status, err = '') {
        if (status == 400) {
            if (err == "missing or malformed jwt") {
                this.$router.push({ name: "Login" });
            }
        }
        if (status == 401) {
            this.$router.push({ name: "Login" });
        }
    }
}

export default callbacks