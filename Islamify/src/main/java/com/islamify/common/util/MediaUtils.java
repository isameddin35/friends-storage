package com.islamify.common.util;

import java.util.UUID;

public class MediaUtils {

    public static String generateUniqueObjectName(String filename) {
        return UUID.randomUUID() + "_" + filename;
    }
}
