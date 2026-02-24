package com.navkalpana.controller;

import com.navkalpana.dto.request.BackupScheduleRequest;
import com.navkalpana.dto.request.ReplyRequest;
import com.navkalpana.dto.request.SupportCreateRequest;
import com.navkalpana.dto.respose.SupportRequestResponse;
import com.navkalpana.services.SupportRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // adjust if needed
public class SupportRequestController {

    private final SupportRequestService supportRequestService;

    @PostMapping("/bulk")
    public ResponseEntity<List<SupportRequestResponse>> createMultiple(
            @RequestBody List<SupportCreateRequest> requests
    ) {
        return ResponseEntity.ok(
                supportRequestService.createMultiple(requests)
        );
    }

    @GetMapping
    public ResponseEntity<List<SupportRequestResponse>> getAllSupports(
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) String status
    ) {
        List<SupportRequestResponse> supports =
                supportRequestService.getAll(courseId, status);

        return ResponseEntity.ok(supports);
    }


    @PostMapping("/{id}/reply")
    public ResponseEntity<SupportRequestResponse> replyToSupport(
            @PathVariable Long id,
            @RequestBody ReplyRequest request
    ) {
        SupportRequestResponse response =
                supportRequestService.reply(id, request);

        return ResponseEntity.ok(response);
    }


    @PutMapping("/{id}/resolve")
    public ResponseEntity<SupportRequestResponse> markResolved(
            @PathVariable Long id
    ) {
        SupportRequestResponse response =
                supportRequestService.markResolved(id);

        return ResponseEntity.ok(response);
    }


    @PostMapping("/{id}/schedule-backup")
    public ResponseEntity<SupportRequestResponse> scheduleBackup(
            @PathVariable Long id,
            @RequestBody BackupScheduleRequest request
    ) {
        SupportRequestResponse response =
                supportRequestService.scheduleBackup(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSupport(@PathVariable Long id) {
        supportRequestService.delete(id);
        return ResponseEntity.ok("Support deleted successfully");
    }
}
