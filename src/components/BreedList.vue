<template>
  <div v-if="breedList.length > 1 && countryGeoJson.length !== 0">
    <div class="card-container">
      <div
        class="card"
        v-for="(breed, i) in breedList"
        :key="i"
        :id="breed.name.replace(/\s/g, '')"
      >
        <div class="card-image" @click="showDetails(breed)">
          <figure class="image is-4by3">
            <img :src="breedImgs[i]" alt="Placeholder image" />
          </figure>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item breed-name">
            <div @click="showDetails(breed)">{{ breed.name }}</div>
            <b-button>
              <a href="#map">Back to Map</a>
            </b-button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BreedList extends Vue {
  @Prop() private breedList: any;
  @Prop() private countryGeoJson: any;
  @Prop() private breedImgs: any;

  private showDetails(breed: any) {
    const tags: any = [];
    if (breed.experimental === 1) {
      tags.push(`<code>Experimental</code>`);
    }
    if (breed.hairless === 1) {
      tags.push(`<code>Hairless</code>`);
    }
    if (breed.natural === 1) {
      tags.push(`<code>Natural Breed</code>`);
    }
    if (breed.rare === 1) {
      tags.push(`<code>Rare</code>`);
    }
    if (breed.rex === 1) {
      tags.push(`<code>Rex</code>`);
    }
    if (breed.suppress_tail === 1) {
      tags.push(`<code>Suppress tail</code>`);
    }
    if (breed.short_legs === 1) {
      tags.push(`<code>Short Legs</code>`);
    }
    if (breed.hypoallergenic === 1) {
      tags.push(`<code>Hypoallergenic</code>`);
    }
    breed.temperament.split(", ").forEach((temp: string) => {
      tags.push(`<code>${temp}</code>`);
    });

    const message: string = `
    <div>
      <strong>Description</strong>
      <div style="text-indent: 10px;">${breed.description}</div>
      <br/>${tags.join(" ")}<br/>
      <div class="columns">
        <div class="column">
          <br/>Adaptability ${"⭐".repeat(breed.adaptability)}
          <br/>Affection${"⭐".repeat(breed.affection_level)}
          <br/>Energy ${"⭐".repeat(breed.energy_level)}
          <br/>Grooming ${"⭐".repeat(breed.grooming)}
          <br/>Health Issues ${"⭐".repeat(breed.health_issues)}
          <br/>Intelligence ${"⭐".repeat(breed.intelligence)}
        </div>
        <div class="column">
          <br/>Child Friendly ${"⭐".repeat(breed.child_friendly)}
          <br/>Dog Friendly ${"⭐".repeat(breed.dog_friendly)}
          <br/>Stranger Friendly ${"⭐".repeat(breed.stranger_friendly)}
          <br/>Shedding ${"⭐".repeat(breed.shedding_level)}
          <br/>Social Needs ${"⭐".repeat(breed.social_needs)}
          <br/>Vocalisation ${"⭐".repeat(breed.vocalisation)}
        </div>
      </div>
      <hr/>
      <button class="button">
        <a href="${breed.wikipedia_url}" target="_blank">🌏 WIKIPEDIA</a>
      </button>
      <button class="button">
        <a href="${breed.cfa_url}" target="_blank">😺 CFA</a>
      </button>
    </div>`;

    this.$buefy.dialog.alert({
      title: breed.name,
      message,
      ariaRole: "alertdialog",
      ariaModal: true
    });
  }
}
</script>

<style lang="scss">
.modal-card {
  max-width: 550px !important;
}

.breed-name {
  margin-top: 7px;
}
</style>