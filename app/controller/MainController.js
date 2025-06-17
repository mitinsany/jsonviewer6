Ext.define('JsonViewer.controller.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onNodeSelect: function (tree, selected) {
        if (!selected || selected.length === 0) return;

        const node = selected[0];
        const grid = this.lookupReference('propertiesGrid');

        if (!grid) {
            console.error('Properties grid not found');
            return;
        }

        const store = grid.getStore();
        if (!store) {
            console.error('Store not initialized');
            return;
        }

        store.removeAll();

        if (node.isLeaf()) {
            store.add({ name: 'Value', value: node.get('value') });
        } else {
            const data = node.data;
            Object.keys(data).forEach(function(key) {
                if (key !== 'children') {
                    store.add({
                        name: Ext.String.capitalize(key),
                        value: Ext.isObject(data[key]) ? '[Object]' : data[key]
                    });
                }
            });
        }
    }
});