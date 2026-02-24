import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import attendanceService from "../../api/attendanceService";
import { getBatchById } from "../../api/batchService";
import MainLayout from "../layout/MainLayout";
import "./AttendanceManagementPage.css";

const AttendanceManagementPage = () => {

  const { batchId } = useParams();
  const today = new Date().toISOString().split("T")[0];

  const [batch, setBatch] = useState(null);
  const [date, setDate] = useState(today);
  const [records, setRecords] = useState([]);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ================= Load Batch =================
  useEffect(() => {
    const loadBatch = async () => {
      try {
        const res = await getBatchById(batchId);
        setBatch(res?.data || res);
      } catch {
        setError("Failed to load batch");
      }
    };
    loadBatch();
  }, [batchId]);

  // ================= Load Attendance =================
  useEffect(() => {
    if (batchId && date) loadData();
  }, [batchId, date]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const attendance =
        await attendanceService.getAttendanceByBatchAndDate(batchId, date);

      if (attendance.length > 0) {
        setRecords(attendance);
        setMode("edit");
      } else {
        const students =
          await attendanceService.loadRegister(batchId);

        const formatted = students.map(s => ({
          studentId: s.id,
          studentName: s.name,
          status: "PRESENT",
          remark: "",
          editable: true
        }));

        setRecords(formatted);
        setMode("mark");
      }

    } catch {
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (index, field, value) => {
    const updated = [...records];
    updated[index][field] = value;
    setRecords(updated);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (mode === "mark") {

        const payload = {
          batchId: Number(batchId),
          date,
          attendanceList: records.map(r => ({
            studentId: r.studentId,
            status: r.status,
            remark: r.remark
          }))
        };

        await attendanceService.markBulkAttendance(payload);
        setSuccess("Attendance Marked Successfully");

      } else {

        await Promise.all(
          records
            .filter(r => r.editable)
            .map(r =>
              attendanceService.editAttendance(r.id, r.status, r.remark)
            )
        );

        setSuccess("Attendance Updated Successfully");
      }

      loadData();

    } catch {
      setError("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="attendance-container">

        {/* ===== Top Bar (Single Line Layout) ===== */}
        <div className="attendance-top-bar">

          <div className="left-section">
            <h1>Attendance Management</h1>
            {batch && (
              <span className="batch-name">
                {batch.name}
              </span>
            )}
          </div>

          <div className="right-section">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="date-input"
            />
          </div>

        </div>

        {loading && <p>Loading...</p>}

        {!loading && records.length > 0 && (
          <div className="table-card">

            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Remark</th>
                </tr>
              </thead>

              <tbody>
                {records.map((r, index) => (
                  <tr key={index}>
                    <td>{r.studentName}</td>

                    <td>
                      <div className="status-buttons">

                        <button
                          className={`status-btn present ${
                            r.status === "PRESENT" ? "active" : ""
                          }`}
                          onClick={() =>
                            updateField(index, "status", "PRESENT")
                          }
                          disabled={mode === "edit" && !r.editable}
                        >
                          P
                        </button>

                        <button
                          className={`status-btn absent ${
                            r.status === "ABSENT" ? "active" : ""
                          }`}
                          onClick={() =>
                            updateField(index, "status", "ABSENT")
                          }
                          disabled={mode === "edit" && !r.editable}
                        >
                          A
                        </button>

                        <button
                          className={`status-btn late ${
                            r.status === "LATE" ? "active" : ""
                          }`}
                          onClick={() =>
                            updateField(index, "status", "LATE")
                          }
                          disabled={mode === "edit" && !r.editable}
                        >
                          L
                        </button>

                      </div>
                    </td>

                    <td>
                      <input
                        className="remark-input"
                        type="text"
                        value={r.remark || ""}
                        onChange={(e) =>
                          updateField(index, "remark", e.target.value)
                        }
                        disabled={mode === "edit" && !r.editable}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="submit-btn"
              onClick={handleSubmit}
            >
              {mode === "mark"
                ? "Mark Attendance"
                : "Update Attendance"}
            </button>

          </div>
        )}

        {success && (
          <div className="message-success">
            {success}
          </div>
        )}

        {error && (
          <div className="message-error">
            {error}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default AttendanceManagementPage;