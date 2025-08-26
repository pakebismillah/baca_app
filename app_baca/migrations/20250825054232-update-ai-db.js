'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ai_logs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      prompt: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      response: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: true, // fleksibel simpan info tambahan
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ai_logs');
  },
};
