<template>
<div>
  <span v-text="item.nick" ></span>

  <input type="isAdmin" v-model="item.isAdmin">

  <button v-on:click="edit">Save</button>
  <button v-on:click="remove">Delete</button>
</div>
</template>
<script>
module.exports = {
  props: ["item", "reference"],
  data: function() {
    return {
      showDetails: false
    };
  },
  methods: {
    edit: () => {
      //TODO do something to edit
    },
    remove: () => {
      //TODO do something to delete
    }
  },
  created: function() {},
  mounted: function() {}
};
</script>

<style scoped>

</style>