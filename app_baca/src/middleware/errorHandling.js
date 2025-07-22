export default function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message // ini buat liat pesan error asli
    });
}

