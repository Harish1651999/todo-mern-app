import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:8000/tasks";

//GET
export const getTaksFromServer = createAsyncThunk(
  "tasks/getTaksFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "No Tasks Found" });
    }
  }
);

//POST
export const addTasksToServer = createAsyncThunk(
  "tasks/addTaksToerver",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Tasks Not Added" });
    }
  }
);

//PATCH
export const updateTaskInServer = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Tasks Not Updated" });
    }
  }
);

//DELETE
export const deleteTaskFromServer = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return rejectWithValue({ error: "Tasks Not Deleted" });
    }
  }
);

const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    removeTaskFromList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaksFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaksFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = action.payload;
      })
      .addCase(getTaksFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.tasksList = [];
      })
      .addCase(addTasksToServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTasksToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      .addCase(addTasksToServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(updateTaskInServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTaskInServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTaskInServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(deleteTaskFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteTaskFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const {
  addTasktoList,
  removeTaskFromList,
  updateTaskInList,
  setSelectedTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
