<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
      <h1 class="user-profile_username">@{{ user.username }}</h1>
      <div class="user-profile_admin-bagde" v-if="user.isAdmin">Admin</div>
      <div class="user-profile_admin-bagde" v-else>User</div>
      <div id="user-profile_follower-count">
        <strong>Followers: </strong>{{ followers }}
      </div>
      <br />
      <form
        class="user-profile_create-twoot"
        @submit.prevent="createNewTwoot"
        :class="{ '--exceeded': newTwootCharacterCount > 180 }"
      >
        <label for="newTwoot"
          ><strong>New twoot </strong>({{ newTwootCharacterCount }}/180)</label
        >
        <textarea id="newTwoot" rows="4" v-model="newTwootContent" />
        <div class="user-profile_create-twoot-type">
          <label for="newTwootType"><strong>Type:</strong></label>
          <select id="newTwootType" v-model="selectedTwootType">
            <option
              :value="option.value"
              v-for="(option, index) in twootTypes"
              :key="index"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <button>Twoot!</button>
      </form>
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

export default {
  name: "UserProfile",
  components: { TwootItem },
  data() {
    return {
      newTwootContent: "",
      selectedTwootType: "instant",
      twootTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant twoot" },
      ],
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
  watch: {
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower!`);
      }
    },
  },
  computed: {
    newTwootCharacterCount() {
      return this.newTwootContent.length;
    },
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavorite(id) {
      console.log(`favorited Twoot ${id}`);
    },
    createNewTwoot() {
      if (this.newTwootContent && this.selectedTwootType !== "draft") {
        this.user.twoots.unshift({
          id: this.user.twoots.length + 1,
          content: this.newTwootContent,
        });
        this.newTwootContent = "";
      }
    },
  },
  mounted() {
    this.followUser();
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
    margin-right: 50px;
    padding: 10px;
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

    .user-profile_create-twoot {
      display: flex;
      flex-direction: column;

      #newTwoot {
        border-color: lightgray;
        border-radius: 5px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        &:focus {
          outline: none !important;
          border-color: gray;
          border-radius: 0;
        }
      }
      #newTwootType {
        margin-top: 8px;
        border-color: lightgray;
        border-radius: 5px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        &:focus {
          outline: none !important;
          border-color: gray;
        }
      }
      &.--exceeded {
        color: red;
        button {
          background-color: red;
          color: white;
          border: none;
        }
      }
    }
  }
}
.user-profile_twoots-wrapper {
  width: 75%;
}
</style>
