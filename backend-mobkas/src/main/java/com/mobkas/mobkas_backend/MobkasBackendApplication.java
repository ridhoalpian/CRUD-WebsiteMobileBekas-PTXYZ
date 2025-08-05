package com.mobkas.mobkas_backend;

import com.mobkas.mobkas_backend.model.Produk;
import com.mobkas.mobkas_backend.repositrory.ProdukRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class MobkasBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MobkasBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner run(ProdukRepository produkRepository) {
        return args -> {
            if (produkRepository.count() == 0) {
                List<Produk> sampleData = List.of(
                    new Produk("Esemka", "SUV", 10, 150000000, "Warna hitam, tahun 2022, mobil langka"),
                    new Produk("Honda", "Sedan", 5, 130000000, "Kondisi sangat baik"),
                    new Produk("Mitsubishi", "Pickup", 7, 110000000, "Untuk angkut barang")
                );
                produkRepository.saveAll(sampleData);
                System.out.println("Data dummy berhasil ditambahkan.");
            }
        };
    }
}
