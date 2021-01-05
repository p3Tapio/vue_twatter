<template>
  <div class="user-profile" v-if="state.user">
    <div class="user-profile_sidebar">
      <div class="user-profile_user-panel">
        <h1 class="user-profile_username">@{{ state.user.username }}</h1>
        <div class="user-profile_admin-bagde" v-if="state.user.isAdmin">
          Admin
        </div>
        <div class="user-profile_admin-bagde" v-else>User</div>
        <div id="user-profile_follower-count">
          <strong>Followers: </strong>{{ state.followers }}
        </div>
      </div>
      <CreateTwootPanel @add-twoot="addTwoot" />
    </div>
    <div class="user-profile_twoots-wrapper">
      <TwootItem
        v-for="twoot in state.user.twoots"
        :key="twoot.id"
        :username="state.user.username"
        :twoot="twoot"
      />
    </div>
  </div>
  <div class="nullUser" v-else><h1>404</h1></div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { users } from "../assets/users";
import TwootItem from "../components/TwootItem";
import CreateTwootPanel from "../components/CreateTwootPanel";

export default {
  name: "UserProfile",
  components: { TwootItem, CreateTwootPanel },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId);
    const state = reactive({
      followers: 0,
      user: users[userId.value] || null,
    });

    function addTwoot(twoot) {
      state.user.twoots.unshift({
        id: state.user.twoots.length + 1,
        content: twoot,
      });
    }
    return { state, addTwoot, userId };
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
.nullUser {
    text-align: center;
    margin-top: 100px;
}
.user-profile_twoots-wrapper {
  width: 75%;
}
</style>
