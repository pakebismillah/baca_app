export async function up(queryInterface, Sequelize) {
  await queryInterface.removeColumn('books', 'nama_yang_pinjam');
  await queryInterface.removeColumn('books', 'sudah_dikembalikan');
  await queryInterface.removeColumn('books', 'tanggal_pinjam');
  await queryInterface.removeColumn('books', 'tanggal_dikembalikan');
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addColumn('books', 'nama_yang_pinjam', Sequelize.STRING);
  await queryInterface.addColumn('books', 'sudah_dikembalikan', {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  });
  await queryInterface.addColumn('books', 'tanggal_pinjam', Sequelize.DATE);
  await queryInterface.addColumn('books', 'tanggal_dikembalikan', Sequelize.DATE);
}
