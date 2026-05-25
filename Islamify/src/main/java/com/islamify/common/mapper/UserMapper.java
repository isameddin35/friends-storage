package com.islamify.common.mapper;

import com.islamify.auth.model.dto.AuthorResponse;
import com.islamify.auth.model.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public AuthorResponse toAuthorResponse(User user) {

        return AuthorResponse.builder()
                .username(user.getUsername())
                .build();
    }

}
