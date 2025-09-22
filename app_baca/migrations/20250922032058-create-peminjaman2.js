"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("peminjaman", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
      allowNull: false,
      primaryKey: true,
    },
    bookId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "books",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    namaPeminjam: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tanggalPinjam: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    tanggalDikembalikan: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("peminjaman");
}
