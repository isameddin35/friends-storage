package com.islamify.media.controller;


import com.islamify.media.model.MediaType;
import com.islamify.media.model.dto.MediaItemResponse;
import com.islamify.media.model.entity.MediaItem;
import com.islamify.media.service.MediaService;
import com.islamify.storage.IStorageProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/media")
@RequiredArgsConstructor
public class MediaController {

    private final MediaService mediaService;
    private final IStorageProvider storageProvider;

    @GetMapping
    public List<MediaItemResponse> getAllMedia(
            @RequestParam(required = false) MediaType type
    ) {
        if (type != null) {
            return mediaService.getMediaByType(type);
        }
        return mediaService.getAllMedia();
    }

    @GetMapping("{id}")
    public MediaItemResponse getMediaById(@PathVariable UUID id) {
        return mediaService.getMediaById(id);
    }

    @PostMapping("upload")
    public MediaItemResponse uploadMedia(@RequestParam MultipartFile file) {
        return mediaService.uploadMedia(file);
    }

    @GetMapping("stream/{id}")
    public ResponseEntity<InputStreamResource> streamMedia(@PathVariable UUID id) {
        MediaItem mediaItem = mediaService.getMediaEntityById(id);
        InputStream stream = storageProvider.download(mediaItem.getTitle());
        return ResponseEntity.ok()
                .contentType(MediaTypeFactory.getMediaType(mediaItem.getFileFormat())
                        .orElse(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM))
                .body(new InputStreamResource(stream));
    }

    @PatchMapping("{id}")
    public void deleteFile(@PathVariable UUID id) {

    }

    @GetMapping("download/{id}")
    public MediaItemResponse downloadMedia(@PathVariable UUID id) {
        return null;
    }
}
