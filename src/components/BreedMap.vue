<template>
  <div class="map">
    <div v-if="breedList.length > 1 && countryGeoJson.length !== 0">
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
  private enableCountryList: string[] = [];
  private map: any;

  private colorPalette: string[] = [
    "rgb(241, 89, 65)",
    "rgb(245, 131, 69)",
    "rgb(250, 167, 75)",
    "rgb(254, 204, 79)",
    "rgb(255, 244, 77)",
    "rgb(212, 226, 91)",
    "rgb(162, 208, 99)",
    "rgb(108, 192, 104)",
    "rgb(32, 176, 107)",
    "rgb(26, 166, 137)",
    "rgb(28, 156, 157)",
    "rgb(30, 144, 180)",
    "rgb(35, 133, 198)",
    "rgb(64, 106, 180)",
    "rgb(82, 78, 162)",
    "rgb(124, 81, 161)",
    "rgb(161, 85, 160)",
    "rgb(182, 85, 138)",
    "rgb(202, 87, 116)",
    "rgb(221, 88, 93)"
  ];

  private style(feature: any) {
    return {
      fillColor: this.colorPalette[
        this.enableCountryList.indexOf(feature.properties.ADMIN)
      ],
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7
    };
  }

  private initMarkers() {
    console.log(this.enableCountryList);
    L.marker([63, 94])
      .bindPopup("<p>Russia</p>")
      .addTo(this.map);
    L.marker([36.47, 139])
      .bindPopup("<p>Japan</p>")
      .addTo(this.map);
    L.marker([35.844694, 103.452083])
      .bindPopup("<p>China</p>")
      .addTo(this.map);
  }

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
      .get("https://datahub.io/core/geo-countries/r/countries.geojson")
      .then((res: any) => {
        countryData = res.data.features;
      });

    countryData.forEach((geoData: any) => {
      this.enableCountryList.forEach((countryName: string) => {
        if (geoData.properties.ADMIN === countryName) {
          this.countryGeoJson.push(geoData);
        }
      });
    });

    L.geoJSON(this.countryGeoJson, { style: this.style }).addTo(this.map);
    this.initMarkers();
  }

  private async getBreedList() {
    const breedCountryList: any = [];

    await axios.get("https://api.thecatapi.com/v1/breeds").then((res: any) => {
      res.data.forEach((data: any) => {
        this.breedList.push(data);
        if (this.breedList[res.data.indexOf(data)].origin === "United States") {
          this.breedList[res.data.indexOf(data)].origin =
            "United States of America";
        } else if (
          this.breedList[res.data.indexOf(data)].origin === "Iran (Persia)"
        ) {
          this.breedList[res.data.indexOf(data)].origin = "Iran";
        } else if (this.breedList[res.data.indexOf(data)].origin === "Burma") {
          this.breedList[res.data.indexOf(data)].origin = "Myanmar";
        } else {
          this.breedList[res.data.indexOf(data)].origin = data.origin;
        }
        breedCountryList.push(data.origin);
      });

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
