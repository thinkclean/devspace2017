/* eslint-disable class-methods-use-this */
const findByObjectId = id => i => i._id.toString() === id.toString();
const findNotByObjectId = id => i => i._id.toString() !== id.toString();

const createModel = (model) => {
  let items = [];

  class MockModel {
    constructor(data) {
      this.item = new [model](data);
      this.data = data;
    }

    find() {
      return Promise.resolve(items);
    }

    findById(id) {
      return Promise.resolve(items.find(findByObjectId(id)));
    }

    findByIdAndUpdate(id, data) {
      const item = items.find(findByObjectId(id));
      if (item) {
        Object.assign(item, data);
      }
      return Promise.resolve(item);
    }

    findByIdAndRemove(id) {
      const item = items.find(findByObjectId(id));
      if (item) {
        items = items.filter(findNotByObjectId(id));
      }
      return Promise.resolve(item);
    }

    remove() {
      items = [];
      return Promise.resolve();
    }

    save() {
      let item = new [model](this.data);
      const error = item.validateSync();
      if (error) {
        return Promise.reject(error.toString());
      }
      item = item.toObject();
      items.push(item);
      return Promise.resolve(item);
    }
  }

  return MockModel;
};

module.exports = createModel;
