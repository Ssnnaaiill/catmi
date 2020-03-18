<template>
  <div class="breed-map">
    <div v-if="breedList.length > 1 && countryGeoJson.length !== 0">
      <div class="container">
        <div class="notification">
          Click the markers and learn about
          <strong>{{ breedList.length }}</strong>
          <code>cat</code>
          <strong>breeds</strong> all around the world!
        </div>
      </div>
    </div>
    <div class="loading" v-else>
      <strong>
        <em>Loading...</em>🐾
      </strong>
    </div>
    <div id="map" class="container"></div>
    <BreedList :breedList="breedList" :countryGeoJson="countryGeoJson" :breedImgs="breedImgs" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import L, { geoJSON, LatLng } from "leaflet";
import BreedList from "@/components/BreedList.vue";

@Component({
  components: { BreedList }
})
export default class Breeds extends Vue {
  private breedList: any = [];
  private countryGeoJson: any = [];
  private enableCountryList: string[] = [];
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
  private geoCenter: any = [
    [26, 29.5], // egypt
    [39.5, 22], // greece
    [40, -101], // United States of America
    [23.5, 54.2], // United Arab Emirates
    [-26, 132.5], // Australia
    [46.5, 2.5], // France
    [54, -2], // United Kingdom
    [21.1, 96.1], // Myanmar
    [56, -107], // Canada
    [34.77, 32.95], // Cyprus
    [62, 99], // Russia
    [32, 105], // China
    [37, 139.5], // Japan
    [15.5, 101], // Thailand
    [54.15, -4.63], // Isle of Man
    [64.6, 12.2], // Norway
    [31, 55.2], // Iran
    [1.35, 103.8], // Singapore
    [5, 47], // Somalia
    [39, 36] // Turkey
  ];
  private breedImgs: string[] = [];
  private map: any;

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
    const breeds: any = [];
    for (const i in this.enableCountryList) {
      if (this.enableCountryList[i]) {
        breeds.push([]);
      }
    }

    this.breedList.forEach((breed: any) => {
      this.enableCountryList.forEach((countryName: string) => {
        const breedsInCountry: any = [];
        if (breed.origin === countryName) {
          breeds[this.enableCountryList.indexOf(countryName)].push(breed.name);
        }
      });
    });

    this.geoCenter.forEach((coords: any) => {
      const breedsInCountry: string[] = [];
      breeds[this.geoCenter.indexOf(coords)].forEach((breed: string) => {
        breedsInCountry.push(
          `<a id='${breed.replace(/\s/g, "")}-marker' href='#${breed.replace(
            /\s/g,
            ""
          )}'>${breed}</a>`
        );
      });

      L.marker([coords[0], coords[1]])
        .bindPopup(
          `<div>
            <strong>${this.enableCountryList[this.geoCenter.indexOf(coords)]}
            </strong>
            <br/>
            ${breedsInCountry.join(", ")}
          </div>`
        )
        .addTo(this.map);
    });
  }

  private async initMap() {
    // Set leaflet map
    this.map = L.map("map").locate({
      setView: true,
      maxZoom: 2
    });
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      maxZoom: 7
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
    const breedId: any = [];

    await axios.get("https://api.thecatapi.com/v1/breeds").then((res: any) => {
      res.data.forEach((data: any) => {
        this.breedList.push(data);
        breedId.push(data.id);
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

    breedId.forEach((id: string) => {
      axios
        .get(
          `https://api.thecatapi.com/v1/images/search?order=desc&breed_id=${id}`
        )
        .then((res: any) => {
          res.data.forEach((data: any) => {
            this.breedImgs.push(data.url);
          });
        });
    });

    this.initMap();
  }

  private mounted() {
    this.getBreedList();
  }
}
</script>

<style scoped lang="scss">
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
  z-index: 3;
}
</style>
