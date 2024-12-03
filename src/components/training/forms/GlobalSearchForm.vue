<script setup>
import {computed, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";

import api from "@/api/axios.js";
import env from "../../../../env.js";

const router = useRouter();

const products = reactive({
  items: []
});

const autocompleteData = computed(() => {
  return products.items.map((item, index) => {
    return {
      index,
      ...item
    }
  });
});

const selectedItem = ref(null);

const getProducts = async (name) => {
  try {
    const response = await api.get(`/global-search/${name}`);

    return response.data;

  } catch (error) {
    if (error.response?.status === 401) {
      await router.push({
        name: "login"
      });

    } else {
      return [];
    }
  }
};

const timerId = ref(null);

// Поиск элементов
const search = async (event) => {
  clearTimeout(timerId.value);

  const name = event.target.value;

  if (!name) {
    products.items = [];

    return;
  }

  timerId.value = setTimeout(async () => {
    products.items = await getProducts(name);
  }, 500);
};

// Выбран товар(перенаправляем)
watch(selectedItem, (newIndex) => {
  if (!Number.isInteger(newIndex)) {
    return;
  }

  const id = products.items[newIndex].id;
  const type = products.items[newIndex].type;

  if (type === "membership") {
    router.push({
      name: "membership",
      params: {
        id
      }
    })
  } else {
    router.push({
      name: "training",
      params: {
        id
      }
    })
  }
})

// Очистка
const clearAutocomplete = async () => {
  selectedItem.value = null;

  products.items = [];
};
</script>

<template>
  <v-autocomplete
      class="global-search-form mt-5"
      v-model="selectedItem"
      max-width="250"
      :items="autocompleteData"
      item-value="index"
      item-title="name"
      @input="search($event)"
      @blur="clearAutocomplete"
      variant="outlined"
      density="compact"
  >
    <!--Картинка на элементе-->
    <template v-slot:item="{ props, item }">
      <v-list-item
          v-bind="props"
          :prepend-avatar="env.serverStorage + item.raw.image_path"
          :title="item.raw.name"
      ></v-list-item>
    </template>
  </v-autocomplete>
</template>