module.exports = (sequelize, DataTypes) => {
  const Kandang = sequelize.define("Kandang", {
    id_pengguna: DataTypes.INTEGER,
    nama_kandang: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    kapasitas: DataTypes.INTEGER,
    jenis_kandang: DataTypes.ENUM("1", "2"),
    catatan: DataTypes.TEXT,
  });

  return Kandang;
};
