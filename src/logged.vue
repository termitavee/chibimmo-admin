<template>
<div>
  <div class="pure-u-1-1">
    <h2>Welcome <span v-text="user._id" >User </span></h2>
    <a @click="exitLog" class="pure-button corner" href="#" >logOut</a>
  </div>

  <div class="pure-g">
    <div class="pure-u-2-3">
      <feed :itemList="news" :formIP="formIP"/>
    </div>

    <div class="pure-u-1-3">
      <admin-list :itemList="users" :formIP="formIP"/>
    </div>
</div>
</div>
</template>

<script>
const { ipcRenderer, remote } = require("electron");
const { dialog } = remote;

const { getCharLaunch, getIP } = require("./js/db");

const feed = require("./feed");
const adminList = require("./adminList");

module.exports = {
  props: [],
  data: function() {
    return {
      user: {},
      formIP: "127.0.0.1",
      users: [],
      news: []
    };
  },
  components: {
    feed: feed,
    "admin-list": adminList
  },
  methods: {
    storeUsers: function() {
      fetch("http://" + this.formIP + ":3000/user", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 202) this.users = res.found

          console.log(res)
        })
        .catch(error => {
          console.log(error)
        });
    },
    storePosts: function() {
      fetch("http://" + this.formIP + ":3000/news", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 202) this.news = res.found
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        });
    },
    exitLog: function() {
      //TODO clear data
      this.$router.replace("/login")
      //this.$router.push("/index");
      //this.$router.push("/newsEditor");
      //this.$router.back()
    },
    showMessage: function(t, m) {
      //"none", "info", "error", "question" or "warning"
      dialog.showMessageBox({
        type: t,
        buttons: ["OK"],
        title: "chibimmo inform",
        message: m
      });
    }
  },

  created: function() {
    //TODO get data from server and store in data
    this.formIP = getIP();
    this.user = getCharLaunch()
    this.storeUsers();
    this.storePosts();

    this.$root.$on("remove-user", function(user) {
       const newList = this.users.map(item => {
        return item._id != user
      })
      console.log(newList)
      console.log(this.users)
      this.users = newList
    });

    this.$root.$on("message", function(p) {
      //TOFIX dont see it
      this.showMessage(p.t, p.m);
    });
  },
  mounted: function() {}
};
</script>

<style scoped>
.corner {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>