# Library Application with express.js, PostgreSQL and Sequelize

## Learning Competencies

- Mampu mengkombinasikan express.js dan PostgreSQL
- Mampu menggunakan basic query pada PostgreSQL
- Mampu menggunakan ORM seperti Sequelize
- Mampu menyimpan, membaca, mengubah dan menghapus data yang telah disimpan di dalam database PostgreSQL

## Summary

Pada challenge sebelumnya kita telah mengkombinasikan express.js dan PostgresSQL, sekarang buatlah program tersebut dengan ORM (Sequelize).

## Levels

### Level 0: Store and get it now

Pada release kali ini, kita akan membuat aplikasi kita lebih dinamis dengan menyimpan data-data di dalam array `books` ke dalam sebuah table di `PostgreSQL`. Buatlah sebuah table dengan nama `books` dan skema sebagai berikut (buatlah pada model):

| Field          | Datatype | Modifiers              |
| :------------- | :------- | :--------------------- |
| id             | SERIAL   | PRIMARY KEY            |
| author         | STRING   | NOT NULL               |
| title          | STRING   | NOT NULL               |
| borrowed_name  | STRING   |                        |
| published_year | INT      |                        |
| is_returned    | BOOL     | NOT NULL DEFAULT FALSE |
| borrowed_date  | DATE     |                        |
| returned_date  | DATE     |                        |

Setelah berhasil, buatlah koneksi antara aplikasi yang kita buat dengan database `PostgreSQL` tersebut.

### Level 1: Create CRUD Operations

Setelah ORM dari aplikasi berhasil terkoneksi dengan `PostgreSQL`, sekarang saatnya kita membuat CRUD operations pada aplikasi kita.
boleh menggunakan method yang ada pada Sequelize atau melakukan dengan raw query.

Buatlah peubahan pada kode kalian untuk dapat melakukan CRUD operations dengan detail seperti dibawah:

| Method | Route          | Keterangan                                                   |
| :----- | :------------- | :----------------------------------------------------------- |
| GET    | /books         | Menampilkan semua data buku yang tersimpan di dalam database |
| POST   | /books         | Menerima data yang dikirimkan melalui form dan melakukan *insertion* pada database |
| PUT    | /books/:id     | Melakukan *update* pada buku berdasarkan `id`yang dikirimkan |
| GET    | /books/search? | Menampilkan semua data buku berdasarkan `querystring` yang dikirimkan |
| DELETE | /books/:id     | Melakukan *delete* action terhadap data buku berdasarkan `id` yang dikirimkan |

Silahkan pastikan perubahan tersebut sesuai dengan halaman-halaman yang telah tersedia berdasarkan fungsinya masing-masing.

lalu aku membuat fungsi lagi yaitu sql assistant. dia menggunakan langgraph dengan ai groq, tools nya sqltoolkit. nah lalu dia di buatkan model dan ai route nya sendiri

post /ai/ask adalah route nya. 

nah dari sini aku ingin membuat frontend nya. menggunakan react js. nanti ada 2 halaman, yang satu bagian database (query nya ditampilkan isinya) lalu satu lagi adalah halaman ai yang nanti dia bisa menyimpan obrolan, history nya di tampilkan 