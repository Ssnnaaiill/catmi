<template>
  <div class="random-cat">
    <div class="columns">
      <div class="column">
        <img src="https://cataas.com/cat?size=30" />
      </div>
      <div class="column">
        <div class="daily-random-fact">
          <div class="title">
            <br />💌 Welcome to
            <code>CATMI</code> !
          </div>
          <div>
            This website may not be that usefull for your life.
            <br />How could it be more better learning about... these carnivorous mammals?
            <br />
            <br />Well, They ARE absolutely
            <em>ADORABLE</em>!
            <br />Here, you can get random facts about cats - which are totally not impactive.
            <br />For example...
            <br />
            <br />
            <div class="card">{{ $store.state.factOfTheDay }}</div>
            <br />
            <br />Or you can just spend scrolling down informations about cat breeds.
            <br />We also offer you a map of their origins.
            <br />Descriptions about each breeds are prepared for you!
            <br />
            <br />
            <strong>
              Now, why don't you have a seet and adore these
              <code>fluffy predetors?</code>
            </strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BreedList extends Vue {
  private async getRandomFact() {
    await axios.get("https://catfact.ninja/fact").then((res: any) => {
      this.$store.state.factOfTheDay = res.data.fact.replace(". ", ".\n");
    });
  }

  private mounted() {
    this.getRandomFact();
  }
}
</script>

<style scoped lang="scss">
.random-cat {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    color: #4a4a4a;
    background-color: #f5f5f5;
    font-family: monospace;
    padding: 20px 24px;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 10px 50px rgba(70, 50, 120, 0.3),
      0 0 0 1px rgba(10, 10, 10, 0.1);
  }

  img {
    border-radius: 10px;
  }
}

.daily-random-fact {
  .title {
    font-size: 25px;
  }
}
</style>