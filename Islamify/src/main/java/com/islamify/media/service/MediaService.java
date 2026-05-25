package com.islamify.media.service;


import com.islamify.auth.model.entity.User;
import com.islamify.auth.service.AuthService;
import com.islamify.common.mapper.MediaItemMapper;
import com.islamify.common.mapper.UserMapper;
import com.islamify.common.util.MediaUtils;
import com.islamify.media.model.MediaType;
import com.islamify.media.model.dto.MediaItemResponse;
import com.islamify.media.model.entity.MediaItem;
import com.islamify.media.repository.MediaRepository;
import com.islamify.storage.IStorageProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final MediaRepository mediaRepository;
    private final MediaItemMapper mediaItemMapper;
    private final IStorageProvider storageProvider;
    private final AuthService authService;


    public List<MediaItemResponse> getAllMedia() {

        List<MediaItem> mediaItems = mediaRepository.findAll();

        return mediaItems.stream().map(mediaItemMapper::toResponseDto).toList();
    }

    public List<MediaItemResponse> getMediaByType(MediaType type) {

        List<MediaItem> mediaItems = mediaRepository.findByType(type);

        return mediaItems.stream().map(mediaItemMapper::toResponseDto).toList();
    }

    public MediaItemResponse getMediaById(UUID id) {

        MediaItem mediaItem = mediaRepository.findById(id).orElseThrow(() -> new RuntimeException("Media not Found"));

        return mediaItemMapper.toResponseDto(mediaItem);
    }


    @Transactional
    public MediaItemResponse uploadMedia(MultipartFile file) {

        String mediaName = MediaUtils.generateUniqueObjectName(file.getOriginalFilename());
        String contentType = file.getContentType();
        MediaType mediaType = resolveMediaType(contentType);
        User user = authService.getCurrentUser();



        String mediaUrl;
        try {
            mediaUrl = storageProvider.upload(file, mediaName);
        } catch (Exception e) {
            throw new RuntimeException("Unable to upload file: " + mediaName);
        }

        MediaItem mediaItem = MediaItem.builder()
                .title(mediaName)
                .type(mediaType)
                .url(mediaUrl)
                .thumbnailUrl(mediaType == MediaType.IMAGE || mediaType == MediaType.VIDEO ? mediaUrl : null)
                .description("")
                .fileFormat(getExtension(mediaName))
                .size(file.getSize())
                .author(user)
                .tags(new HashSet<>())
                .build();

        mediaRepository.save(mediaItem);
        return mediaItemMapper.toResponseDto(mediaItem);

    }

    public MediaItem getMediaEntityById(UUID id) {
        return mediaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Media not found"));
    }

    private MediaType resolveMediaType(String contentType) {

        if (contentType == null) {
            return MediaType.DOCUMENT;
        }

        if (contentType.startsWith("image/")) {
            return MediaType.IMAGE;
        }

        if (contentType.startsWith("video/")) {
            return MediaType.VIDEO;
        }

        if (contentType.startsWith("audio/")) {
            return MediaType.AUDIO;
        }

        return MediaType.DOCUMENT;
    }

    private String getExtension(String filename) {

        if (filename == null || !filename.contains(".")) {
            return "";
        }

        return filename.substring(filename.lastIndexOf('.') + 1).toUpperCase();
    }
}
