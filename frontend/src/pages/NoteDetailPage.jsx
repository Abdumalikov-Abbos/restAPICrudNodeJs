import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { api } from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

const NoteDetailPage = () => {
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(() => {
     const fetchNote = async () => {
      try{
         const res = await api.get(`/notes/${id}`)  
         setNote(res.data)
      }catch(err){
        console.log("Error in fetching note", err);
        toast.error("Failed to load note")
      }finally{
       setLoading(false)
      }
     }
     fetchNote()
     
     
  }, [id])
  

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return
    try{
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate(`/`)
    }catch(err){
      console.log("Error in deleting note", err);
      toast.error("Failed to delete note")
    }
  }

  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }
  return <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8 '>
      <div className="max-w-2xl mx-auto">
      <div className='flex items-center justify-between mb-6'>
        <Link to={`/`} className='btn btn-ghost'>
        <ArrowLeftIcon className='h-5 w-5'/>
        Back To Notes
        </Link>
        <button onClick={handleDelete} className='btn btn-error btn-outline'>
        <Trash2Icon className='h-5 w-5'/>
         Delete Note
        </button>
        </div>

        <div className='card bg-base-100'>
          <div className="card-body">
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input type="text"  placeholder='Note title' className='input input-bordered' value={note.title} onChange={(e) => setNote({...note, title: e.target.value})}/>

            </div>
          </div>
        </div>
       </div>
    </div>

  </div>
  
}

export default NoteDetailPage
