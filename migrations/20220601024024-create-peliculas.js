'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Peliculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagen: {
        allowNull: false,
        type: Sequelize.STRING
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      genero: {
        allowNull: false,
        type: Sequelize.STRING
      },
      calificacion: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      creacion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      personajes: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Peliculas');
  }
};