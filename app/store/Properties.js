Ext.define('JsonViewer.store.Properties', {
    extend: 'Ext.data.Store',
    alias: 'store.properties',
    
    fields: ['name', 'value'],
    data: [],

    constructor: function(config) {
        this.callParent([config]);
        // Инициализация с пустыми данными
        this.loadData([]);
    }
});