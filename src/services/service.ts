/* eslint-disable @typescript-eslint/no-explicit-any */
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
    externalToken?: string,
    isAuthorization?: boolean
  ) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (isAuthorization) {
        if (!this.token) return new Error("Token is required");
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
      console.error(`Error in API request to ${BASE_URL}/${path}`);
      throw error;
    }
  }
}

export default new Service();
