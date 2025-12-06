import { ref } from "vue";
import { defineStore } from "pinia";
import { AlertAssembler } from "@/monitoring/infrastructure/alerts.assembler.js";
import { MonitoringApi } from "@/monitoring/infrastructure/monitoring-api.js";
import {EquipmentAssembler} from "@/monitoring/infrastructure/equipments.assembler.js";

const monitoringApi = new MonitoringApi();

/**
 * Store for Monitoring context.
 */
const useMonitoringStore = defineStore("monitoring", () => {
    /**
     * List of equipment entities.
     * @type {import('vue').Ref<Category[]>}
     */
    const equipments = ref([]);
    /**
     * List of alert entities.
     * @type {import('vue').Ref<Category[]>}
     */
    const alerts = ref([]);
    /**
     * List of error entities.
     * @type {import('vue').Ref<Category[]>}
     */
    const errors = ref([]);

    /**
     * Whether equipments have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const equipmentsLoaded = ref(false);
    /**
     * Whether alerts have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const alertsLoaded = ref(false);

    /**
     * Fetches alerts from the API and updates state.
     * @function
     * @returns {void}
     */
    function fetchAlerts() {
        monitoringApi
            .getAlerts()
            .then((response) => {
                alerts.value = AlertAssembler.toEntitiesFromResponse(response);
                alertsLoaded.value = true;
                console.log("Alerts loaded:", alerts.value);
            })
            .catch((error) => {
                errors.value.push(error);
                console.error("Error loading alerts:", error);
            });
    }

    /**
     * Fetches equipments from the API and updates state.
     * @function
     * @returns {void}
     */
    function fetchEquipments() {
        monitoringApi.getEquipment().then((response) => {
                equipments.value = EquipmentAssembler.toEntitiesFromResponse(response);
                equipmentsLoaded.value = true;
                console.log("Equipment loaded:", equipments.value);
            })
            .catch((error) => {
                errors.value.push(error);
                console.error("Error loading equipment:", error);
            });
    }

    /**
     * Deletes a alerts via the API and updates state.
     * @function
     * @param {Alert} alertId - The alert to delete.
     * @returns {void}
     */
    function deleteAlert(alertId) {
        return monitoringApi.deleteAlert(alertId)
            .then(() => {
                alerts.value = alerts.value.filter(a => a.id !== alertId);
            })
            .catch(error => errors.value.push(error));
    }

    function acknowledgeAlert(alertId) {
        return monitoringApi.acknowledgeAlert(alertId)
            .then(() => {
                const alert = alerts.value.find(a => a.id === alertId);
                if (alert) alert.acknowledged = "acknowledged";
            })
            .catch(error => errors.value.push(error));
    }

    /**
     * Gets a equipment by its ID.
     * @function
     * @param id {number|string} id - The equipment ID.
     * @returns {Equipments} The found equipment or undefined.
     */
    function getEquipmentById(id) {
        let idNum = parseInt(id);
        return equipments.value.find(equipment => equipment["id"] === idNum);
    }

    /**
     * Adds a new equipment via the API and updates state.
     * @function
     * @param {Equipments} equipment - The equipment to add.
     * @returns {void}
     */
    function addSEquipment(equipment) {
        monitoringApi.createEquipment(equipment).then(response => {
            const resource = response.data;
            const newEquipment = EquipmentAssembler.toEntityFromResource(resource);
            equipments.value.push(newEquipment);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a equipment via the API and updates state.
     * @function
     * @param {Equipments} equipment - The equipment to delete.
     * @returns {void}
     */
    function deleteEquipment(equipment) {
        const id = parseInt(equipment.id);
        monitoringApi.deleteEquipment(id).then(() => {
            const index = equipments.value.findIndex(s => s["id"] === id);
            if (index !== -1) equipments.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        equipments,
        alerts,
        errors,
        equipmentsLoaded,
        alertsLoaded,
        acknowledgeAlert,
        fetchAlerts,
        fetchEquipments,
        deleteAlert,
        deleteEquipment,
        getEquipmentById,
        addSEquipment
    };
});

export default useMonitoringStore;