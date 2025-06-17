Ext.define('JsonViewer.view.main.JsonViewer', {
    extend: 'Ext.panel.Panel',
    xtype: 'jsonviewer',

    requires: [
        'Ext.tree.Panel',
        'Ext.grid.Panel'
    ],

    controller: 'main',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'treepanel',
            reference: 'jsonTree',
            flex: 1,
            margin: '0 5 0 0',
            rootVisible: true,  // Теперь корневой узел видим
            useArrows: true,
            bind: {
                root: '{treeRoot}'
            },
            listeners: {
                selectionchange: 'onNodeSelect'
            }
        },
        {
            xtype: 'gridpanel',
            reference: 'propertiesGrid',
            width: 300,
            title: 'Properties',
            store: {
                fields: ['name', 'value'],
                data: []
            },
            columns: [
                { text: 'Name', dataIndex: 'name', flex: 1 },
                { text: 'Value', dataIndex: 'value', flex: 2 }
            ]
        }
    ]
});