import {
  Table, TableHead, TableRow,
  TableCell, TableBody, Button, Chip
} from "@mui/material";

const SupportTable = ({ supports, onView }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Student Name</TableCell>
          <TableCell>Course</TableCell>
          <TableCell>Topic</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Attachment</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {supports.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.studentName}</TableCell>
            <TableCell>{item.courseName}</TableCell>
            <TableCell>{item.topic}</TableCell>
            <TableCell>{item.description}</TableCell>

            {/* Attachment Preview */}
            <TableCell>
              {item.attachmentUrl ? (
                <a href={item.attachmentUrl} target="_blank">
                  View File
                </a>
              ) : (
                "No File"
              )}
            </TableCell>

            <TableCell>
              <Chip
                label={item.status}
                color={item.status === "PENDING" ? "warning" : "success"}
              />
            </TableCell>

            <TableCell>
              <Button onClick={() => onView(item)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SupportTable;