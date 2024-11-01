module.exports = (sequelize, DataTypes) => {
  const Pakan = sequelize.define("Pakan", {
    id_kandang: DataTypes.INTEGER,
    tgl_transaksi: DataTypes.DATEONLY,
    qty_pakan: DataTypes.INTEGER,
    catatan: DataTypes.TEXT,
  });

  return Pakan;
};
