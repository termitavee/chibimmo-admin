<template>
<div>
    
  <h2>Welcome <span v-text="user._id" >User </span></h2>
  <a @click="exitLog" class="pure-button" href="#" v-text="logOut"></a>

  <div class="pure-u-2-3">
    <feed :itemList="news"/>
  </div>

  <div class="pure-u-1-3">
    <admin-list :itemList="users"/>
  </div>

</div>
</template>

<script>
//TODO Cannot read property '_id' of undefined
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
    storeUsers: () => {
      fetch("http://" + this.formIP + ":3000/users", {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 202) this.users = res.found;

          console.log(res);
        })
        .catch(error => {

          console.log(error);
        });
    },
    storePosts: () => {
      fetch("http://" + this.formIP + ":3000/news", {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 202) this.news = res.found;
          console.log(res);
        })
        .catch(error => {

          console.log(error);
        });
    }
  },
  created: function() {
    //TODO get data from server and store in data
    this.formIP = getIP();
    this.user = getCharLaunch();
    storeUsers();
    storePosts();
  },
  mounted: function() {}
};
</script>

<style scoped>

</style>