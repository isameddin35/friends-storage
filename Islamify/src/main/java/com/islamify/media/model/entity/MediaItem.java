package com.islamify.media.model.entity;

import com.islamify.auth.model.entity.User;
import com.islamify.media.model.MediaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "media_items")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MediaItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaType type; // VIDEO, IMAGE, AUDIO, DOCUMENT

    @Column(nullable = false)
    private String url; // S3 link or local path

    private String thumbnailUrl;

    private String description;

    private String duration; // e.g., "03:45"

    private String fileFormat; // e.g., "MP4", "WAV"

    private Long size; // In bytes

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User author;

    @ElementCollection
    @CollectionTable(name = "media_tags", joinColumns = @JoinColumn(name = "media_id"))
    @Column(name = "tag")
    private Set<String> tags;
}

