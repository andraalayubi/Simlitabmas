const Minio = require('minio');


// Konfigurasi client MinIO
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT as string) || 9000,
    useSSL: process.env.MINIO_USE_SSL === 'false',
    accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
    secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin'
});

export default minioClient;
