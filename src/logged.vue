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
const feed = require("./feed");
const adminList = require("./adminList");

module.exports = {
  props: [],
  data: function() {
    return {
      users:[],
      news:[]
    };
  },
  components: {
    "feed": feed,
    "admin-list": adminList
  },
  methods: {},
  created: function() {
    //TODO get data from server and store in data
    
  },
  mounted: function() {}
};
</script>

<style scoped>

</style>