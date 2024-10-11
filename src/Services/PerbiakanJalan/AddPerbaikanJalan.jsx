import React, { useState } from 'react';
import "./PerbaikanJalan.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from 'axios';
import UploadWidget from '../../Components/uploadWidget/UploadWidget';
import { useSelector } from 'react-redux';

function AddPerbaikanJalan() {
  const user = useSelector((state) => state.auth.user);
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    kerusakan: "",
    lokasi: "",
    date: "",
    description: "",
  });
  
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
      const response = await axios.post('https://web-city-server.vercel.app/api/perbaikan', {
        ...formData,
        userId: user._id,
        images, // Include images in the POST request
      });

      setLoading(false);
      setSuccess("Laporan berhasil ditambahkan!");
      // Reset form
      setFormData({
        kerusakan: "",
        lokasi: "",
        date: "",
        description: "",
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
          Perbaikan Jalan
        </h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="kerusakan">Tingkat Kerusakan</label>
              <select
                id="kerusakan"
                className='border-2'
                name="kerusakan"
                value={formData.kerusakan}
                onChange={handleChange}
              >
                <option value="">.....</option>
                <option value="Berat">Berat</option>
                <option value="Sedang">Sedang</option>
                <option value="Ringan">Ringan</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="lokasi">Location</label>
              <input
                id="lokasi"
                name="lokasi"
                type="text"
                value={formData.lokasi}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="item description">
              <label htmlFor="description">Description</label>
              <ReactQuill
                theme="snow"
                id="description"
                name="description"
                value={formData.description}
                onChange={(value) => setFormData({ ...formData, description: value })}
              />
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
  );
}

export default AddPerbaikanJalan;
