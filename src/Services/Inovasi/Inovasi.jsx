import React, {useState} from 'react'
import "./Inovasi.scss"
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from 'axios';
import { useSelector } from 'react-redux';
import UploadWidget from '../../Components/uploadWidget/UploadWidget';
function Inovasi() {
  const {user, token} = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    JenisInovasi : "",
    Uang: "",
    LamaWaktu : "",
    Description : "",
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
      const response = await axios.post('https://web-city-server.vercel.app/api/inovasi', {
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
        JenisInovasi : "",
        Uang: "",
        LamaWaktu : "",
        Description : "",

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
        Inovasi
      </h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="JenisInovasi">Jenis Inovasi</label>
            <select  className='border-2' id="JenisInovasi" name="JenisInovasi" type="text"  value={formData.JenisInovasi} onChange={handleChange} >
                  <option value="">.....</option>
                  <option value="Teknologi">Teknologi</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Lainnya">Lainnya</option>
                </select>
          </div>
          <div className="item">
            <label htmlFor="Uang">Uang dibutuhkan</label>
            <input id="Uang" name="Uang" type="number" value={formData.Uang} onChange={handleChange}  />
          </div>
          <div className="item">
            <label htmlFor="LamaWaktu">Lama Waktu</label>
            <input id="LamaWaktu" name="LamaWaktu" type="text" value={formData.LamaWaktu} onChange={handleChange}  />
          </div>
          <div className="item description">
            <label htmlFor="Description">Description</label>
            <ReactQuill theme="snow" id="Description" name="Description"    onChange={(value) => setFormData({ ...formData, Description: value })} />
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

export default Inovasi