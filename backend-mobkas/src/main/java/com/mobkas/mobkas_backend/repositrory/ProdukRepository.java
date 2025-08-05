
package com.mobkas.mobkas_backend.repositrory;

import com.mobkas.mobkas_backend.model.Produk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdukRepository extends JpaRepository<Produk, Long> {
    @Query("SELECT p FROM Produk p WHERE LOWER(p.merekProduk) LIKE LOWER(CONCAT('%', :merek, '%'))")
    List<Produk> cariMerekProdukAbaikan(String merek);
}
