package com.navkalpana.services;

import com.navkalpana.dto.request.BackupScheduleRequest;
import com.navkalpana.dto.request.ReplyRequest;
import com.navkalpana.dto.request.SupportCreateRequest;
import com.navkalpana.dto.respose.SupportRequestResponse;

import java.util.List;

public interface SupportRequestService {

    List<SupportRequestResponse> createMultiple(List<SupportCreateRequest> requests);

    List<SupportRequestResponse> getAll(Long courseId, String status);

    SupportRequestResponse reply(Long id, ReplyRequest request);

    SupportRequestResponse markResolved(Long id);

    SupportRequestResponse scheduleBackup(Long id, BackupScheduleRequest request);

    void delete(Long id);
}