import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ProductList() {
  const [produk, setProduk] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/produk`
      );
      setProduk(res.data);
    } catch (err) {
      alert("Gagal mengambil data");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/produk/${id}`);
        fetchData();
        Swal.fire("Berhasil", "Produk berhasil dihapus.", "success");
      } catch (err) {
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus", "error");
      }
    }
  };

  const filtered = produk.filter((p) =>
    p.merekProduk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Daftar Mobil Bekas</h2>
        <Link to="/tambah">
          <button className="btn btn-primary">Tambah Produk</button>
        </Link>
      </div>

      <input
        className="form-control mb-3"
        type="text"
        placeholder="Cari berdasarkan merek..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Merek</th>
              <th>Jenis</th>
              <th>Stok</th>
              <th>Harga</th>
              <th>Keterangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.merekProduk}</td>
                <td>{p.jenisProduk}</td>
                <td>{p.jumlahStok}</td>
                <td>
                  {p.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td>{p.keterangan}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Hapus
                    </button>
                    <Link to={`/edit/${p.id}`}>
                      <button className="btn btn-warning btn-sm">Edit</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
