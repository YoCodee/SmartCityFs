import React, {useState} from 'react'
import "./Perbaikan.scss"
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import UploadWidget from '../../Components/uploadWidget/UploadWidget';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Pembuangan() {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    jenis : "",
    Waktu : "",
    Date : ""
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
      const response = await axios.post('http://localhost:3000/api/pembuangan', {
        ...formData,
        userId: user._id,
        images, // Include images in the POST request
      });

      setLoading(false);
      setSuccess("Laporan berhasil ditambahkan!");
      // Reset form
      setFormData({
        jenis: "",
        Waktu: "",
        Date: "",
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
        Pembuangan Sampah
      </h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
        <div className="item">
            <label htmlFor="package">Jenis Sampah</label>
               <select id="package" className='border-2' name="jenis" value={formData.jenis} onChange={handleChange} >
                  <option value="">.....</option>
                  <option value="Organik">Organik</option>
                <option value="Anorganik">Anorganik</option>
                            
                             
                          </select>
                      </div>
        <div className="item">
                          <label htmlFor="package1">Waktu</label>
                          <select id="package1" className='border-2' name="Waktu" value={formData.Waktu} onChange={handleChange} >
                              <option value="">.....</option>
                              <option value="08:00-11:00">08:00-11:00</option>
                              <option value="12:00-15:00">12:00-15:00</option>
                              <option value="16:00-19:00">16:00-19:00</option>
                            
                             
                          </select>
                      </div>
                      <div className="item">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="Date"
                type="date"
                value={formData.Date}
                onChange={handleChange}
              />
            </div>
          <div className="item description">
            <label htmlFor="description">Description</label>
            <ReactQuill theme="snow" id="description" name="description"  />
          </div>
         
          <button className="sendButton" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Add"}
            </button>
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

export default Pembuangan