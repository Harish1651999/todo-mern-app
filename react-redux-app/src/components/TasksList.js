import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import UpdateTask from "./UpdateTask";
import { useDispatch, useSelector } from "react-redux";
import { removeTaskFromList, setSelectedTask } from "./slices/tasksSlice";

const TasksList = () => {
  const [modalShow, setModalShow] = useState(false);
  const { tasksList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const updateTask = (task) => {
    console.log("Update Task");
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };

  const deleteTask = (task) => {
    console.log("Delete Task");
    dispatch(removeTaskFromList(task));
  };

  return (
    <>
      <Table className="text-center" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task, i) => {
              return (
                <tr key={task.id}>
                  <td>{i + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      className="mx-3"
                      variant="primary"
                      onClick={() => updateTask(task)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>{" "}
                    <Button variant="primary" onClick={() => deleteTask(task)}>
                      <i className="bi bi-trash3"></i>
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <UpdateTask show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default TasksList;
