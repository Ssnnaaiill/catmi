<template>
  <div class="facts">
    <div class="container">
      <div class="notification">
        Enjoy exploring
        <strong>fun facts</strong> about
        <code>cats</code> !
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Map extends Vue {
  private mounted() {
    //
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

  @keyframes loading {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
}

.loading {
  margin-top: 16rem;
  opacity: 1;
  animation: loading 2s infinite;
}

.pagination {
  margin-bottom: 30px;
}
</style>
