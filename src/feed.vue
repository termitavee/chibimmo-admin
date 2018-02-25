<template>
<div>
  <h3 id="tile" v-text="title">News</h3>
  <ul id="feed">
    <li v-for="(item, key) in itemList" :key="key">
      <feed-item :content="item" :reference="key"/>
    </li>
  </ul>
  <button @click="newEditor" class="pure-button">Create new</button>

</div>
</template>

<script>
const feedItem = require("./component/feed-item");

module.exports = {
  props: ["itemList"],
  components: {
    "feed-item": feedItem
  },
  data: function() {
    return {
      content: {}
    };
  },
  methods: {
    newEditor: ()=>{

    }
  },

  mounted: function() {}
};
</script>

<style scoped>

</style>