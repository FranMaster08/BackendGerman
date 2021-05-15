const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Diet = sequelize.define('diet', {
    name:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
