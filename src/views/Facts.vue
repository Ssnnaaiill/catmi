<template>
  <div class="home">
    <FactList />
  </div>
</template>

<script>
import FactList from "@/components/FactList.vue";

export default {
  name: "Home",
  components: {
    FactList,
  },
};
</script>
