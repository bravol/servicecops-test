import axios, { AxiosResponse } from "axios";
import { Environment } from "../env";
import { Todo } from "./models";

export class ApiService {
  //TODOS
  static async getTodos(token: string) {
    const response: AxiosResponse = await axios.get(
      `${Environment.API_URL}/todos/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("the response in getting todos", response);

    return response.data;
  }

  static async updateTodo(id: number, params: Todo) {
    const response: AxiosResponse = await axios.put(
      `${Environment.API_URL}/todos/${id}`,
      params,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log("the response in updating", response);
    return response.data;
  }

  static async createTodo(params: Todo) {
    const response: AxiosResponse = await axios.post(
      `${Environment.API_URL}/todos/`,
      params,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return response.data;
  }

  static async deleteTodo(id: number) {
    const response: AxiosResponse = await axios.delete(
      `${Environment.API_URL}/todos/${id}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log("the response in delting the user", response);
    return response.data;
  }
}
