<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import useMonitoringStore from "@/monitoring/application/monitoring.store.js";
import { Equipments } from "@/monitoring/domain/model/equipments.entity.js";

const router = useRouter();
const { t } = useI18n();
const store = useMonitoringStore();
const { addSEquipment, errors } = store;

const form = ref({
  model: "",
  type: "",
  serial: "",
  status: "active",
  installed: new Date(),
  lastSeen: new Date(),
  setPoint: 0,
  name: "",
  manufacturer: "",
  online: true
});


const saveEquipment = () => {
  const equipment = new Equipments({
    ...form.value
  });

  addSEquipment(equipment);
  router.push({ name: "equipments" });
};

const cancel = () => {
  router.push({ name: "equipments" });
};
</script>

<template>
  <section class="p-4">
    <h1 class="text-2xl font-semibold mb-4"> {{ t("equipments.new.title") }} </h1>

    <form @submit.prevent="saveEquipment" class="grid gap-4">

      <!-- Name -->
      <div>
        <label class="block mb-1">Name</label>
        <pv-input-text v-model="form.name" class="w-full" required />
      </div>

      <!-- Model -->
      <div>
        <label class="block mb-1">Model</label>
        <pv-input-text v-model="form.model" class="w-full" required />
      </div>

      <!-- Type -->
      <div>
        <label class="block mb-1">Type</label>
        <pv-input-text v-model="form.type" class="w-full" required />
      </div>

      <!-- Serial -->
      <div>
        <label class="block mb-1">Serial</label>
        <pv-input-text v-model="form.serial" class="w-full" required />
      </div>

      <!-- Manufacturer -->
      <div>
        <label class="block mb-1">Manufacturer</label>
        <pv-input-text v-model="form.manufacturer" class="w-full" required />
      </div>

      <!-- Status -->
      <div>
        <label class="block mb-1">Status</label>
        <pv-dropdown
            class="w-full"
            v-model="form.status"
            :options="[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
            { label: 'Maintenance', value: 'maintenance' }
          ]"
        />
      </div>

      <!-- Installed -->
      <div>
        <label class="block mb-1">Installed</label>
        <pv-calendar v-model="form.installed" class="w-full" showIcon />
      </div>

      <!-- Last Seen -->
      <div>
        <label class="block mb-1">Last Seen</label>
        <pv-calendar v-model="form.lastSeen" class="w-full" showIcon />
      </div>

      <!-- Set Point -->
      <div>
        <label class="block mb-1">Set Point (°C)</label>
        <pv-input-number v-model="form.setPoint" class="w-full" />
      </div>

      <!-- Online -->
      <div>
        <label class="block mb-1">Online</label>
        <pv-dropdown
            v-model="form.online"
            class="w-full"
            :options="[
            { label: 'Online', value: true },
            { label: 'Offline', value: false }
          ]"
        />
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 mt-4">
        <pv-button label="Save" icon="pi pi-save" type="submit" />
        <pv-button label="Cancel" severity="secondary" @click="cancel" />
      </div>
    </form>

    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ errors.map(e => e.message).join(", ") }}
    </div>
  </section>
</template>

<style scoped></style>