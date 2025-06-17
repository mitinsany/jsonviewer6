Ext.define('JsonViewer.viewmodel.JsonData', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.jsondata',

    data: {
        rawJson: '',
        treeRoot: null
    },

    formulas: {
        // Автоматически добавляем кавычки при установке rawJson
        processedJson: {
            bind: '{rawJson}',
            get: function(json) {
                try {
                    return this.addQuotesToStringValues(json);
                } catch (e) {
                    return json;
                }
            }
        }
    },

    // Метод для добавления кавычек к строковым значениям
    addQuotesToStringValues: function(jsonString) {
        // Регулярные выражения для обработки JSON
        // Добавляем кавычки вокруг простых строковых значений
        return jsonString.replace(/:(\s*)([^"{\[\d][^,\]}]*)(\s*)([,\]}])/g, ':$1"$2"$3$4');
    }
});