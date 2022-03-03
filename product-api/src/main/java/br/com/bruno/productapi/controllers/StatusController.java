package br.com.bruno.productapi.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/status")
public class StatusController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStatus() {
        var response = new LinkedHashMap<String, Object>();
        response.put("service", "Product-API");
        response.put("status", "up");
        response.put("HttpStatus", HttpStatus.OK.value());
        return ResponseEntity.ok(response);
    }
}
