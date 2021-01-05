<template >
  <form
    class="create-twoot-panel"
    @submit.prevent="createNewTwoot"
    :class="{ '--exceeded': newTwootCharacterCount > 180 }"
  >
    <label for="newTwoot">
      <strong>New twoot </strong>({{ newTwootCharacterCount }}/180)
    </label>
    <textarea id="newTwoot" rows="4" v-model="state.newTwootContent" />

    <div class="create-twoot-panel__submit">
      <div class="create-twoot-type">
        <label for="newTwootType"><strong>Type:</strong></label>
        <select id="newTwootType" v-model="state.selectedTwootType">
          <option
            :value="option.value"
            v-for="(option, index) in state.twootTypes"
            :key="index"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
      <button>Twoot!</button>
    </div>
  </form>
</template>
<script>
import { reactive, computed } from "vue";

export default {
  name: "CreateTwootPanel",
  setup(props, context) {
    const state = reactive({
      newTwootContent: "",
      selectedTwootType: "instant",
      twootTypes: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant twoot" },
      ],
    });

    const newTwootCharacterCount = computed(() => state.newTwootContent.length);

    function createNewTwoot() {
      if (state.newTwootContent &&  state.selectedTwootType !== "draft" &&  newTwootCharacterCount.value <= 180) {
        context.emit("add-twoot", state.newTwootContent);
        state.newTwootContent = "";
      }
    }

    return { state, newTwootCharacterCount, createNewTwoot };
  },
};
</script>
<style lang="scss" scoped>
.create-twoot-panel {
  margin-top: 5px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  textarea {
    border: 1px solid #dfe3e8;
    border-radius: 5px;
  }
  .create-twoot-panel__submit {
    display: flex;
    justify-content: space-between;

    .create-twoot-type {
      padding: 10px 0;
    }
    button {
      padding: 5px 20px;
      margin: auto 0;
      border-radius: 5px;
      border: none;
      background-color: rebeccapurple;
      color: white;
      font-weight: bold;
    }
  }
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
    border-color: red;
    .create-twoot-panel__submit {
      button {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>