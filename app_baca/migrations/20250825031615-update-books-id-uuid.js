export async function up(queryInterface, Sequelize) {
  await queryInterface.dropTable("books"); // drop table lama

  await queryInterface.createTable("books", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
      allowNull: false,
      primaryKey: true,
    },
    penulis: Sequelize.STRING,
    judul: Sequelize.STRING,
    nama_yang_pinjam: Sequelize.STRING,
    tahun_publish: Sequelize.INTEGER,
    sudah_dikembalikan: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    tanggal_pinjam: Sequelize.DATE,
    tanggal_dikembalikan: Sequelize.DATE,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("books"); // hapus UUID

  await queryInterface.createTable("books", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    penulis: Sequelize.STRING,
    judul: Sequelize.STRING,
    nama_yang_pinjam: Sequelize.STRING,
    tahun_publish: Sequelize.INTEGER,
    sudah_dikembalikan: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    tanggal_pinjam: Sequelize.DATE,
    tanggal_dikembalikan: Sequelize.DATE,
  });
}
