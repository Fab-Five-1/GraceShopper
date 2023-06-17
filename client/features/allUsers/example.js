import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllStudents,
  selectAllStudents,
} from "../slices/allStudentsSlice";
import { Link } from "react-router-dom";
import AddStudent from "./AddStudent";
import "./css/AllStudents.css";
import {deleteStudent} from "../slices/allStudentsSlice"; // must have {} to destructure from file allStudentsSlice
// don't forget to import 'deleteStudent.js' from slice section

export default function AllStudents() {
  const dispatch = useDispatch(); // calls every function in my redux // need this to call 'fetchAllStudents' from slice

  const allStudents = useSelector(selectAllStudents);
  console.log("1 -----> req from server");

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, []);

  // don't forget to define 'deleteStudent' in slice
  // this handle delete is needed here
  const handleDelete = async (id) => {
    await dispatch(deleteStudent(id));
  };

  console.log("4 ----->", allStudents);
  return (
    <div id="students">
      <div id="student-list">
        List of all Students
        {allStudents.map((student) => {
          return (
            <div key={student.id}>
              {" "}
              <Link to={`/students/${student.id}`}>
                <h1>{student.firstName}</h1>
              </Link>
              <img src={student.imageUrl} />
              <button onClick={() => handleDelete(student.id)}> Delete </button>
              {/* where Delete button will go */}
            </div>
          );
        })}
      </div>
      <div>
        <AddStudent />
      </div>
    </div>
  );
}
