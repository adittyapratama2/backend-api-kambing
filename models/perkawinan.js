module.exports = (sequelize, DataTypes) => {
  const Perkawinan = sequelize.define("Perkawinan", {
    id_kambing: DataTypes.INTEGER,
    tanggal_perkawinan: DataTypes.DATEONLY,
    id_kambing_betina: DataTypes.INTEGER,
    id_kambing_jantan: DataTypes.INTEGER,
    status_perkawinan: DataTypes.ENUM("1", "2"), // Assuming "1" = successful, "2" = failed or other statuses
  });

  return Perkawinan;
};
