import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
 const navigate = useNavigate();
  const context = useContext(noteContext);
  const ref = useRef(null)
    const [note, setNote] = useState({id: "",etitle: "", edescription: "", etag: ""})
    const { notes, getNotes, editNote  } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes()
        
        }
        else{
           
            navigate('/login')
            props.showAlert("please login for use iNotebook","danger")
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{
        console.log("Updating the note...", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        e.preventDefault(); 
        props.showAlert("Your note has been updated successfully","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
     
  

 

 

  

  return (
    <>
    <div>
      <Addnote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  minLength={5} required aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" data-bs-dismiss="modal" style={{background: "#045a68",color:"white"}} className="btn btn-light">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
      <div className="row my-3">
        <h2>Your notes</h2>
        <div className='container'>
        {notes.length===0 && 'No notes to display'}

        </div>
        {notes.map((n) => {
          return <Noteitem showAlert={props.showAlert} updateNote={updateNote} key={n._id} note={n} />;
        })}
      </div>
      </div>
    </>
  );
}

export default Notes;
