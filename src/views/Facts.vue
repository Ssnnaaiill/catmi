<template>
  <div class="home">
    <FactList />
  </div>
</template>

<script>
import FactList from "@/components/FactList.vue";

export default {
  name: "Facts",
  components: {
    FactList,
  },
};
</script>
