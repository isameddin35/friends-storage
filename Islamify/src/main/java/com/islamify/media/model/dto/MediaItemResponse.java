package com.islamify.media.model.dto;


import com.islamify.auth.model.dto.AuthorResponse;
import com.islamify.media.model.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MediaItemResponse {

    private UUID id;

    private String title;

    private MediaType type; // VIDEO, IMAGE, AUDIO, DOCUMENT

    private String url; // S3 link or local path

    private String thumbnailUrl;

    private String description;

    private String duration; // e.g., "03:45"

    private String fileFormat; // e.g., "MP4", "WAV"

    private Long size; // In bytes

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    private AuthorResponse author;

    private Set<String> tags;
}
