package com.recipe.backend.service.impl;

import com.recipe.backend.properties.FileStorageProperties;
import com.recipe.backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    private Path userRecipeFileLocation = null;

    @Autowired
    public FileServiceImpl(FileStorageProperties fileStorageProperties) {
        this.userRecipeFileLocation = Paths.get(fileStorageProperties.getRecipePhotoDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.userRecipeFileLocation);
        } catch (Exception ex) {
//            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
            System.out.println(ex);
        }

    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.userRecipeFileLocation.resolve(fileName).normalize();
            System.out.println(">>> filePath  >>  "+filePath.toUri());

            Resource resource = new UrlResource(filePath.toUri());
            System.out.println(">>> resource isFile  >>  "+resource.isFile());

            if (resource.exists()) {
                return resource;
            } else {
                System.out.println("File not found 111");
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            System.out.println("File not found 222");
            throw new RuntimeException("File not found " + fileName);
        }
    }

    public String saveFile(MultipartFile file)  {
        String uploadDir = this.userRecipeFileLocation.toString();

        if(file == null){
            throw new RuntimeException("Please provide your File");
        }
        String uuid = UUID.randomUUID().toString();
        String filename = uuid.concat(".").concat(getExtension(file.getOriginalFilename()));
        String path = uploadDir + File.separator + filename;

        // saving file in path
        try {
            InputStream inputstream = file.getInputStream();
            OutputStream outputstream = new FileOutputStream(new File(path));
            int read = 0;
            byte[] bytes = new byte[1024];
            while ((read = inputstream.read(bytes)) != -1) {
                outputstream.write(bytes, 0, read);
            }
            outputstream.flush();
            outputstream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return filename;
    }

    public boolean removeFile(String fileLocation){
        File file = new File(fileLocation);
        if(file.delete()) {
            System.out.println("File deleted successfully");
            return true;
        } else {
            System.out.println("Failed to delete the file");
            return false;
        }
    }

    public String getExtension(String path){
        String[] fileNameArray = path.split("\\.");
        return fileNameArray[fileNameArray.length-1];
    }
}