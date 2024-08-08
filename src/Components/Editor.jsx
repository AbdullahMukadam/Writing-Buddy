import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TCE from './TCE'
import CommonBtn from './CommonBtn'
import Input from './Input'
import { userServices } from '../FireBase/Services'
import { authservice } from '../FireBase/Auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

function Editor({ document }) {

    const [activeUser, setActiveUser] = useState(null)
    const navigate = useNavigate()

    const { register, handleSubmit, getValues, control } = useForm({
        defaultValues: {
            content: document?.content || "",
            title: document?.title || "",
        }
    })

    useEffect(() => {
        const ActiveUser = authservice.getCurrentUser()
        setActiveUser(ActiveUser)
    }, [])

    const submit = async (data) => {

        if (document) {
            const updatedContent = await userServices.updateDocument(document.id, {
                ...data

            })
            if (updatedContent) {
                toast.success("Updated Succesfully!")
                navigate('/home')
            } else {
                toast.error("Something went Wrong! Please try again")
            }
        } else {
            const createdContent = await userServices.createDocument({
                UserId: activeUser.uid,
                createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }),
                ...data
            })
            if (createdContent) {
                toast.success("Created Succesfully!")
                navigate('/home')
            } else {
                toast.error("Something went Wrong! Please try again")
            }
        }
    }
    return (

        <form onSubmit={handleSubmit(submit)} className='w-full pb-4 pl-2 pr-2 flex items-center flex-col h-full'>

            <div className='p-2 w-full flex items-center justify-between'>
                <Input
                    type="text"
                    className=" border-2 border-black md:w-[80%] "
                    placeholder="Enter your Document Title"
                    {...register("title", {
                        required: true,
                    })}
                />
                <CommonBtn className='text-white w-[20%] md:w-[20%]' type='submit'>Save</CommonBtn>
            </div>
            <TCE
                name="content"
                placeholder='Start Writing here..'
                control={control}
                defaultValue={getValues("content")}
            />
        </form>

    )
}

export default Editor