<script setup>

import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import {onMounted} from "vue";
import useAssetsManagementStore from "@/assets-management/application/assets-management.store.js";
import {useI18n} from "vue-i18n";

const router = useRouter();
const confirm = useConfirm();
const {t} = useI18n();
const store = useAssetsManagementStore();
const { sites, sitesLoaded, errors, fetchSites, deleteSite } = store;

onMounted(() => {
  if (!sitesLoaded) fetchSites();
  console.log(sites);
});

/**
 * Navigate to the new site creation page.
 */
const navigateToNewEquipment = () => {
  router.push({ name: 'equipment-new' });
};


/**
 * Confirm deletion of a site and execute deletion if confirmed.
 * @param {Object} site - The site object to delete.
 */
const confirmDelete = (site) => {
  confirm.require({
    message: t('categories.confirm-delete', {name: site.name}),
    header: t('categories.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteSite(site);
    },
  });
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-2">{{ t('sites.list.title') }}</h1>
    <div class="flex gap-2">
      <div class="p-4">

        <!-- Create Site -->
        <pv-button
            :label="t('sites.new.title')"
            class="mb-3"
            icon="pi pi-plus"
            @click="navigateToNewEquipment"
        />

        <pv-data-table
            :value="sites"
            :loading="!sitesLoaded"
            striped-rows
            table-style="min-width: 80rem"
            paginator
            :rows="5"
            :rows-per-page-options="[5, 10, 20]"
        >

          <!-- Name -->
          <pv-column field="name" :header="t('sites.list.name')" />

          <!-- Address -->
          <pv-column field="address" :header="t('sites.list.address')"/>

          <!-- Contact Phone -->
          <pv-column field="phone" :header="t('sites.detail.contactPhone')">
            <template #body="slotProps">
              <span
                  :style="{
                  fontWeight: 'bold'
                }"
              >
                {{ slotProps.data.phone }}
              </span>
            </template>
          </pv-column>

          <!-- Actions -->
          <pv-column :header="t('categories.actions')">
            <template #body="slotProps">
              <pv-button icon="pi pi-trash" rounded severity="danger" text @click="confirmDelete(slotProps.data)"/>
            </template>
          </pv-column>
        </pv-data-table>

        <div v-if="errors.length" class="text-red-500 mt-3">
          {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
        </div>

      </div>

      <RouterLink :to="{ name: 'site-detail', params: { siteId: '1' } }">
        <pv-button :label="t('sites.detail.title')" />
      </RouterLink>

    </div>

  </section>
</template>

<style scoped>

</style>