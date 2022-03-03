package br.com.bruno.productapi.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import java.util.LinkedHashMap;

import static br.com.bruno.productapi.utils.JsonConversionUtil.asJsonString;
import static org.hamcrest.core.Is.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class StatusControllerTest {

    private static final String URN = "/api/v1/status";

    @InjectMocks
    private StatusController statusController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(statusController)
                .setCustomArgumentResolvers()
                .setViewResolvers((s, locale) -> new MappingJackson2JsonView())
                .build();
    }

    @Test
    @DisplayName("(1) Should return 200 OK status")
    void whenStatusEndpointIsCalledThenReturn200OKStatus() throws Exception {
        var response = new LinkedHashMap<String, Object>();
        response.put("service", "Product-API");
        response.put("status", "up");
        response.put("HttpStatus", HttpStatus.OK.value());
        mockMvc.perform(MockMvcRequestBuilders.get(URN)
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(response)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.service", is("Product-API")))
                .andExpect(jsonPath("$.status", is("up")))
                .andExpect(jsonPath("$.HttpStatus", is(200)));
    }
}
