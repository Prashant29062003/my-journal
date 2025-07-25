import {RTE, Button, Input, Select} from "../index";
import appwriteService from '../../appwrite/config';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";


const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status ||  'active',
        }
    })

    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const userData = useSelector(state => state.auth.userdata); // fixed selector

    const submit = async (data)=> {
        setError(null);
        setLoading(true);
        try {
            if(post){
                let file = null;
                if (data.image && data.image[0]) {
                    file = await appwriteService.uploadFile(data.image[0]);
                    if (file && post.featuredImage) {
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage
                });
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }else{
                if (!userData || !userData.$id) {
                    setError('User not authenticated. Please log in again.');
                    setLoading(false);
                    return;
                }
                if (!data.image || !data.image[0]) {
                    setError('Please select an image to upload.');
                    setLoading(false);
                    return;
                }
                const file = await appwriteService.uploadFile(data.image[0]);
                if (!file) {
                    setError('Image upload failed.');
                    setLoading(false);
                    return;
                }
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                });
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                } else {
                    setError('Failed to create post.');
                }
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            
            // first - way
            // const slug = value.toLowerCase().replace(//g, '-')
            // setValue("slug", slug)
            // return slug

            // second way
            // regex : it's under / <-- in-between --> /
            // eg. /[a-zA-Z]/g ,liekwise
            // ^ --> negation(i.e. not included )
            // [a-zA-z] --> range of a-z & A-Z 
            // \d --> digit
            // \s --> spaces (we can directly remove this \s which directly select the spaces and replace method replace the space with '-')

            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }
        return ''
    },[])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })

        return () => {
            // memory management (basically concept of unmounting (cleanup) behavior)
            // -- This is a cleanup function — React calls it when the component unmounts or before re-running the effect.
            // -- Its purpose here: unsubscribe the form watcher to avoid memory leaks or stale updates.
            subscription.unsubscribe()
        }
    }, [watch,slugTransform,setValue])
  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input 
                label="Title: "
                placeholder="Title"
                className="mb-4"
                {...register("title", {required: true})}
            />
            <Input 
                label="Slug: "
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e)=>{
                    setValue("slug",slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
            />

                <RTE label="Content :"name="content" control={control} defaultValue={getValues("content")} />
        </div>

        <div className="w-1/3 px-2">
                <Input 
                    label="Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img 
                            src={appwriteService.getFilePreview(post.featuredImage)} 
                            alt={post.title} 
                            className="rounded-lg" 
                        />

                    </div>
                )}
                <Select 
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", {required: true})}
                />
                <Button 
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                    disabled={loading}
                    >
                    {loading ? (post ? "Updating..." : "Submitting...") : (post ? "Update" : "Submit")}
                </Button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
