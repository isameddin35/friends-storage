package com.islamify.media.repository;

import com.islamify.media.model.MediaType;
import com.islamify.media.model.entity.MediaItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MediaRepository extends JpaRepository<MediaItem, UUID> {
    List<MediaItem> findByType(MediaType type);
}
