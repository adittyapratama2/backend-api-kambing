module.exports = (sequelize, DataTypes) => {
  const Pemerahan = sequelize.define("Pemerahan", {
    id_kambing: DataTypes.INTEGER,
    tanggal_perah: DataTypes.DATEONLY,
    volume_susu: DataTypes.DECIMAL(10, 2),
    kualitas_susu: DataTypes.STRING,
    catatan_perah: DataTypes.TEXT,
  });

  return Pemerahan;
};
