define('model', [], function () {

    var module = function (data) {
        var self = this;
        self.data = data;

        self.addItem = function (item) {
            if (item.length === 0) {
                return;
            }
            self.data.push(item);

            return self.data;
        };

        self.removeItem = function (item) {
            var index = self.data.indexOf(item);

            if (index === -1) {
                return;
            }
            self.data.splice(index, 1);
            self.updateLocalStorage();

            return self.data;
        };

        self.editItem = function (indexEdit, valueEditTask) {
            if (indexEdit) {
                var editElem = indexEdit - 1;
                self.data[editElem] = valueEditTask.text();
                return self.data;
            }
        }
    };
    return module;

});


