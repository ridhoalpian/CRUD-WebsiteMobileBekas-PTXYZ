import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TambahProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    merekProduk: "",
    jenisProduk: "",
    jumlahStok: "",
    harga: "",
    keterangan: "",
  });

  const [displayHarga, setDisplayHarga] = useState("");

  const formatRupiah = (angka) => {
    if (!angka) return "";
    return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "harga") {
      const angka = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: angka });
      setDisplayHarga(formatRupiah(angka));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/produk`, formData);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Tambah Produk</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Merek Produk</label>
          <input
            type="text"
            name="merekProduk"
            className="form-control"
            placeholder="contoh: Toyota, Mitsubishi, Honda"
            value={formData.merekProduk}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jenis Produk</label>
          <input
            type="text"
            name="jenisProduk"
            className="form-control"
            placeholder="contoh: SUV, MPV, Sedan, Pickup"
            value={formData.jenisProduk}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jumlah Stok</label>
          <input
            type="number"
            name="jumlahStok"
            className="form-control"
            placeholder="contoh: 5, 10, 20"
            value={formData.jumlahStok}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Harga</label>
          <input
            type="text"
            name="harga"
            className="form-control"
            placeholder="contoh: 150000000"
            value={displayHarga}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Keterangan</label>
          <textarea
            name="keterangan"
            className="form-control"
            placeholder="contoh: Warna hitam, tahun 2022, kondisi sangat baik"
            rows={3}
            value={formData.keterangan}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Simpan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default TambahProduct;
