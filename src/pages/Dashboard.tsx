import Dashboardnav from '../components/Dashboardnav'
import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { API_URL } from '../data';
type Note = {
  _id: string;
  noteName: string;
  userId: string;
};
const Dashboard = () => {
    const [createNote,setCreateNote]=useState(false);
    const [userNotes, setUserNotes] = useState<Note[]>([]);
    const [updateNote,setUpdateNote]=useState('');
    const [theNoteCreate,setTheNoteCreate]=useState('');
    const [updateButton,setUpdateButton]=useState(false);
    const [editNoteId,seteditNoteId]=useState('');
    const userId = localStorage.getItem("userId");
useEffect(() => {
  const fetchNotes = async () => {
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/note/userNotes/${userId}`);
      if (response.ok) {
        const data = await response.json(); 
        setUserNotes(data.notes);
        console.log(data);
      } else {
        console.error('Error in fetching data');
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };

  fetchNotes();
}, [userId])

 const handleCreateNote = async () => {
    if (!theNoteCreate.trim()) {
      alert('write something in note');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/note/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          noteName:theNoteCreate,
          userId:userId}),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Note created successfully');
        setTheNoteCreate('');
        alert(data.message || 'Failed to create note');
      }
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }
  };
  const editNote=(noteId: string,noteName:string)=>{
    setCreateNote(true);
    setUpdateButton(true)
    setTheNoteCreate(noteName)
    seteditNoteId(noteId)
  }
  const UpdateNote = async () => {
    const res = await fetch(`${API_URL}/note/update/${editNoteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noteName: theNoteCreate}),
    });

    if (res.ok) {
       alert('Note updated successfully,refresh page you can seen updated note');
      setCreateNote(false)
      setTheNoteCreate('')
      setUpdateButton(false)
      seteditNoteId('')
    } else {
      alert('Failed to update note');
    }
  };


const deleteNote = async (noteId: string) => {
    const res = await fetch(`${API_URL}/note/delete/${noteId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Note deleted successfully');
      setUserNotes((prev) => prev.filter((note) => note._id !== noteId));
    } else {
      alert('Failed to delete note');
    }
  };


  return (
    <div className='bg-gray-100 min-h-screen px-[14px] md:px-[32px]'>
        <Dashboardnav/>
        <div className=''>
            <div className='space-y-[12px] shadow-lg bg-white rounded-[10px] px-[16px] py-[16px] mt-8'>
                <h1 className='text-[22px] font-bold'>Welcome,<span>Jonas Kahnwald</span></h1>
                <p className=''>Email:<span>jonas_kahnwald@gmail.com</span></p>
            </div>
            {!createNote?(<button className=" mt-2 max-h-[54px] py-2 px-2 text-white bg-[#367AFF] rounded-[10px]" onClick={()=>setCreateNote(true)}>
             Create Note
            </button>):
             (<button className=" mt-2 max-h-[54px] py-2 px-2 text-white bg-[#367AFF] rounded-[10px]" onClick={()=>{setCreateNote(false),setTheNoteCreate('')}}>
             Cancel
            </button>)}
          {createNote && <div className='mt-6 shadow-lg bg-white rounded-[10px] px-[16px] py-[16px]'>
           <textarea placeholder='write your note here' className='p-4  border border-gray-400 w-full h-[100px] rounded-[10px]' value={theNoteCreate} onChange={(e)=>setTheNoteCreate(e.target.value)}></textarea>
           <button className=" mt-2 max-h-[54px] py-2 px-2 text-white bg-[#367AFF] rounded-[10px]" onClick={handleCreateNote}>Add note</button>
          {updateButton && <button className="mx-2 mt-2 max-h-[54px] py-2 px-2 text-white bg-[#367AFF] rounded-[10px]" onClick={UpdateNote}>Update note</button>}
        </div>}
        <h2 className='mt-4 text-center text-[24px] font-bold'>Notes list</h2>
        <div className='mt-4 space-y-2'>
          {userNotes.length===0 &&<p>No notes are created</p>}
          {
            userNotes.map((item,id)=>(
              <div key={item._id} className='flex items-center justify-between bg-white shadow-lg rounded-[10px] p-4'>
                <p className='text-black'>{item.noteName}</p>
                <div className='flex items-center gap-[10px] text-[24px]'>
                  <FiEdit onClick={()=>editNote(item._id,item.noteName)}/>
                  <MdOutlineDeleteOutline onClick={()=>deleteNote(item._id)}/>
                </div>

              </div>
            ))
          }
        </div>
        </div>
    </div>
  )
}

export default Dashboard