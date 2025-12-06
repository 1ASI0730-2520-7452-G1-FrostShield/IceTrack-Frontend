import { ref } from "vue";
import { defineStore } from "pinia";
import { SitesAssembler } from "@/assets-management/infrastructure/sites.assembler.js";
import { AssetsManagementApi } from "@/assets-management/infrastructure/assets-management-api.js";

const assetsManagementApi = new AssetsManagementApi();

/**
 * Store for Assets Management context.
 */
const useAssetsManagementStore = defineStore('assetsManagement', () => {
    /**
     * List of site entities.
     * @type {import('vue').Ref<Site[]>}
     */
    const sites = ref([]);
    /**
     * List of errors encountered during API operations.
     * @type {import('vue').Ref<Error[]>}
     */
    const errors = ref([]);
    /**
     * Whether sites have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const sitesLoaded = ref(false);

    /**
     * Fetches sites from the API and updates state.
     * @function
     * @returns {void}
     */
    function fetchSites() {
        assetsManagementApi.getSites().then(response => {
            sites.value = SitesAssembler.toEntitiesFromResponse(response);
            sitesLoaded.value = true;
            console.log(sitesLoaded.value);
            console.log(sites.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Gets a site by its ID.
     * @function
     * @param id {number|string} id - The site ID.
     * @returns {Sites} The found site or undefined.
     */
    function getSiteById(id) {
        let idNum = parseInt(id);
        return sites.value.find(site => site["id"] === idNum);
    }

    /**
     * Adds a new site via the API and updates state.
     * @function
     * @param {Sites} site - The site to add.
     * @returns {void}
     */
    function addSite(site) {
        assetsManagementApi.createSite(site).then(response => {
            const resource = response.data;
            const newSite = SitesAssembler.toEntityFromResource(resource);
            sites.value.push(newSite);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a site via the API and updates state.
     * @function
     * @param {Sites} site - The site to delete.
     * @returns {void}
     */
    function deleteSite(site) {
        const id = parseInt(site.id);
        assetsManagementApi.deleteSite(id).then(() => {
            const index = sites.value.findIndex(s => s["id"] === id);
            if (index !== -1) sites.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }


    return {
        sites,
        errors,
        sitesLoaded,
        fetchSites,
        getSiteById,
        addSite,
        deleteSite
    }
});


export default useAssetsManagementStore;