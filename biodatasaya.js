const express = require('express');
const app = express(); // menggunakan library express
const PORT = 3006; // port server bisa diubah, namun minimal 4 angka.

const { logger } = require('./biodataKu/log.middlewareku.js'); // kebutuhan console.log di terminal saat pengetesan aplikasi

//middleware untuk penerimaan json dari express
app.use(express.json());
app.use(logger);

// output ketika server berhasil dijalankan
app.listen(PORT, 'localhost', () => {
    console.log(`Server Berhasil dijalankan! Klik disini untuk langsung mengakses localhostmu: http://localhost:${PORT}`);
});

// Representasi dari database biodata saya
let biodata = [
        {id: 1, name: "Reihan"},
        {id: 2, age: "16"},
        {id: 3, my_address: "BTR 7 CLSTR FALLOPIA"},
        {id: 4, social_media: "@Leoreyaa"},
        {id: 5, telephone: "+6282123571665"},
];

// Memberikan respon kepada user bahwa request berhasil diterima
app.get('/biodata', (request, response) => {
    response.status(200).json(biodata); // memberikan jawaban ketika berhasil diupdate kedalam json biodataku
});

// memberikan respon yang lebih spesifik (ada kondisi saat berhasil dan gagal)
app.get('/biodata/:id', (request, response) => {
    const biodataku = biodata.find(data => data.id === parseInt(request.params.id));

    if(biodataku) {
        response.json(biodataku); //  memberikan jawaban ketika berhasil diupdate kedalam json biodataku
    }else{
        response.status(400).json({ // namun jika gagal, maka :
            pesan: "Error!!! Biodata kamu tidak ditemukan :( ."
        });
    }
});

// Membuat biodata baru
app.post('/biodata', (request, response) => {
    const biodataBaru = {
        id: biodata.length + 1, 
        ...request.body,
    };

    biodata.push(biodataBaru); // menambahkan biodata baru ke dalam biodataku
    response.status(201).json(biodataBaru); // memberikan jawaban ketika berhasil diupdate kedalam json biodataku
});

// meng-update/menambahkan biodata yang sudah ada
app.put('/biodata/:id', (request, response) => {
    const biodataku = biodata.find(
    data => data.id === parseInt(request.params.id));
    
    if(biodataku) {
        biodataku.name = request.body.name; // meminta isi nama
        biodataku.age = request.body.age; // meminta umur
        biodataku.my_address = request.body.my_address; // meminta alamat
        biodataku.social_media = request.body.social_media; // meminta nama sosial media saya
        biodataku.telephone = request.body.telephone; // meminta nomor telepon
    
        response.json(biodataku); // memberikan jawaban ketika berhasil diupdate kedalam json biodataku

    }else{
        response.status(404).json({ // jika gagal, maka :
            pesan: "Error! Biodatamu tidak ditemukan."
            });
    }
});
