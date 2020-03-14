<template>
  <div class="facts">
    <div v-if="factList.length > 1">
      <div class="container">
        <div class="notification">
          Enjoy exploring
          <strong>{{ factList.length }} fun facts</strong>
          about <code>cats</code> !
        </div>
      </div>
      <b-pagination
        :total="factList.length"
        :current.sync="current"
        order="is-centered"
        simple
        rounded
        per-page="20"
      ></b-pagination>
      <div class="fact-container">
        <div
          class="card"
          v-for="(fact, i) in factList.slice(20 * (current - 1), 20 * current)"
          :key="i"
        >
          <div class="card-content">
            <div class="content">
              <div v-if="fact.text">{{ truncate(fact.text, 250, "...") }}</div>
              <div v-if="fact.fact">{{ fact.fact }}</div>
            </div>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item" v-if="fact._id">
              <div>
                <b-icon pack="fas" icon="heart"></b-icon>
                <span>{{ fact.upvotes }}</span>
              </div>
              <a v-if="fact.user">{{ fact.user.name.first }} {{ fact.user.name.last }}</a>
            </div>
            <div class="card-footer-item" v-else>
              <code>catfact.ninja</code>
            </div>
          </footer>
        </div>
      </div>
      <b-pagination
        :total="factList.length"
        :current.sync="current"
        order="is-centered"
        simple
        rounded
        per-page="20"
      ></b-pagination>
    </div>
    <div class="loading" v-else>
      <strong> <em>Loading...</em>🐾 </strong>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Facts extends Vue {
  private factList: any = [];
  private current: number = 1;

  private async getFactList() {
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
    await axios.get("https://catfact.ninja/facts?limit=999").then((res: any) => {
      for (const i in res.data) {
        if (res.data[i]) {
          this.factList.push(res.data[i]);
        }
      }
    });
    this.factList = this.factList[0].concat(this.factList[2]);
  }

  private truncate(text: string, length: number, suffix: string) {
    if (text.length > length) {
      return text.substring(0, length) + suffix;
    } else {
      return text;
    }
  }

  private mounted() {
    this.getFactList();
  }
}
</script>

<style scoped lang="scss">
a {
  color: #42b983;
}

.container {
  margin-top: 5.5rem;
  margin-bottom: 3.4rem;
}

.fact-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;

  .card {
    display: flex;
    flex-direction: column;
    margin: 24px;
    width: 300px;
    min-height: 300px;
    border-radius: 10px;

    .card-content {
      min-height: 250px;
      display: flex;
      align-items: center;
      text-overflow: ellipsis;
    }

    .card-footer {
      .card-footer-item {
        justify-content: space-between !important;
      }
      .icon {
        margin-right: 4px;
        color: #ff3860;
      }
    }
  }
}

.pagination {
  margin-bottom: 30px;
}
</style>
