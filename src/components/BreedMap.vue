<template>
  <div class="map">
    <div v-if="breedList.length > 1">
      <div class="container">
        <div class="notification">
          <strong>{{ breedList.length }} kinds</strong> of
          <code>cats</code> all around the world!
        </div>
      </div>
    </div>
    <div class="loading" v-else>
      <strong>
        <em>Loading...</em>🐾
      </strong>
    </div>
    <div id="map" class="container"></div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import L, { geoJSON } from "leaflet";
import Loading from "@/components/Loading.vue";

@Component
export default class Breeds extends Vue {
  private breedList: any = [];
  private countryGeoJson: any = [];
  private map: any = [];
  private enableCountryList: any = [];

  private async initMap() {
    // Set leaflet map
    this.map = L.map("map").locate({
      setView: true,
      maxZoom: 2
    });
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      maxZoom: 5
    }).addTo(this.map);
    this.map.setView(new L.LatLng(37.56, 10), 2);

    // Get GeoJSON data object
    let countryData: any;
    await axios
      .get(
        "https://datahub.io/core/geo-countries/r/countries.geojson"
      )
      .then((res: any) => {
        countryData = res.data.features;
      });

    countryData.forEach((geo: any) => {
      this.enableCountryList.forEach((country: any) => {
        if (geo.properties.name === country.origin) {
          this.countryGeoJson.push(geo);
        }
      });
    });

    console.log(this.countryGeoJson);
    L.geoJSON(this.countryGeoJson).addTo(this.map);
  }

  private async getBreedList() {
    const breedCountryList: any = [];

    await axios.get("https://api.thecatapi.com/v1/breeds").then((res: any) => {
      for (const i in res.data) {
        if (res.data[i]) {
          this.breedList.push(res.data[i]);
          if (this.breedList[i].origin === "United States") {
            this.breedList[i].origin = "United States of America";
          } else if (this.breedList[i].origin === "Iran (Persia)") {
            this.breedList[i].origin = "Iran";
          } else if (this.breedList[i].origin === "Burma") {
            this.breedList[i].origin = "Myanmar";
          } else {
            this.breedList[i].origin = res.data[i].origin;
          }
          breedCountryList.push(this.breedList[i].origin);
        }
      }

      for (const country of breedCountryList) {
        if (this.enableCountryList.indexOf(country) === -1) {
          this.enableCountryList.push(country);
        }
      }
    });

    this.initMap();
  }

  private mounted() {
    this.getBreedList();
  }
}
</script>

<style scoped lang="scss">
a {
  color: #42b983;
}

.container {
  margin-top: 5.5rem;
  margin-bottom: 1.8rem;
}

.pagination {
  margin-bottom: 30px;
}

#map {
  height: 500px;
  margin: 0 auto;
}
</style>
