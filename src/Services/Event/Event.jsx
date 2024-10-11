import React, {useState} from 'react'
import "./Event.scss"
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import UploadWidget from '../../Components/uploadWidget/UploadWidget';
import axios from 'axios';
import { useSelector } from 'react-redux';



function Event() {
  const {user, token} = useSelector((state) => state.auth);

  const [formData,setFormData] = useState({
    namaOrganisasi : "",
    time : "",
    title : "",
    description : "",
    VisiMisi : "",
    location : "",
    date : "",
  })
  const [images, setImages] = useState([]); // State for storing uploaded images
  const [loading, setLoading] = useState(false); // Untuk menandai proses pengiriman data
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fungsi untuk meng-handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post('https://web-city-server.vercel.app/api/event', {
        ...formData,
        user: user._id,
        images, // Include images in the POST request
      }
    ,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

      setLoading(false);
      setSuccess("Laporan berhasil ditambahkan!");
      // Reset form
      setFormData({
        namaOrganisasi : "",
        time : "",
        title : "",
        description : "",
        VisiMisi : "",
        location : "",
        date : "",
      });
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
        Event
      </h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
       
          <div className="item">
            <label htmlFor="namaOrganisasi">nama Organisasi</label>
            <input id="namaOrganisasi" name="namaOrganisasi" type="text" value={formData.namaOrganisasi} onChange={handleChange} />
          </div>
          <div className="item">
            <label htmlFor="time">Waktu</label>
            <input id="time" name="time" type="text" value={formData.time} onChange={handleChange} />
          </div>
          <div className="item">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} />
          </div>
          <div className="item description">
            <label htmlFor="description">Description</label>
            <ReactQuill theme="snow" id="description" name="description" value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })}  />
          </div>
          <div className="item">
            <label htmlFor="VisiMisi">visi dan misi</label>
            <input id="VisiMisi" name="VisiMisi" type="text" value={formData.VisiMisi} onChange={handleChange} />
          </div>
          <div className="item">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" type="text" value={formData.location} onChange={handleChange} />
          </div>
          <div className="item">
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />
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

export default Event