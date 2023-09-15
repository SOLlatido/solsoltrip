package site.solsoltrip.backend.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class FileUtility {
    public static String getFileExtension(final String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (final StringIndexOutOfBoundsException e) {
            return "";
        }
    }
}
