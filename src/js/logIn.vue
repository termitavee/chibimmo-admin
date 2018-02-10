<template>
<div>
<a v-text="loginButton" @click="toggleLogin" class="pure-button" >Log in</a>
    
    <div v-show="!loginVisible">
        <p>
            <span>User name</span><br>
            <input type="text" v-model="form.user">
        </p>
        <p>
            <span>Pasword</span><br>
            <input type="password" v-model="form.pass">
        </p>
        <p>
            <span>Repeat pasword</span><br>
            <input type="password" v-model="form.pass2">
        </p>
        <p>
            <span>Email</span><br>
            <input type="email" v-model="form.email">
        </p>
        <p>
            <span>Server</span><br>
            <input type="text" v-model="form.server">
        </p>
    </div>
    
    <div v-show="loginVisible">
        <p>
            <span>User name</span><br>
            <input type="text" v-model="form.user">
        </p>
        <p>
            <span>Pasword</span><br>
            <input type="password" v-model="form.pass" @keyup.enter="submit">
        </p>
        <p>
            <input type="checkbox" v-model="form.remember">
            <span>Remember?</span>
        </p>
        <p>
            <span>Server</span><br>
            <input type="text" v-model="form.server">
        </p>
        
    </div>
    <a v-text="submitButton" @click="submit" class="pure-button" >Submit</a>
    


</div>
</template>

<script>

const { getIP } = require("./db");

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
        remember: false
      },
      formIP: getIP(),
      submitButton: "Submit"
    };
  },
  methods: {
    toggleLogin: function() {
      this.loginButton = this.loginVisible
        ? "Change to LogIn"
        : "Change to Sign Up";

      this.loginVisible = !this.loginVisible;
    },
    submit: function() {
      const { user, pass, pass2, email, captcha } = this.form;
      let validUser = false;
      let messageUser = "";

      let validPass = false;
      let messagePass = "";

      let validPass2 = false;
      let messagePass2 = "";

      let validEmail = false;
      let messageEmail = "";

      let validCaptcha = false;

      const symbPatt = /\W/g;
      const digitPatt = /\d/g;
      const emailPatt = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/i;

      //check user
      if (user.length < 4) {
        validUser = false;
        messageUser = "name too hort";
      } else {
        validUser = true;
      }

      //check pass
      if (pass.length < 6) {
        validPass = false;
        messagePass = "password too hort";
      } else {
        if (pass != pass2) {
          validPass2 = false;
          messagePass2 = "password don't match";
        } else validPass = true;

        if (!digitPatt.test(pass)) messagePass = "May use numbers";

        if (!symbPatt.test(pass))
          messagePass =
            messagePass.length != 0
              ? messagePass + " and symbols"
              : "May use symbols";
      }
      if (!this.loginVisible) {
        if (emailPatt.test(email)) {
          validEmail = true;
        } else {
          validEmail = false;
          messageEmail = "There is something strange here";
        }

        
      } else {
        validEmail = true;
      }

      //TODO some testing
      console.log("validUser=" + validUser);
      console.log("validPass=" + validPass);
      console.log("validPass2=" + validPass2);
      console.log("validEmail=" + validEmail);
      console.log("messageUser=" + messageUser);
      console.log("messagePass=" + messagePass);
      console.log("messageEmail=" + messageEmail);
      validUser = true;
      validPass = true;
      validPass2 = true;
      validEmail = true;
      if (validUser && validPass && validPass2 && validEmail && validCaptcha) {
        this.sendServer();
      } else {
        
        //TODO mark wrong parts
      }
    }
  },
  sendServer: function() {
    //TODO some kind of loading
    const that = this
    const action = this.loginVisible ? "LogIn" : "SignUp";
    console.log(action);
    //http://127.0.0.1:3000
    //termitavee.ddns.net
    fetch("http://" + that.formIP + ":3000/" + action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(that.form)
    })
      .then(res => res.json())
      .then(res => {
        setIP(that.formIP);
        //TODO alert("response of server");

        console.log(res);
        if (res.status == 202) {
          if (res.action == "login") {
            
            that.$router.push("/index");
          } else {
            //TODO now log In
            that.loginVisible = true
          }
        } else {
          //TODO fairule
          console.log(res.status)
        }
      })
      .catch(error => {
        //TODO marcar ip erronea
        //net::ERR_CONNECTION_REFUSED
        //net::ERR_ADDRESS_UNREACHABLE
        //net::ERR_EMPTY_RESPONSE db not launched

        console.log(error);
      });
  },

  mounted: function() {}
};
</script>

<style scoped>

</style>