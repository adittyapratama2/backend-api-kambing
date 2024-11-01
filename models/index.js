const { Sequelize } = require("sequelize");
const config = require("../config/config");

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user")(sequelize, Sequelize);
db.Kandang = require("./kandang")(sequelize, Sequelize);
db.IndukKambing = require("./induk_betina")(sequelize, Sequelize);
db.PejantanKambing = require("./induk_pejantan")(sequelize, Sequelize);
db.Goat = require("./goat")(sequelize, Sequelize);
db.Care = require("./care")(sequelize, Sequelize);
db.Perkawinan = require("./perkawinan")(sequelize, Sequelize);
db.PertumbuhanKambing = require("./pertumbuhan")(sequelize, Sequelize);
db.PemerahanKambing = require("./pemerahan")(sequelize, Sequelize);
db.KesehatanKambing = require("./kesehatan")(sequelize, Sequelize);
db.ProduksiSusu = require("./produksi_susu")(sequelize, Sequelize);
db.PakanKambing = require("./pakan")(sequelize, Sequelize);

// Define relationships

db.IndukKambing.hasMany(db.Goat, {
  foreignKey: "id_kambing_betina",
  sourceKey: "id",
  as: "indukBetina",
});
db.Goat.belongsTo(db.IndukKambing, {
  foreignKey: "id_kambing_betina",
  targetKey: "id",
  as: "indukBetina",
});

db.PejantanKambing.hasMany(db.Goat, {
  foreignKey: "id_kambing_jantan",
  sourceKey: "id",
  as: "indukPejantan",
});
db.Goat.belongsTo(db.PejantanKambing, {
  foreignKey: "id_kambing_jantan",
  targetKey: "id",
  as: "indukPejantan",
});

db.Kandang.hasMany(db.Goat, {
  foreignKey: "id_kandang",
  targetKey: "id",
  as: "kandangKambing",
});

db.Goat.belongsTo(db.Kandang, {
  foreignKey: "id_kandang",
  targetKey: "id",
  as: "kandangKambing",
});

db.IndukKambing.hasMany(db.Perkawinan, {
  foreignKey: "id_kambing_betina",
  targetKey: "id",
  as: "kawinBetina",
});

db.Perkawinan.belongsTo(db.IndukKambing, {
  foreignKey: "id_kambing_betina",
  targetKey: "id",
  as: "kawinBetina",
});

db.PejantanKambing.hasMany(db.Perkawinan, {
  foreignKey: "id_kambing_jantan",
  targetKey: "id",
  as: "kawinJantan",
});

db.Perkawinan.belongsTo(db.PejantanKambing, {
  foreignKey: "id_kambing_jantan",
  targetKey: "id",
  as: "kawinJantan",
});

db.Goat.hasMany(db.Perkawinan, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "kawinKambing",
});

db.Perkawinan.belongsTo(db.Goat, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "kawinKambing",
});

db.Goat.hasMany(db.PertumbuhanKambing, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "tumbuhKambing",
});

db.PertumbuhanKambing.belongsTo(db.Goat, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "tumbuhKambing",
});

db.Goat.hasMany(db.PemerahanKambing, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "perahKambing",
});

db.PemerahanKambing.belongsTo(db.Goat, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "perahKambing",
});

db.Goat.hasMany(db.KesehatanKambing, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "kesehatanKambing",
});

db.KesehatanKambing.belongsTo(db.Goat, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "kesehatanKambing",
});

db.Kandang.hasMany(db.PakanKambing, {
  foreignKey: "id_kandang",
  targetKey: "id",
  as: "pakanKandang",
});

db.PakanKambing.belongsTo(db.Kandang, {
  foreignKey: "id_kandang",
  targetKey: "id",
  as: "pakanKandang",
});

db.Goat.hasMany(db.ProduksiSusu, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "produksiSusu",
});

db.ProduksiSusu.belongsTo(db.Goat, {
  foreignKey: "id_kambing",
  targetKey: "id",
  as: "produksiSusu",
});

module.exports = db;
