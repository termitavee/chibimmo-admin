<template>
<div>
   <h3 id="tile" v-text="title">Users</h3>
    <ul id="users">
      <li v-for="(item, key) in content" :key="key">
        <admin-item :content="item" :reference="key"/>
      </li>
    </ul>
</div>
</template>

<script>

const adminItem = require("./component/admin-item");

module.exports = {
  props: ["itemList"],
  components: {
    "admin-item": adminItem
  },
  data: function() {
    return {};
  },
  methods: {},

  mounted: function() {}
};
</script>

<style scoped>

</style>