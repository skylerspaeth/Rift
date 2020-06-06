const mongoose = require('mongoose');

run().catch(error => console.log(error.stack));

async function run() {
    await mongoose.connect('mongodb://localhost:27017/riftDB', { useUnifiedTopology: true, useNewUrlParser: true });
    const { riftSchema } = require('./rift.model.js');
    const Rift = mongoose.model('Rift', riftSchema);

    // module.exports.allRifts = await async function () { return Rift.find({}, (err, results) => err ? err : results).lean().then((object) => object) };
    module.exports.allRifts = function () {
        return User
            .findOne({})
            .then(function (arr) {
                return arr;
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    module.exports.riftCrud = {
        create: function (object) {
            Rift.create(object);
        },
        read: function (riftName) {
            Rift.find({ name: riftName }, (err, result) => {
                if (err) { return err; }
                else { return result; }
            });
        },
        update: function () { },
        delete: function () { },
        forEach: async function () {
            await Rift.find({}, (err, results) => {
                // ret = results;
                // console.log(ret);
                return results;
            }).exec()
        }
    }
}