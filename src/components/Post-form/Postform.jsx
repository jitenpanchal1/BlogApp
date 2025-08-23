import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { BasicButton, Input, RTe, Select } from '../Index';
import services from '../../auth/config';
import { ID } from 'appwrite';
import authentication from '../../auth/auth';
import './Postform.css';

function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            status: post?.status || "active",
            content: post?.content || "",
            name: post?.name || "not a name"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [name, setname] = useState(null)
    const [msg, setmsg] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            if (userData) {
                try {
                    const user = await authentication.getcurrentacount()
                    setname(user.name)
                } catch (error) {

                }
            }
        }
        fetch()
    }, [userData]);

    const submit = async (data) => {
        let file = null;
        if (data.image && data.image.length > 0) {
            file = await services.UploadFile(data.image[0]);
        }

        if (post) {
            if (file) {
                services.deletFile(post.images);
            }

            const dbPost = await services.UpdatePost(post.$id, {
                ...data,
                featuredImg: file ? file.$id : undefined,
                name: name
            });

            if (dbPost) {
                setmsg("Post updated  succesfully")
                // navigate(`/post/${post.$id}`);
            }
        } else {
            if (!file || !userData?.$id) {
                console.log("Image or user ID missing");
                return;
            }

            const complete = await services.CreatPost({
                ...data,
                featuredImg: file.$id,
                userId: userData.$id,
                name: name
            });

            if (complete) {
                setmsg("Post creater succesfully")
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit(submit)} className="p-4 border rounded shadow-sm bg-white">
                <div className="row g-3">
                    <div className='text-center'>
                        <Input
                            className="text-center"
                            value={`post by ${name}` || "loading..."}
                            readOnly />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label="Title:"
                            placeholder="Enter post title"
                            className="form-control"
                            {...register("title", { required: true })}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label="Slug:"
                            placeholder="Enter post slug"
                            className="form-control"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), {
                                    shouldValidate: true
                                });
                            }}
                        />
                    </div>
                    <div className="col-12">
                        <RTe
                            label="Content:"
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            label="Featured Image:"
                            type="file"
                            className="form-control"
                            accept="image/png,image/jpg,image/jpeg,image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>
                    {post?.featuredImg && (
                        <div className="col-md-6 text-center">
                            <label className="form-label">Current Image:</label>
                            <img
                                src={services.getfilepreview(post.featuredImg)}
                                alt={post.title}
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: "200px" }}
                            />
                        </div>
                    )}
                    <div className="col-md-6">
                        <Select
                            label="Status:"
                            option={["active", "inactive"]}
                            className="form-select"
                            {...register("status", { required: true })}
                        />
                    </div>
                    <div className="col-12 d-flex justify-content-end mt-4">
                        <BasicButton type="submit" className="btn btn-primary px-4">
                            {post ? "Update" : "Submit"}
                        </BasicButton>
                    </div>
                    {msg ? <h3> {name} {msg}</h3> : null}
                </div>
            </form>
        </div>
    );
}

export default Postform;
