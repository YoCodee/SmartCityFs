import React, {useState} from 'react'
import "./Penangkapan.scss"
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import UploadWidget from '../../Components/uploadWidget/UploadWidget';
import axios from 'axios';
import { useSelector } from 'react-redux';
function Penangkapan() {
  const {user, token} = useSelector((state) => state.auth);
  

  const [formData, setFormData] = useState({
    Jenis : "",
    Inisial:"",
    Description:"",
    Waktu:"",
    Lokasi:""
  })

  const [images, setImages] = useState([]); // State for storing uploaded images
  const [loading, setLoading] = useState(false); // Untuk menandai proses pengiriman data
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post('https://web-city-server.vercel.app/api/penangkapan', {
        ...formData,
        user: user._id,
        images, // Include images in the POST request
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setLoading(false);
      setSuccess("Laporan berhasil ditambahkan!");
      // Reset form
      setFormData({
        Jenis : "",
        Inisial:"",
        Description:"",
        Waktu:"",
        Lokasi:""
      });
      setImages([]); // Reset images state
    } catch (error) {
      setLoading(false);
      setError("Terjadi kesalahan saat menambahkan laporan");
      console.log(error);
    }
  };
  return (
    <div className="newPostPage pl-8">
      <div className="formContainer mt-28">
        <h1 className="text-2xl pt-4 px-4 py-4 bg-cyan-500 max-w-fit text-white rounded-lg">
          Penangkapan Penjahat
        </h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit} >
          <div className="item">
              <label htmlFor="Inisial">Inisial</label>
              <input id="Inisial" name="Inisial" type="text" value={formData.Inisial}  onChange={handleChange}/>
            </div>
          <div className="item">
                            <label htmlFor="Jenis">Jenis</label>
                            <select id="Jenis" className='border-2' name="Jenis" value={formData.Jenis} onChange={handleChange} >
                                <option value="">.....</option>
                                <option value="Pencurian">Pencurian</option>
                                <option value="Pembunuhan">Pembunuhan</option>
                                <option value="Dan Lainnya">Dan Lainnya</option>
                               
                            </select>
                        </div>
            
                        <div className="item">
              <label htmlFor="Lokasi">Lokasi</label>
              <input id="Lokasi" name="Lokasi" type="text" value={formData.Lokasi} onChange={handleChange} />
            </div>
                    
            <div className="item description">
              <label htmlFor="Description">Description</label>
              <ReactQuill theme="snow" id="Description" name="Description"  value={formData.Description}
                onChange={(value) => setFormData({ ...formData, Description: value })} />
            </div>
            <div className="item">
              <label htmlFor="Waktu">Waktu</label>
              <input id="Waktu" name="Waktu" type="text" value={formData.Waktu} onChange={handleChange} />
            </div>
            <button className="sendButton">Add</button>
          </form>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
      </div>
      <div className="sideContainer">
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages} // Set images state with the uploaded image URLs
        />
        {images.map((image, index) => (
          <div className="wrapperimage" key={index}>
            <img src={image} alt={`Uploaded ${index}`} />
            <button onClick={() => setImages(images.filter((_, i) => i !== index))}>Delete</button>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Penangkapan