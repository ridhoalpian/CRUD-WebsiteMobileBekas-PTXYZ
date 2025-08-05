import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produk, setProduk] = useState({
    merekProduk: "",
    jenisProduk: "",
    jumlahStok: 0,
    harga: 0,
    keterangan: "",
  });

  const [displayHarga, setDisplayHarga] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/produk`).then((res) => {
      const found = res.data.find((p) => p.id === parseInt(id));
      if (found) {
        setProduk(found);
        setDisplayHarga(formatRupiah(found.harga));
      }
    });
  }, [id]);

  const formatRupiah = (angka) => {
    if (!angka) return "";
    return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "harga") {
      const angka = value.replace(/\D/g, "");
      setProduk({ ...produk, harga: angka });
      setDisplayHarga(formatRupiah(angka));
    } else {
      setProduk({ ...produk, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/produk/${id}`,
        produk
      );
      navigate("/");
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Edit Produk</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 shadow-sm rounded bg-light"
      >
        <div className="mb-3">
          <label className="form-label">Merek Produk</label>
          <input
            name="merekProduk"
            className="form-control"
            value={produk.merekProduk}
            onChange={handleChange}
            placeholder="contoh: Toyota, Mitsubishi, Honda"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jenis Produk</label>
          <input
            name="jenisProduk"
            className="form-control"
            value={produk.jenisProduk}
            onChange={handleChange}
            placeholder="contoh: SUV, MPV, Sedan, Pickup"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Jumlah Stok</label>
          <input
            name="jumlahStok"
            type="number"
            className="form-control"
            value={produk.jumlahStok}
            onChange={handleChange}
            placeholder="contoh: 5, 10, 20"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Harga</label>
          <input
            type="text"
            name="harga"
            className="form-control"
            value={displayHarga}
            onChange={handleChange}
            placeholder="contoh: 150000000"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Keterangan</label>
          <textarea
            name="keterangan"
            className="form-control"
            value={produk.keterangan}
            onChange={handleChange}
            placeholder="contoh: Warna hitam, tahun 2022, kondisi sangat baik"
            rows={3}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Simpan Perubahan
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

export default EditProduct;
