
import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';


function Noteitems(props) {
   const context = useContext(noteContext);
   const {deleteNote} = context;
    const {note,updateNote} = props;
    const handleOnDelete=()=>{
      deleteNote(note._id)
      props.showAlert("your note has been deleted successfully","success")
    }
 
  return (
    
    <>
    <div className="col-md-3"> 
    <div className="card my-3"> 
        <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
       
        <p className="card-text">{note.description}</p> 
        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}  ></i>
        <i className="fa-regular fa-trash-can mx-2" onClick={handleOnDelete} ></i>
        </div>
    </div>
</div>
</>
  )
}

export default Noteitems
