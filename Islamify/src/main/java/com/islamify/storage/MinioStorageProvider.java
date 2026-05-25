package com.islamify.storage;

import io.minio.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.concurrent.TimeUnit;


@Component
@RequiredArgsConstructor
public class MinioStorageProvider implements com.islamify.storage.IStorageProvider {

    private final MinioClient minioClient;

    @Value("${echovault.minio.bucket-name}")
    private String bucket;

    @PostConstruct
    public void init() {
        initializeBucket();
    }

    public void initializeBucket() {
        try {
            boolean exists = minioClient.bucketExists(BucketExistsArgs.builder()
                    .bucket(bucket).build());

            if (!exists) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
            }

        } catch (Exception e) {
            throw new RuntimeException(bucket);
        }
    }


    @Override
    public String upload(MultipartFile file, String mediaName) {

        try {

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(mediaName)
                            .stream(file.getInputStream(), file.getSize(), -1L)
                            .contentType(file.getContentType())
                            .build()
            );

            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Http.Method.GET)
                            .bucket(bucket)
                            .object(mediaName)
                            .expiry(7, TimeUnit.DAYS)
                            .build()

            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file", e);
        }


    }

    @Override
    public InputStream download(String objectName) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucket)
                            .object(objectName)
                            .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to download file", e);
        }
    }

    //HARD DELETE

//    @Override
//    public void delete(String objectName) {
//        try {
//            minioClient.removeObject(RemoveObjectArgs.builder()
//                    .bucket(bucket)
//                    .object(objectName)
//                    .build());
//        } catch (Exception e) {
//            throw new FileStorageException("Failed to delete file", e);
//        }
//    }
}
