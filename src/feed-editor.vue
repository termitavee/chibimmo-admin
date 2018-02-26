<template>
<div class="pure-g">
  <h2>News editor</h2>


<div class="pure-g">
  <form class="pure-u-1-2">
    <span>Title</span><br>
    <input type="text" v-model="title"><br>
    <br>
    <span>image</span><br>
    <input type="file" ref="myImage" accept="image/png,image/jpeg" @change="updateImg"/><br>
    <br>
    <span>Content</span><br>
    <textarea v-model="content" /><br>
    
    <a class="pure-button" @click.prevent="save">Save</a>
    <a class="pure-button" @click.prevent="cancel">Exit</a>
  </form>

  <div class="pure-u-1-2">
    <h2 v-text="title"></h2>
    <img v-bind:src="image.path || ''" alt="">
    <pre v-text="content"></pre>

  </div>
</div>

</div>
</template>

<script>
module.exports = {
  props: ["item", "formIP"],
  data: () => {
    return { title: "", image: { path: "" }, content: "" };
  },
  methods: {
    updateImg: function() {
      //TODO preview image
      const refImg = this.$refs.myImage.files[0];
      this.image = refImg ? refImg : { path: "" };
      console.log(this.image);
    },
    save: function() {
      const { title, image, content } = this;
      //if success back, else notify
      //TODO vuelidate
      fetch(`http://${this.formIP}:3000/news/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({ title, image, content })
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 202) {
            this.showMessage("news stored properly");
            console.log(res);
            this.$router.back();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel: function() {
      //TODO ask if save as draft
      dialog.showMessageBox(
        {
          type: t,
          buttons: ["Yes", "No"],
          title: "chibimmo inform",
          message: "Exit without saving"
        },
        answer => {
          if (answer == 0) {
            this.$router.back();
          }
        }
      )
    }
  },

  created: function() {
    console.log(this);
    if (this.item) {
      const { title, image, content } = this.item;
      this.title = title;
      this.image = image;
      this.content = content;
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
img {
  width: 100%;
}
pre {
  white-space: pre-wrap;
}
</style>