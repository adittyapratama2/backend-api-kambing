module.exports = (sequelize, DataTypes) => {
  const Goat = sequelize.define("Goat", {
    noTag: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    tanggalLahir: DataTypes.DATE,
    nama: DataTypes.STRING,
    bobot: DataTypes.FLOAT,
    kelamin: DataTypes.ENUM("jantan", "betina"),
    jenis: DataTypes.STRING,
    induk: DataTypes.STRING,
    pejantan: DataTypes.STRING,
    posisiKandang: DataTypes.STRING,
    asal: DataTypes.STRING,
    harga: DataTypes.FLOAT,
    status: DataTypes.STRING,
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
