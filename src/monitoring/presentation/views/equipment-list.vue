<script setup>

import { useI18n } from 'vue-i18n'
import {onMounted} from "vue";
import useMonitoringStore from "@/monitoring/application/monitoring.store.js";
import {useConfirm} from "primevue/useconfirm";
import { useRouter } from "vue-router";

const router = useRouter();
const confirm = useConfirm();
const {t} = useI18n();
const store = useMonitoringStore();
const { equipments, equipmentsLoaded, errors, fetchEquipments, deleteEquipment } = store;

onMounted(() => {
  if (!equipmentsLoaded) fetchEquipments();
  console.log(equipments);
});

/**
 * Navigate to the new equipment creation page.
 */
const navigateToNew = () => {
  router.push({ name: 'equipment-new' });
};

/**
 * Confirm deletion of a equipment and execute deletion if confirmed.
 * @param {Object} equipment - The equipment object to delete.
 */
const confirmDelete = (equipment) => {
  confirm.require({
    message: t('categories.confirm-delete', {name: equipment.name}),
    header: t('categories.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteEquipment(equipment);
    },
  });
};
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-2">{{ t('equipments.list.title') }}</h1>

    <div class="flex gap-2">
      <div class="p-4">

        <!-- Create Equipment -->
        <pv-button
            :label="t('equipments.new.title')"
            class="mb-3"
            icon="pi pi-plus"
            @click="navigateToNew"
        />

        <pv-data-table
            :value="equipments"
            :loading="!equipmentsLoaded"
            striped-rows
            table-style="min-width: 80rem"
            paginator
            :rows="5"
            :rows-per-page-options="[5, 10, 20]"
        >

          <!-- Model -->
          <pv-column field="model" :header="t('equipments.list.model')">
            <template #body="slotProps">
              <span
                  :style="{
                  fontWeight: 'bold'
                }"
              >
                {{ slotProps.data.model }}
              </span>
            </template>
          </pv-column>

          <!-- Serial -->
          <pv-column field="type" :header="t('equipments.list.type')">
          </pv-column>

          <!-- Serial -->
          <pv-column field="serial" :header="t('equipments.list.serial')">
          </pv-column>

          <!-- Status -->
          <pv-column field="status" :header="t('equipments.list.status')">
            <template #body="slotProps">
              <span
                  :style="{
                  color:
                    slotProps.data.status === 'active'
                      ? 'green'
                    : slotProps.data.status === 'maintenance'
                      ? 'red'
                      : '',
                  fontWeight: 'bold'
                }"
              >
                {{ slotProps.data.status }}
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

      <RouterLink :to="{ name: 'equipment-detail', params: { equipmentId: '1' } }">
        <pv-button :label="t('equipments.detail.title')" />
      </RouterLink>

    </div>
  </section>
</template>

<style scoped>

</style>
