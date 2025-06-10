package com.beanbliss.subscription.controller;

import com.beanbliss.subscription.dto.CoffeeDTO;
import com.beanbliss.subscription.entity.Coffee;
import com.beanbliss.subscription.service.CoffeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/coffees")
@RequiredArgsConstructor
public class CoffeeController {

    private final CoffeeService coffeeService;

    @GetMapping("/featured")
    public ResponseEntity<List<CoffeeDTO.Response>> getFeaturedCoffees() {
        List<CoffeeDTO.Response> featuredCoffees = coffeeService.getFeaturedCoffees();
        return ResponseEntity.ok(featuredCoffees);
    }

    @GetMapping
    public ResponseEntity<Page<CoffeeDTO.Response>> getCoffees(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String roastLevel,
            @RequestParam(required = false) String caffeineType,
            @RequestParam(required = false) String originType,
            @RequestParam(required = false) Integer minAcidity,
            @RequestParam(required = false) Integer maxAcidity,
            @RequestParam(required = false) Integer minBody,
            @RequestParam(required = false) Integer maxBody,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {

        CoffeeDTO.FilterRequest filter = CoffeeDTO.FilterRequest.builder()
                .keyword(keyword)
                .roastLevel(roastLevel != null ? Coffee.RoastLevel.valueOf(roastLevel.toUpperCase()) : null)
                .caffeineType(caffeineType != null ? Coffee.CaffeineType.valueOf(caffeineType.toUpperCase()) : null)
                .originType(originType != null ? Coffee.OriginType.valueOf(originType.toUpperCase()) : null)
                .minAcidity(minAcidity)
                .maxAcidity(maxAcidity)
                .minBody(minBody)
                .maxBody(maxBody)
                .page(page)
                .size(size)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();

        Page<CoffeeDTO.Response> coffees = coffeeService.getCoffees(filter);
        return ResponseEntity.ok(coffees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoffeeDTO.Response> getCoffeeById(@PathVariable Long id) {
        return coffeeService.getCoffeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CoffeeDTO.Response> createCoffee(@Valid @RequestBody CoffeeDTO.Request request) {
        CoffeeDTO.Response createdCoffee = coffeeService.createCoffee(request);
        return ResponseEntity.ok(createdCoffee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoffeeDTO.Response> updateCoffee(
            @PathVariable Long id,
            @Valid @RequestBody CoffeeDTO.Request request) {
        CoffeeDTO.Response updatedCoffee = coffeeService.updateCoffee(id, request);
        return ResponseEntity.ok(updatedCoffee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoffee(@PathVariable Long id) {
        coffeeService.deleteCoffee(id);
        return ResponseEntity.noContent().build();
    }
} 