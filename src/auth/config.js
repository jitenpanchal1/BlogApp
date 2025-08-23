import Urls from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(Urls.appwriteurl).setProject(Urls.projectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async CreatPost({ slug, title, content, featuredImg, status, userId, name }) {
    try {
      return await this.database.createDocument(
        Urls.databaseId,
        Urls.collectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userId,
          name,
        }
      );
    } catch (error) {
      console.log("create post error", error.message);
    }
  }

  async UpdatePost(slug, { title, content, featuredImg, status, name }) {
    try {
      return await this.database.updateDocument(
        Urls.databaseId,
        Urls.collectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          name,
        }
      );
    } catch (error) {
      console.log("post upsate failed");
    }
  }

  async DeletPost(slug) {
    try {
      await this.database.deleteDocument(
        Urls.databaseId,
        Urls.collectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("failed to delet post");
      return false;
    }
  }

  async Getpost(slug) {
    try {
      return await this.database.getDocument(
        Urls.databaseId,
        Urls.collectionId,
        slug
      );
    } catch (error) {
      console.log("failsed to get data");
    }
  }
  // quries = [Query.equal("status", "active")]
  async getposts() {
    try {
      return await this.database.listDocuments(
        Urls.databaseId,
        Urls.collectionId
        // quries
      );
    } catch (error) {
      console.log("failed to get postssssssssssss");
    }
  }

  async getuserpost(userId) {
    try {
      return await this.database.listDocuments(
        Urls.databaseId,
        Urls.collectionId,
        [
          // quries
          Query.equal("userId", userId),
        ]
      );
    } catch (error) {
      console.log("failed to get postssssssssssss");
    }
  }

  // upload file

  async UploadFile(file) {
    try {
      return await this.bucket.createFile(Urls.bucketId, ID.unique(), file);
    } catch (error) {
      console.log("failed to creat file");
    }
  }

  async deletFile(fileId) {
    try {
      this.bucket.deleteFile(Urls.bucketId, fileId);
      return true;
    } catch (error) {
      console.log("failed to delet file");
      return false;
    }
  }

  getfilepreview(fileId) {
    try {
      return this.bucket.getFileDownload(Urls.bucketId, fileId).href;
    } catch (error) {
      console.log("getfilepreview not found", error);
    }
  }
}

const services = new Services();

export default services;
