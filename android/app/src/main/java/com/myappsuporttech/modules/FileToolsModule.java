package com.myappsuporttech.modules;

import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.net.Uri;
import androidx.core.content.FileProvider;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import java.util.ArrayList;
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.net.URI;
import java.io.File;
import java.io.FileInputStream;

import android.webkit.MimeTypeMap;

public class FileToolsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public FileToolsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FileToolsModule";
    }

    @ReactMethod
    public void openFile(String filePath, String mimeType, Promise promise) {
        try {
            File file = new File(filePath);
    
            if (!file.exists()) {
                promise.reject("FILE_NOT_FOUND", "O arquivo não foi encontrado.");
                return;
            }
    
            Uri uri = FileProvider.getUriForFile(
                reactContext,
                reactContext.getPackageName() + ".fileprovider",
                file
            );
    
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setDataAndType(uri, mimeType);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    
            try {
                reactContext.startActivity(intent);
                promise.resolve("Arquivo aberto com sucesso!");
            } catch (ActivityNotFoundException e) {
                promise.reject("NO_APP_FOUND", "Nenhum aplicativo encontrado para abrir o arquivo.");
            }
        } catch (Exception e) {
            promise.reject("ERROR", "Ocorreu um erro ao abrir o arquivo.");
        }
    }

    @ReactMethod
    public void shareFiles(ReadableArray filePaths, ReadableArray mimeTypes, String message, Promise promise) {
        try {
            message = message == null ? "" : message;
    
            ArrayList<Uri> uris = new ArrayList<>();
            for (int i = 0; i < filePaths.size(); i++) {
                String filePath = filePaths.getString(i);
                String mimeType = mimeTypes.getString(i);
    
                File file = new File(filePath);
                if (!file.exists()) {
                    promise.reject("FILE_NOT_FOUND", "O arquivo não foi encontrado.");
                    return;
                }
    
                Uri uri = FileProvider.getUriForFile(
                    reactContext,
                    reactContext.getPackageName() + ".fileprovider",
                    file
                );
                uris.add(uri);
            }
    
            Intent intent = new Intent(Intent.ACTION_SEND_MULTIPLE);
            intent.setType(mimeTypes.getString(0)); // You can set the first mimeType as the default
            intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uris);
            intent.putExtra(Intent.EXTRA_TEXT, message);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    
            Intent chooser = Intent.createChooser(intent, "Compartilhar os arquivos");
            chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    
            reactContext.startActivity(chooser);
            promise.resolve("Compartilhamento iniciado com sucesso");
        } catch (Exception e) {
            promise.reject("ERROR", "Ocorreu um erro ao abrir os arquivos.");
        }
    }
    

    @ReactMethod
    public void shareMessage(String message, Promise promise) {
        try{
            Intent intent = new Intent(Intent.ACTION_SEND);
            
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, message);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            Intent chooser = Intent.createChooser(intent, "Compartilhar o arquivo");
            chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            reactContext.startActivity(chooser);
            promise.resolve("Compartilhamento iniciado com sucesso");
        }catch (Exception e){
            promise.reject("ERROR", "Ocorreu um erro ao compartilhar o texto.");
        }
    }

    @ReactMethod
    public void downloadFile(String fileUrl, String destinationPath, ReadableMap headersMap, String requestBody, String method, final Promise promise) {
        try {
            URL url = new URL(fileUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Defina o método HTTP
            connection.setRequestMethod(method); 

            if (headersMap != null) {
                ReadableMapKeySetIterator iterator = headersMap.keySetIterator();
                while (iterator.hasNextKey()) {
                    String key = iterator.nextKey();
                    String value = headersMap.getString(key);
                    connection.setRequestProperty(key, value);
                }
            }

            // Habilitar envio de dados no corpo
            connection.setDoOutput(true);
    
            if(!method.equals("GET")){
            // Escreva o corpo da requisição no OutputStream
                OutputStream os = new BufferedOutputStream(connection.getOutputStream());
                os.write(requestBody.getBytes());
                os.flush();
                os.close();
            } 
    
            connection.connect();
            int fileLength = connection.getContentLength();
    
            // InputStream input = new BufferedInputStream(url.openStream());
            InputStream input = connection.getInputStream();
            FileOutputStream output = new FileOutputStream(destinationPath);
    
            byte[] data = new byte[1024];
            int total = 0;
            int count;
            while ((count = input.read(data)) != -1) {
                total += count;
                output.write(data, 0, count);
            }
    
            output.flush();
            output.close();
            input.close();
    
            promise.resolve(destinationPath); // Resolve a Promise com o caminho do arquivo baixado
        } catch (IOException e) {
            promise.reject("DOWNLOAD_ERROR", e.toString() + " method " + method + " body " + requestBody); // Rejeita a Promise com o código de erro e a mensagem
        }
    }

    @ReactMethod
    public void listFiles(String directoryPath, Promise promise) {
        try {
            File directory = new File(directoryPath);
            if (directory.exists() && directory.isDirectory()) {
                File[] files = directory.listFiles();
                if (files != null) {
                    WritableArray fileArray = Arguments.createArray();
                    for (File file : files) {
                        WritableMap fileMap = Arguments.createMap();
                        if(file.isDirectory()){
                            fileMap.putString("name", file.getName() + "/");
                            fileMap.putString("path", file.getAbsolutePath());
                        }else{
                            String mimeType = getMimeType(file.getAbsolutePath());
                            fileMap.putString("name", file.getName());
                            fileMap.putString("path", file.getAbsolutePath());
                            fileMap.putString("mimetype", mimeType);
                        }
                        fileArray.pushMap(fileMap);
                    }
                    promise.resolve(fileArray);
                } else {
                    promise.reject("EMPTY_DIRECTORY", "Directory is empty");
                }
            } else {
                promise.reject("INVALID_DIRECTORY", "Invalid directory path");
            }
        }catch (NullPointerException e) {
            promise.reject("ERROR", e.toString());
        }catch (Exception e) {
            promise.reject("ERROR", e.toString());
        }
    }

    @ReactMethod
    public void copyFile(String filePath, String destPath, Boolean move, Promise promise){
        try{
            File file = new File(filePath);
            File dest = new File(destPath);

            if(file.exists()){
                FileInputStream input = new FileInputStream(file);
                FileOutputStream output = new FileOutputStream(dest);

                try{
                    byte[] data = new byte[1024];
                    int total = 0;
                    int count;
                    while ((count = input.read(data)) != -1) {
                        total += count;
                        output.write(data, 0, count);
                    }
                    
                    if(move == true){
                        file.delete();
                    }
                }catch(Exception e){
                    promise.reject("COPY_ERROR", "Ouve um erro ao copiar o arquivo");
                } finally{
                    output.close();
                    input.close();
                }

                promise.resolve(destPath);
            }else{
                promise.reject("FILE_NOT_FOUND", "arquivo não encontrado");
            }
        }catch(Exception e){
            promise.reject("ERROR", e.toString());
        }
    }

    @ReactMethod
    public void delete(String filePath, Promise promise){
        try{
            File file = new File(filePath);

            if(file.exists()){
                Boolean done = file.delete();
                if(done){
                    promise.resolve(done);
                }else{
                    promise.reject("DELETE_FAILED", "Não foi possível apagar o arquivo/diretório");
                }
            }
        }catch(Exception e){
            promise.reject("ERROR", e.toString());
        }
    }

    @ReactMethod
    public void mkDir(String path, Promise promise){
        try{
            File dic = new File(path);
            if(!dic.exists()){
                if(dic.mkdirs()){
                    promise.resolve("Diretório criado com sucesso");
                }else{
                    promise.reject("ERROR", "Erro ao criar o diretório");
                }
            }else{
                promise.reject("ERROR", "Diretório já existe");
            }
        }catch(Exception e){
            promise.reject("ERROR", e.toString());
        }
    }

    private String getMimeType(String path) {
        File file = new File(path);
        Uri uri = FileProvider.getUriForFile(
            reactContext,
            reactContext.getPackageName() + ".fileprovider",
            file
        );
        String fileExtension = MimeTypeMap.getFileExtensionFromUrl(uri.toString());
        String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(
                fileExtension.toLowerCase());
        return mimeType != null ? mimeType : "application/octet-stream";
    }

}