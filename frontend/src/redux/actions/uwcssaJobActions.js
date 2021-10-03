import API from "@aws-amplify/api";
import { ActionTypes } from "../constants/uwcssaJob-action-types";
import { listUwcssaJobs } from "../../graphql/queries";

const departments = `query ListDepartments {
  listDepartments {
    items {
      createdAt
      email
      introduction
      leader
      like
      name
      owner
      unlike
      updatedAt
      uwcssaJobs {
        items {
          Benefits
          Bonus
          Schedule
          createdAt
          id
          imagePath
          introduction
          like
          owner
          requirements
          title
          unlike
          updatedAt
        }
      }
    }
  }
}`;

export const setUwcssaJobs = () => async (dispatch) => {
  try {
    const uwcssaJobData = await API.graphql({
      query: listUwcssaJobs,
      authMode: "AWS_IAM",
    });
    console.log("uwcssaJobData", uwcssaJobData);
    dispatch({
      type: ActionTypes.SET_UWCSSAJOBS,
      payload: uwcssaJobData.data.listUwcssaJobs.items,
    });
  } catch (error) {
    console.log("error on fetching UwcssaJobs", error);
  }
};

export const setDepartments = () => async (dispatch) => {
  try {
    const departmentData = await API.graphql({
      query: departments,
      authMode: "AWS_IAM",
    });
    dispatch({
      type: ActionTypes.SET_DEPARTMENTS,
      payload: departmentData.data.listDepartments.items,
    });
    console.log("departmentData", departmentData);
  } catch (error) {
    console.log("error on fetching Departments", error);
  }
};