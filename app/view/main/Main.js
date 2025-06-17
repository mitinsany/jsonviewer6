Ext.define('JsonViewer.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'JsonViewer.controller.MainController',
        'JsonViewer.viewmodel.JsonData',
        'JsonViewer.view.main.JsonEditor',
        'JsonViewer.view.main.JsonViewer'
    ],
    controller: 'main',
    viewModel: { type: 'jsondata' },

    items: [{
        xtype: 'jsoneditor',
        title: 'JSON Editor',
        closable: false
    }, {
        xtype: 'jsonviewer',
        title: 'JSON Viewer',
        closable: false
    }]
});