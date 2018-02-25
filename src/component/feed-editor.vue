<template>
<div class="pure-g">
  <form class="pure-u-1-2">
    <span>Title</span>
    <input type="text" v-model="title">
    
    <span>image</span>
    <input type="image" v-model="image">
    
    <span>Content</span>
    <textarea v-model="content" />
    
    <button @click="save">Save</button>
    <button @click="cancel">Exit</button>
  </form>

<div class="pure-u-1-2">
  <h3 v-text="title"></h3>
  <img src="" alt="">
  <p v-text="content"></p>

</div>

</div>
</template>

<script>
module.exports = {
  props: ["item"],
  data: () => {
    return { title: "", image: false, content: "" };
  },
  methods: {},
  save: () => {
    //TODO send to the server
    //if success back, else notify
  },
  cancel: () => {
    //TODO ask if save as draft
    //this.$router.push("/index");

  },
  created: function() {
    const { title, isAdmin, content } = this.item;
    this.title = title;
    this.isAdmin = isAdmin;
    this.content = content;
  },
  mounted: function() {}
};
</script>

<style scoped>

</style>