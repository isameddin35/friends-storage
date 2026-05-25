package com.islamify.storage;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Component
public interface IStorageProvider {
    String upload(MultipartFile file, String mediaName);

    InputStream download(String objectName);

//    void delete(String key);
}
