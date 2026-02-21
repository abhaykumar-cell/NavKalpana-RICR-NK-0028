package com.navkalpana.services.implementation;



import com.navkalpana.dto.request.BatchRequest;
import com.navkalpana.dto.respose.BatchResponse;
import com.navkalpana.entity.Batch;
import com.navkalpana.repo.BatchRepository;
import com.navkalpana.services.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BatchServiceImpl implements BatchService {

    private final BatchRepository batchRepository;

    @Override
    public BatchResponse createBatch(BatchRequest request) {

        Batch batch = Batch.builder()
                .name(request.getName())
                .type(request.getType())
                .totalStudents(request.getTotalStudents())
                .progressPercentage(request.getProgressPercentage())
                .status(Batch.Status.valueOf(request.getStatus()))
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        Batch saved = batchRepository.save(batch);

        return mapToResponse(saved);
    }

    @Override
    public List<BatchResponse> getAllBatches() {
        return batchRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BatchResponse getBatchById(Long id) {
        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        return mapToResponse(batch);
    }

    @Override
    public BatchResponse updateBatch(Long id, BatchRequest request) {

        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        batch.setName(request.getName());
        batch.setType(request.getType());
        batch.setTotalStudents(request.getTotalStudents());
        batch.setProgressPercentage(request.getProgressPercentage());
        batch.setStatus(Batch.Status.valueOf(request.getStatus()));
        batch.setStartDate(request.getStartDate());
        batch.setEndDate(request.getEndDate());

        Batch updated = batchRepository.save(batch);

        return mapToResponse(updated);
    }

    @Override
    public void deleteBatch(Long id) {

        Batch batch = batchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        batchRepository.delete(batch);
    }

    private BatchResponse mapToResponse(Batch batch) {
        return BatchResponse.builder()
                .id(batch.getId())
                .name(batch.getName())
                .type(batch.getType())
                .totalStudents(batch.getTotalStudents())
                .progressPercentage(batch.getProgressPercentage())
                .status(batch.getStatus().name())
                .startDate(batch.getStartDate())
                .endDate(batch.getEndDate())
                .build();
    }
}