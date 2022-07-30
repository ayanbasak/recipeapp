package com.recipe.backend.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    Resource loadFileAsResource(String fileName);
    String saveFile(MultipartFile file);
}
