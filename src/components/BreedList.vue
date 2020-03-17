<template>
  <div class="breed-list">
    <div v-if="breedList.length > 1 && countryGeoJson.length !== 0">
      <div class="breed-container">
        <div
          class="card"
          v-for="(breed, i) in breedList"
          :key="i"
          :id="breed.name.replace(/\s/g, '')"
        >
          <div class="card-content">
            <div class="content">{{breed.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Breeds extends Vue {
  @Prop() private breedList: any;
  @Prop() private countryGeoJson: any;
  private mounted() {
    //
  }
}
</script>

<style scoped lang="scss">
.breed-container {
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
  }
}
</style>