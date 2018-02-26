<template>
<div>
   <h3 id="tile" class="center">Users</h3>
    <ul id="users">
      <li v-for="(item, key) in itemList" :key="key">
        <admin-item :item="item" :reference="key" :formIP="formIP"/>
      </li>
      <li v-if="itemList.length==0"> No users to show</li>
    </ul>
</div>
</template>

<script>
const adminItem = require("./component/admin-item");

module.exports = {
  props: ["itemList", "formIP"],
  components: {
    "admin-item": adminItem
  },
  data: function() {
    return {};
  },
  methods: {
    
    
    
  },

  mounted: function() {

  }
};
</script>

<style scoped>
.center {
  text-align: center;
}
ul {
  padding-left: 5px;
  text-align: right;
}
li {
  list-style-type: none;
}
</style>