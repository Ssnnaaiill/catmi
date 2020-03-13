<template>
  <div class="main">
    <div class="container is-widescreen">
      <div class="notification">
        Enjoy exploring
        <strong>{{ this.factList[0].length }} fun facts</strong> about
        <code>cats</code>!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Facts extends Vue {
  public factList: string[] = [];
  public async getFactList() {
    const axios = require("axios").default;
    await axios
      .get("https://brianiswu-cat-facts-v1.p.rapidapi.com/facts", {
        headers: {
          "x-rapidapi-host": "brianiswu-cat-facts-v1.p.rapidapi.com",
          "x-rapidapi-key": "2b155b93b3mshcb391866bac7106p169b83jsn84575087caa2"
        }
      })
      .then((res: any) => {
        for (const i in res.data) {
          if (res.data[i]) {
            this.factList.push(res.data[i]);
          }
        }
      });
  }
  private mounted() {
    this.getFactList();
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
