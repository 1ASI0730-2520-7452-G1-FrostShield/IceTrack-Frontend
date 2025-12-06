<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useAssetsManagementStore from "@/assets-management/application/assets-management.store.js";
import { Sites } from "@/assets-management/domain/model/sites.entity.js";

const { t } = useI18n();
const router = useRouter();
const store = useAssetsManagementStore();
const { addSite, errors } = store;

// Form fields
const form = ref({
  name: "",
  address: "",
  contactName: "",
  phone: ""
});

/**
 * Saves a new site using the store.
 */
const saveSite = () => {
  const site = new Sites({
    name: form.value.name,
    address: form.value.address,
    contactName: form.value.contactName,
    phone: form.value.phone
  });

  addSite(site);
  navigateBack();
};

/**
 * Navigate back to the sites list.
 */
const navigateBack = () => {
  router.push({ name: "sites" });
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">{{ t("sites.new.title") }}</h1>

    <form @submit.prevent="saveSite" class="grid gap-4">

      <!-- Name -->
      <div>
        <label class="block mb-1">{{ t("sites.new.name") }}</label>
        <pv-input-text v-model="form.name" class="w-full" required />
      </div>

      <!-- Address -->
      <div>
        <label class="block mb-1">{{ t("sites.new.address") }}</label>
        <pv-input-text v-model="form.address" class="w-full" required />
      </div>

      <!-- Contact Name -->
      <div>
        <label class="block mb-1">{{ t("sites.new.name") }}</label>
        <pv-input-text v-model="form.contactName" class="w-full" required />
      </div>

      <!-- Phone -->
      <div>
        <label class="block mb-1">{{ t("sites.new.phone") }}</label>
        <pv-input-text v-model="form.phone" class="w-full" required />
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 mt-3">
        <pv-button :label="t('sites.new.save')" icon="pi pi-save" type="submit" />
        <pv-button :label="t('sites.new.cancel')" severity="secondary" @click="navigateBack" />
      </div>
    </form>
  </div>
</template>

<style scoped></style>