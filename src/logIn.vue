<template>
<div class="center">
  <a v-text="loginButton" @click="toggleLogin" class="pure-button" >Log in</a>
  <p>
    <span>User name</span><br>
    <input type="text" v-model="form.user" @input="$v.form.user.$touch()"  v-bind:class="{error: $v.form.user.$error, valid: $v.form.user.$dirty && !$v.form.user.$invalid}"><br>
    <span class="error-msg" v-if="$v.form.user.$error"> Name too short.</span>
  </p>
  <p>
    <span>Pasword</span><br>
    <input type="password" v-model="form.pass" @input="$v.form.pass.$touch()"  v-bind:class="{error: $v.form.pass.$error, valid: $v.form.pass.$dirty && !$v.form.pass.$invalid}"><br>
    <span class="error-msg" v-if="$v.form.pass.$error"> Password too insecure.</span>
  </p>

  <div v-show="!loginVisible">
    <p>
      <span>Repeat pasword</span><br>
      <input type="password" v-model="form.pass2" @input="$v.form.pass2.$touch()"  v-bind:class="{error: $v.form.pass2.$error, valid: $v.form.pass2.$dirty && !$v.form.pass2.$invalid}"><br>
      <span class="error-msg" v-if="$v.form.pass2.$error">Passwords do not match.</span>
    </p>
    <p>
      <span>Email</span><br>
      <input type="email" v-model="form.email" @input="$v.form.email.$touch()"  v-bind:class="{error: $v.form.email.$error, valid: $v.form.email.$dirty && !$v.form.email.$invalid}"><br>
      <span class="error-msg" v-if="$v.form.email.$error">Not a valid Email.</span>
    </p>
  </div>
  
  <div v-show="loginVisible">
    <p>
      <input type="checkbox" v-model="form.remember">
      <span>Remember?</span>
    </p>
      
  </div>
    <p>
      <span>Server</span><br>
      <input type="text" v-model="formIP"  @input="$v.formIP.$touch()"  v-bind:class="{error: $v.formIP.$error, valid: $v.formIP.$dirty && !$v.formIP.$invalid}"><br>
      <span class="error-msg" v-if="$v.formIP.$error">Not an IP or Url.</span>
    </p>
  <a v-text="submitButton" @click="submit" class="pure-button" >Submit</a>
</div>
</template>

<script>
const { getIP, setIP, setCharLaunch } = require("./js/db");
const {
  required,
  minLength,
  requiredUnless,
  sameAs,
  ipAddress,
  url,
  or,
  email
} = require("vuelidate/lib/validators");

module.exports = {
  props: [],
  data: function() {
    return {
      loginButton: "Change to Sign Up",
      loginVisible: true,
      form: {
        user: "",
        pass: "",
        pass2: "",
        email: "",
        captcha: true,
        remember: false,
        adminApp: true
      },
      formIP: "127.0.0.1",
      submitButton: "Submit"
    };
  },
  validations: {
    form: {
      user: {
        required,
        minLength: minLength(4)
      },
      pass: {
        required,
        minLength: minLength(6)
      },
      pass2: {
        required: requiredUnless("loginVisible"),
        sameAsPassword: sameAs("pass")
      },
      email: {
        email,
        required: requiredUnless("loginVisible"),
        minLength: minLength(4)
      }
    },
    formIP: {
      required,
      or: or(ipAddress, url)
    }
  },
  methods: {
    toggleLogin: function() {
      this.loginButton = this.loginVisible
        ? "Change to LogIn"
        : "Change to Sign Up";

      this.loginVisible = !this.loginVisible;
    },
    submit: function() {
      const { form, formIP } = this.$v;

      if (
        !form.user.$invalid &&
        !form.pass.$invalid &&
        !formIP.$invalid &&
        (this.loginVisible || (!form.pass2.$invalid && !form.email.$invalid))
      ) {
        this.sendServer();

        console.log("ok?");
      } else {
        console.log("something wrong");
        //TODO mark wrong parts
        this.$v.form.$touch();
      }
    },
    sendServer: function() {
      //TODO some kind of loading

      const action = this.loginVisible ? "LogIn" : "SignUp";
      const { user, pass, pass2, email, captcha } = this.form;

      fetch("http://" + this.formIP + ":3000/" + action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(this.form)
      })
        .then(res => res.json())
        .then(res => {
          setIP(this.formIP);

          console.log(res);
          if (res.status == 202) {
            if (res.action == "login") {
              setCharLaunch(res.user);
              this.$router.push("/index");
            } else {
              this.loginVisible = true;
            }
          } else {
            console.log(res.status);
          }
        })
        .catch(error => {
          //TODO marcar ip erronea
          //net::ERR_CONNECTION_REFUSED
          //net::ERR_ADDRESS_UNREACHABLE
          //net::ERR_EMPTY_RESPONSE db not launched

          console.log(error);
        });
    }
  },

  mounted: function() {
    this.formIP = getIP();
  }
};
</script>

<style scoped>
input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

.error {
  border-color: red;
  background: #fdd;
}

.error:focus {
  outline-color: #f99;
}

.valid {
  border-color: #5a5;
  background: #efe;
}

.valid:focus {
  outline-color: #8e8;
}

.center {
  text-align: center;
}

.error-msg {
  color: red;
  font-size: small;
}
</style>