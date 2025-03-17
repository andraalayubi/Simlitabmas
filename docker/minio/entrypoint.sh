#!/bin/sh
set -e

# Start MinIO server
minio server /data --console-address ":9001" &

# Wait for server to initialize
sleep 5

# Configure client and create buckets
mc alias set local http://localhost:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}

# Function to create bucket if not exists
create_bucket_if_not_exists() {
    BUCKET_NAME=$1
    if ! mc ls local/${BUCKET_NAME} > /dev/null 2>&1; then
        mc mb local/${BUCKET_NAME}
        echo "Created bucket ${BUCKET_NAME}"
    else
        echo "Bucket ${BUCKET_NAME} already exists"
    fi
}

# Create buckets
create_bucket_if_not_exists ${MINIO_BUCKET_DOC_NAME:-doc}
create_bucket_if_not_exists ${MINIO_BUCKET_IMG_NAME:-image}
create_bucket_if_not_exists ${MINIO_BUCKET_OBJ_NAME:-objects}

# Keep container running
wait