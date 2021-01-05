<template>
  <div class="home">
    <h1>Home</h1>
    <div class="userList">
      <router-link
        v-for="user in users"
        :to="{ name: 'UserPage', params: { userId: user.id } }"
        :key="user.userId"
      >
        {{ user.username }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { users } from "../assets/users";
export default {
  name: "Home",
  setup() {
    return { users };
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding: 50px 5%;
  .userList {
    display: flex;
    flex-direction: column;

  }
}
</style>