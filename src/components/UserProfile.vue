<template>
  <div class="user-profile">
    <div class="user-profile_sidebar">
      <div class="user-profile_user-panel">
        <h1 class="user-profile_username">@{{ user.username }}</h1>
        <div class="user-profile_admin-bagde" v-if="user.isAdmin">Admin</div>
        <div class="user-profile_admin-bagde" v-else>User</div>
        <div id="user-profile_follower-count">
          <strong>Followers: </strong>{{ followers }}
        </div>
      </div>
      <CreateTwootPanel @add-twoot="addTwoot" />
    </div>
    <div class="user-profile_twoots-wrapper">
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :username="user.username"
        :twoot="twoot"
        @favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<script>
import TwootItem from "./TwootItem";
import CreateTwootPanel from "./CreateTwootPanel";

export default {
  name: "UserProfile",
  components: { TwootItem, CreateTwootPanel },
  data() {
    return {
      followers: 0,
      user: {
        id: 1,
        username: "_JokuNimi",
        firstname: "Joku",
        lastname: "Nimi",
        email: "joku@nimi.com",
        isAdmin: true,
        twoots: [
          { id: 1, content: "Twotter is yeah" },
          { id: 2, content: "Zumba lessons today" },
          { id: 3, content: "Subscribe to my wonderful twotter" },
        ],
      },
    };
  },
  methods: {
    addTwoot(twoot) {
      this.user.twoots.unshift({
        id: this.user.twoots.length + 1,
        content: twoot,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;

  .user-profile_user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    padding: 0 30px 20px 20px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid #dfe3e8;

    h1 {
      margin-bottom: 5px;
    }

    .user-profile_admin-bagde {
      background: rebeccapurple;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      margin-right: auto;
      margin-bottom: 5px;
      padding: 5px 10px;
    }
  }
}
.user-profile_twoots-wrapper {
  width: 75%;
}
</style>
