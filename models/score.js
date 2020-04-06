module.exports = function (sequelize, DataTypes) {
  const Score = sequelize.define("Scores", {
    name: DataTypes.STRING,
    score: DataTypes.INTEGER,
  });
  return Score;
};
