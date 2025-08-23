import Urls from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authentication {
  client = new Client();
  acount;

  constructor() {
    this.client.setEndpoint(Urls.appwriteurl).setProject(Urls.projectId);
    this.acount = new Account(this.client);
  }

  async creatacount({ email, password, name }) {
    try {
      const useracount = await this.acount.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (useracount) {
        return this.login({ email, password });
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.acount.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getcurrentacount() {
    try {
      return await this.acount.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      await this.acount.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authentication = new Authentication();

export default authentication;
