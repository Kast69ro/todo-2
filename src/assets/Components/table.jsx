import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const initialRows = [
  { id: 1, firstName: "Snow", age: 35 },
  { id: 2, firstName: "Lannister", age: 42 },
  { id: 3, firstName: "Lannister", age: 45 },
  { id: 4, firstName: "Stark", age: 16 },
  { id: 5, firstName: "Targaryen", age: 22 },
  { id: 6, firstName: "Melisandre", age: 150 },
  { id: 7, firstName: "Clifford", age: 44 },
  { id: 8, firstName: "Frances", age: 36 },
  { id: 9, firstName: "Roxie", age: 65 },
  { id: 10, firstName: "bot", age: 65 },
];

export default function DataTable() {
  const [rows, setRows] = useState(
    initialRows.map((row) => ({
      ...row,
    }))
  );
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = useState({ firstName: '', age: '' });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openEdit, setOpenEdit] = React.useState(false);
   const [searchTerm, setSearchTerm] = useState(""); // 


  

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((e) => e.id !== id));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newRow = {
      id: rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1,
      firstName: data.firstName,
      age: Number(data.age),
    };

    setRows((prev) => [...prev, newRow]);
    handleClose();
  };

  function handleEditClick(obj) {
  setEditData({ firstName: obj.firstName, age: obj.age, id: obj.id });
  setOpenEdit(true);
}

  const handleFormSubmitEdit = (event) => {
  event.preventDefault();

  setRows((prev) =>
    prev.map((row) =>
      row.id === editData.id
        ? { ...row, firstName: editData.firstName, age: Number(editData.age) }
        : row
    )
  );

  setOpenEdit(false);
};
const filteredRows = rows.filter((row) =>
  row.firstName.toLowerCase().includes(searchTerm.toLowerCase())
);


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    {
      field: "actions",
      headerName : "Действия",
      width: 200,
      headerAlign:'center',
      sortable  : false,
      filterable: false,
      renderCell: (params) => (
        <div style={{display:'flex',gap:'20px'}}>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row.id)}
        >
          Удалить
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => handleEditClick(params.row)}
        >
          Изменить
        </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <TextField
        label="Поиск по имени"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
      />

   
        <Button variant="outlined" onClick={handleClickOpen}>
          Add User
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleFormSubmit}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                name="firstName"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                name="age"
                label="Age"
                type="number"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add New User </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <form onSubmit={handleFormSubmitEdit}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                name="firstName"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={editData.firstName}
                onChange={(e)=>setEditData({...editData,firstName:e.target.value})}
              />
              <TextField
                required
                margin="dense"
                name="age"
                label="Age"
                type="number"
                fullWidth
                variant="standard"
                  value={editData.age}
                onChange={(e)=>setEditData({...editData,age:e.target.value})}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button type="submit">Edit User</Button>
            </DialogActions>
          </form>
        </Dialog>
      <Paper sx={{ height: 500, width: "50%" ,margin:'auto' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
         
        />
      </Paper>
    </div>
  );
}
