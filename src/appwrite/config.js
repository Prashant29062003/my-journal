import conf from "../conf/conf.js";
import {Client, Databases, Storage, ID, Query} from 'appwrite';

class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Error :: creating-post: ", error);
            
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Error :: updating-post: ", error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Error :: deleting-post: ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error :: fething-post: ", error);
            
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]){
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Posts fething Error :: fething-posts: ", error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error :: uploading-file: ", error);
            return false
        }
    }

    async downloadFile(fileId){
        try {
            await this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Error :: download-file: ", error);
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Error :: download-file: ", error);
            
        }
    }

    // it is very fast so it's no use to use async-await
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;