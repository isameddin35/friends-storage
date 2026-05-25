package com.islamify.common.mapper;

import com.islamify.auth.model.dto.AuthorResponse;
import com.islamify.media.model.dto.MediaItemResponse;
import com.islamify.media.model.entity.MediaItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MediaItemMapper {

    private final UserMapper userMapper;


    public MediaItemResponse toResponseDto(MediaItem mediaItem) {

        AuthorResponse author = userMapper.toAuthorResponse(mediaItem.getAuthor());

        String streamUrl = "/api/media/stream/" + mediaItem.getId();

        return MediaItemResponse.builder()
                .id(mediaItem.getId())
                .title(mediaItem.getTitle())
                .type(mediaItem.getType())
                .url(streamUrl)
                .thumbnailUrl(mediaItem.getThumbnailUrl() != null ? streamUrl : null)
                .description(mediaItem.getDescription())
                .duration(mediaItem.getDuration())
                .fileFormat(mediaItem.getFileFormat())
                .size(mediaItem.getSize())
                .createdAt(mediaItem.getCreatedAt())
                .author(author)
                .tags(mediaItem.getTags())
                .build();
    }
}
