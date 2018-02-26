<template>
<div>
  <span v-text="item._id" ></span>

  <input class="right" type="checkbox" v-model="isAdmin">

  <button class="right" v-on:click="edit">Save</button>
  <button class="right" v-on:click="remove">Delete</button>
</div>
</template>
<script>
const { ipcRenderer, remote } = require("electron");
const { dialog } = remote;
module.exports = {
  props: ["item", "reference", "formIP"],
  data: function() {
    return {
      isAdmin: false,
      message: "Hello world",
      showDetails: false
    };
  },
  methods: {
    edit: function() {
      console.log(this.item)
      //TOFIX FALLA
      if (this.isAdmin != this.item.admin) {
        fetch(`http://${this.formIP}:3000/user/${this.item._id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify({ admin: this.item.admin || true })
        })
          .then(res => res.json())
          .then(res => {
            if (res.status == 202) {
              this.showMessage("Updated properly");
              console.log(res);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    remove: function () {
      const toDelete = this.item._id
      dialog.showMessageBox(
        {
          type: "warning",
          buttons: ["Cancel", "Delete", "Cancel"],
          title: "chibimmo ask you",
          message: 'Are you shure you want to delete "' + toDelete + '"?'
        },
        answer => {
          if (answer == 1) {
            fetch(`http://${this.formIP}:3000/user/${toDelete}`, {
              method: "DELETE",
              credentials: "include",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: JSON.stringify({ user: toDelete })
            })
              .then(res => res.json())
              .then(res => {
                console.log(res);
                if (res.status == 202) {
                  this.$root.$emit("message", {
                    t: "info",
                    m: "User deleted :("
                  })
                  this.$root.$emit("remove-user", toDelete)
                } else {
                  this.$root.$emit("message", {
                    t: "error",
                    m: "User is still alive because of reasons."
                  })

                }
              })
              .catch(error => {
                console.log("mensaje de error en la petición");
                console.log(error);
              });
          }
          console.log("User response=" + answer);
        }
      );
    }
  },
  created: function() {
    //TODO get ip
    this.isAdmin = this.item.admin
  },
  mounted: function() {}
};
</script>

<style scoped>
.right {
  text-align: right;
}

.pop-message {
  display: none;
  position: absolute;
  left: 50%;
  top: 2%;
  border: 1px groove black;
  border-radius: 5px;

  animation-name: message;
  animation-duration: 4s;
}
@keyframes message {
  0% {
    display: block;
    position: absolute;
    left: 50%;
    top: 2%;
    border: 1px groove black;
    border-radius: 5px;
    opacity: 0;
  }
  25% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.9;
  }
  100% {
    display: block;
    position: absolute;
    left: 50%;
    top: 2%;
    border: 1px groove black;
    border-radius: 5px;
    opacity: 0;
  }
}
</style>