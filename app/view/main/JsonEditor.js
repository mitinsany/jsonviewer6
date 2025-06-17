Ext.define('JsonViewer.view.main.JsonEditor', {
    extend: 'Ext.panel.Panel',
    xtype: 'jsoneditor',

    layout: 'fit',

    initComponent: function () {
        this.items = [this.createEditor()];
        this.callParent();
    },

    createEditor: function () {
        return {
            xtype: 'textarea',
            bind: '{jsonString}',
            enableKeyEvents: true,
            listeners: {
                change: {
                    fn: this.onTextChange,
                    scope: this,
                    buffer: 500
                }
            }
        };
    },

    onTextChange: function (field) {
        const vm = this.lookupViewModel();
        const inputText = field.getValue().trim();

        if (!inputText) {
            vm.set('treeRoot', null);
            return;
        }

        try {
            // Парсим как есть (ожидаем валидный JSON)
            const jsonData = JSON.parse(inputText);
            vm.set('treeRoot', this.createTreeRoot(jsonData));
        } catch (e) {
            console.error('Invalid JSON', e);
            Ext.Msg.alert('Error', 'Invalid JSON format. Please use valid JSON with quotes.');
        }
    },

    createTreeRoot: function (data) {
        return {
            text: 'JSON Data',
            expanded: true,
            children: this.parseChildren(data)
        };
    },

    parseChildren: function (data) {
        if (Ext.isArray(data)) {
            return Ext.Array.map(data, function (item, i) {
                return this.createNode(i.toString(), item);
            }, this);
        }

        if (Ext.isObject(data)) {
            return Ext.Object.getKeys(data).map(function (key) {
                return this.createNode(key, data[key]);
            }, this);
        }

        return [{
            text: String(data),
            leaf: true,
            value: data
        }];
    },

    createNode: function (name, value) {
        const node = {
            text: name,
            expanded: false
        };

        if (Ext.isObject(value) || Ext.isArray(value)) {
            node.children = this.parseChildren(value);
            node.leaf = node.children.length === 0;
        } else {
            node.text = name + ': ' + value;
            node.leaf = true;
            node.value = value;
        }

        return node;
    }
});