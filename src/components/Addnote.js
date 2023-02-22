import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';

function Addnote(props) {
  
    const context = useContext(noteContext);
    const {addNote} = context;
    
    
    

  
    const[note, setNote]= useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({title:"",description:"",tag:""})
     props.showAlert("note has been added ","success")
      
  }




    const handleOnChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  




  return (
    <>
  



    <div className='container '>
      <h2 className='my-3'>Add a note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" onChange={handleOnChange} className="form-control" minLength={5} required id="title" name="title" value={note.title}  aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" onChange={handleOnChange} className="form-control" minLength={5} required name="description" value={note.description}  id="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" onChange={handleOnChange} className="form-control"  value={note.tag} name="tag" id="tag"/>
  </div>
   
  <button type="submit"  disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} style={{background: "#045a68",color:"white"}}  className="btn btn-light">Add note</button>
</form>
</div>
</>
  )
}

export default Addnote