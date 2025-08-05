package com.mobkas.mobkas_backend.model;

import jakarta.persistence.*;

@Entity
public class Produk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String merekProduk;
    private String jenisProduk;
    private int jumlahStok;
    private double harga;
    private String keterangan;

    public Produk() {
    }

    public Produk(String merekProduk, String jenisProduk, int jumlahStok, double harga, String keterangan) {
        this.merekProduk = merekProduk;
        this.jenisProduk = jenisProduk;
        this.jumlahStok = jumlahStok;
        this.harga = harga;
        this.keterangan = keterangan;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMerekProduk() { return merekProduk; }
    public void setMerekProduk(String merekProduk) { this.merekProduk = merekProduk; }

    public String getJenisProduk() { return jenisProduk; }
    public void setJenisProduk(String jenisProduk) { this.jenisProduk = jenisProduk; }

    public int getJumlahStok() { return jumlahStok; }
    public void setJumlahStok(int jumlahStok) { this.jumlahStok = jumlahStok; }

    public double getHarga() { return harga; }
    public void setHarga(double harga) { this.harga = harga; }

    public String getKeterangan() { return keterangan; }
    public void setKeterangan(String keterangan) { this.keterangan = keterangan; }
}
