package com.navkalpana.controller;


import com.navkalpana.dto.request.BatchRequest;
import com.navkalpana.dto.respose.ApiResponse;
import com.navkalpana.dto.respose.BatchResponse;
import com.navkalpana.services.BatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batch")
@RequiredArgsConstructor
public class BatchController {

    private final BatchService batchService;

    // CREATE
    @PostMapping
    public ApiResponse<BatchResponse> createBatch(@RequestBody @Valid BatchRequest request) {

        BatchResponse response = batchService.createBatch(request);

        return ApiResponse.success(
                HttpStatus.CREATED.value(),
                "Batch created successfully",
                response
        );
    }

    // GET ALL
    @GetMapping
    public ApiResponse<List<BatchResponse>> getAllBatches() {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Batches fetched successfully",
                batchService.getAllBatches()
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ApiResponse<BatchResponse> getBatchById(@PathVariable Long id) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Batch fetched successfully",
                batchService.getBatchById(id)
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ApiResponse<BatchResponse> updateBatch(
            @PathVariable Long id,
            @RequestBody BatchRequest request) {

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Batch updated successfully",
                batchService.updateBatch(id, request)
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBatch(@PathVariable Long id) {

        batchService.deleteBatch(id);

        return ApiResponse.success(
                HttpStatus.OK.value(),
                "Batch deleted successfully",
                null
        );
    }
}