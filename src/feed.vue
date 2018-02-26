<template>
<div>
  <h3 id="tile" class="center">News</h3>
  <ul id="feed">
    <li v-for="(item, key) in itemList" :key="key">
      <feed-item :content="item" :reference="key" :formIP="formIP"/>
    </li>
    <li v-if="itemList.length==0"> No news to show</li>
  </ul>
  <button @click="newEditor" class="pure-button">Create new</button>
</div>
</template>

<script>
const feedItem = require("./component/feed-item");

module.exports = {
  props: ["itemList", "formIP"],
  components: {
    "feed-item": feedItem
  },
  data: function() {
    return {
      content: {},
    };
  },
  methods: {
    newEditor: function() {
      this.$router.push("/newsEditor");
    }
  },

  mounted: function() {}
};
</script>

<style scoped>
.center{
text-align: center
}
ul{
  padding-left: 5px
}
li{
  list-style-type: none;
}
</style>