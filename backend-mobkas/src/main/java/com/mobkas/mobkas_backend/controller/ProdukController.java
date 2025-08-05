
package com.mobkas.mobkas_backend.controller;

import com.mobkas.mobkas_backend.model.Produk;
import com.mobkas.mobkas_backend.repositrory.ProdukRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produk")
@CrossOrigin(origins = "*")
public class ProdukController {
    @Autowired
    private ProdukRepository repository;

    @GetMapping
    public List<Produk> ambilSemuaProduk() {
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<Produk> cariMerek(@RequestParam String merek) {
        return repository.cariMerekProdukAbaikan(merek);
    }

    @PutMapping("/{id}")
    public Produk updateProduct(@PathVariable Long id, @RequestBody Produk updatedProduct) {
        return repository.findById(id).map(produk -> {
            produk.setMerekProduk(updatedProduct.getMerekProduk());
            produk.setJenisProduk(updatedProduct.getJenisProduk());
            produk.setJumlahStok(updatedProduct.getJumlahStok());
            produk.setHarga(updatedProduct.getHarga());
            produk.setKeterangan(updatedProduct.getKeterangan());
            return repository.save(produk);
        }).orElseThrow(() -> new RuntimeException("Produk tidak ditemukan"));
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @PostMapping
    public Produk tambahProduk(@RequestBody Produk produk) {
        return repository.save(produk);
    }

}
