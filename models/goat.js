module.exports = (sequelize, DataTypes) => {
  const Goat = sequelize.define("Goat", {
    noTag: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    nama_kambing: DataTypes.STRING,
    ras: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    jenis_kelamin: DataTypes.ENUM("jantan", "betina"),
    id_kambing_betina: DataTypes.INTEGER,
    id_kambing_jantan: DataTypes.INTEGER,
    id_kandang: DataTypes.INTEGER,
    warna_dominan: DataTypes.STRING,
    status: DataTypes.ENUM("1", "2"),
  });

  Goat.beforeCreate(async (goat, options) => {
    // Get the maximum existing tag number
    const lastGoat = await Goat.findOne({
      order: [["createdAt", "DESC"]],
    });

    // Generate the new tag
    let newTagNumber = "0001"; // Default value for the first entry
    if (lastGoat && lastGoat.noTag) {
      const lastTagNumber = parseInt(lastGoat.noTag.substring(1), 10);
      newTagNumber = (lastTagNumber + 1).toString().padStart(4, "0");
    }

    goat.noTag = `K${newTagNumber}`;
  });

  return Goat;
};
