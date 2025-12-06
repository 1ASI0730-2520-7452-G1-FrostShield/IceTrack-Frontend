const equipmentDetail = () => import('./views/equipment-detail.vue');
const equipmentForm = () => import('./views/equipment-form.vue');
const alertList = () => import('./views/alerts-list.vue');

const monitoringRoutes = [
    { path: 'equipment',            name: 'monitoring-equipment-list',   component: equipmentDetail(), meta: { title: 'Equipment' }},
    { path: 'equipment/new',        name: 'monitoring-equipment-new',    component: equipmentForm(),  meta: { title: 'New Equipment' } },
    { path: 'equipment/:id/edit',   name: 'monitoring-equipment-edit',   component: equipmentDetail(), meta: { title: 'Edit Equipment' } },
    { path: 'alert',                name: 'monitoring-alerts',           component: alertList(),       meta: { title: 'Alerts' } },
];

export default monitoringRoutes;
