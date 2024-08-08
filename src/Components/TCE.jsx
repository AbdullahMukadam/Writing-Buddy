import React, {memo} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from "react-hook-form"

function TCE({control,label,name,defaultValue="",placeholder=""}) {
  return (
    <div className='w-full h-full'> 
    {label && <label className='inline-block mb-1 pl-1 text-center text-black font-bold'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        initialValue={defaultValue}
        apiKey={import.meta.env.VITE_FIREBASE_TINYMCE_API_KEY}
        init={{
            initialValue: defaultValue,
            height: "80vh",
            menubar: true,
            placeholder: placeholder,
            plugins: [
                
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}

export default memo(TCE)