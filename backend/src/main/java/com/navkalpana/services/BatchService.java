package com.navkalpana.services;


import com.navkalpana.dto.request.BatchRequest;
import com.navkalpana.dto.respose.BatchResponse;

import java.util.List;

public interface BatchService {

    BatchResponse createBatch(BatchRequest request);

    List<BatchResponse> getAllBatches();

    BatchResponse getBatchById(Long id);

    BatchResponse updateBatch(Long id, BatchRequest request);

    void deleteBatch(Long id);
}