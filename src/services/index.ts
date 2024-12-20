import constants from "../constants";
import axios from "axios";

const { BASE_URL } = constants;

// Apply singleton
class Service {
  private static instance: Service | null = null;
  private token: string | undefined;

  constructor() {
    // load token from local storage
    if (!Service.instance) {
      this.token = localStorage.getItem("token") || "";
      Service.instance = this;
    }

    return Service.instance;
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  getToken(): string | undefined {
    return this.token;
  }

  async post(
    path: string,
    data: any,
    externalToken?: string | null,
    isAuthorization?: boolean
  ) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (isAuthorization) {
        if (!this.token) throw new Error("Token is required");
        headers.Authorization = `Bearer ${this.token}`;
      }

      if (externalToken) {
        headers.Authorization = `Bearer ${externalToken}`;
      }

      const res = await axios.post(`${BASE_URL}/${path}`, data, {
        headers,
      });

      return res.data;
    } catch (error) {
      console.error(`Error post ${BASE_URL}/${path}: ${error}`);
      throw error;
    }
  }

  async get(path: string, isAuthorization: boolean, queries?: any) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (isAuthorization) {
        if (!this.token) throw new Error("Token is required");
        headers.Authorization = `Bearer ${this.token}`;
      }

      const res = await axios.get(`${BASE_URL}/${path}`, {
        headers,
        params: queries || [],
      });

      return res.data;
    } catch (error) {
      console.error(`Error get ${BASE_URL}/${path}: ${error}`);
      throw error;
    }
  }

  async delete(path: string, data: any, isAuthorization?: boolean | undefined) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (isAuthorization) {
        if (!this.token) throw new Error("Token is required");
        headers.Authorization = `Bearer ${this.token}`;
      }

      const res = await axios.delete(`${BASE_URL}/${path}`, {
        headers,
        data,
      });

      return res.data;
    } catch (error) {
      console.error(`Error delete ${BASE_URL}/${path}: ${error}`);
      throw error;
    }
  }

  async put(path: string, data: any, isAuthorization: boolean | undefined) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (isAuthorization) {
        if (!this.token) throw new Error("Token is required");
        headers.Authorization = `Bearer ${this.token}`;
      }

      const res = await axios.put(`${BASE_URL}/${path}`, data, {
        headers,
      });

      return res.data;
    } catch (error) {
      console.error(`Error put ${BASE_URL}/${path}: ${error}`);
      throw error;
    }
  }
}

export default new Service();
