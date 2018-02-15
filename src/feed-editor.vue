<template>
<div>
<form>
  <span>Title</span>
  <input type="text" v-model="title">
  
  <span>image</span>
  <input type="image" v-model="isAdmin">
  
  <span>Content</span>
  <textarea v-model="content" />
  
  <button @click="save">Save</button>
  <button @click="cancel">Exit</button>
</form>


</div>
</template>

<script>
module.exports = {
  props: ["item"],
  data: () => {
    return { title: "", isAdmin: false, content: "" };
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