module.exports = (sequelize, DataTypes) => {
  const Kesehatan = sequelize.define("Kesehatan", {
    id_kambing: DataTypes.INTEGER,
    tanggal_periksa: DataTypes.DATEONLY,
    diagnosa: DataTypes.TEXT,
    pengobatan: DataTypes.TEXT,
    vaksinasi: DataTypes.STRING,
  });

  return Kesehatan;
};
