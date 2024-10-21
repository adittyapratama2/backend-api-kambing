module.exports = (sequelize, DataTypes) => {
  const Pertumbuhan = sequelize.define("Pertumbuhan", {
    id_kambing: DataTypes.INTEGER,
    tanggal_pencatatan: DataTypes.DATEONLY,
    berat_badan: DataTypes.DECIMAL(10, 2),
    tinggi_badan: DataTypes.DECIMAL(10, 2),
    lingkar_dada: DataTypes.DECIMAL(10, 2),
    kondisi_fisik: DataTypes.STRING,
    catatan: DataTypes.TEXT,
  });

  return Pertumbuhan;
};
