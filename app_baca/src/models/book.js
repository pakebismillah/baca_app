import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    penulis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nama_yang_pinjam: {
        type: DataTypes.STRING
    },
    tahun_publish: {
        type: DataTypes.INTEGER
    },
    sudah_dikembalikan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    tanggal_pinjam: {
        type: DataTypes.DATE
    },
    tanggal_dikembalikan: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'books',
    timestamps: false
});

export default Book;
