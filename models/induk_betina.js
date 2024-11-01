module.exports = (sequelize, DataTypes) => {
  const IndukBetina = sequelize.define("Induk_betina", {
    noTag: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: true,
    },
    nama_kambing: DataTypes.STRING,
    ras: DataTypes.STRING,
    warna_dominan: DataTypes.STRING,
  });

  IndukBetina.beforeCreate(async (goat, options) => {
    // Get the maximum existing tag number
    const lastGoat = await IndukBetina.findOne({
      order: [["createdAt", "DESC"]],
    });

    // Generate the new tag
    let newTagNumber = "0001"; // Default value for the first entry
    if (lastGoat && lastGoat.noTag) {
      const lastTagNumber = parseInt(lastGoat.noTag.substring(1), 10);
      newTagNumber = (lastTagNumber + 1).toString().padStart(4, "0");
    }

    goat.noTag = `I${newTagNumber}`;
  });

  return IndukBetina;
};
