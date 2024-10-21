module.exports = (sequelize, DataTypes) => {
  const ProduksiSusu = sequelize.define("Produksi_susu", {
    id_kambing: DataTypes.INTEGER,
    tanggal_produksi: DataTypes.DATEONLY,
    volume_susu: DataTypes.DECIMAL,
    kualitas_susu: DataTypes.STRING,
    periode_laktasi: DataTypes.INTEGER,
    catatan: DataTypes.TEXT,
  });

  return ProduksiSusu;
};
