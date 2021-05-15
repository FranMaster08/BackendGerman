const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

  /*- [ ] El model de Receta debe tener las siguientes propiedades:
  - ID: *
  - Nombre *
  - Resumen del plato *
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
  */


  module.exports = (sequelize) => {
    const Recipe = sequelize.define('recipe', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spoonacularScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image:{
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  }