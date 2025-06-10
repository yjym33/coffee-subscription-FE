package com.beanbliss.subscription.config;

import com.beanbliss.subscription.entity.Coffee;
import com.beanbliss.subscription.repository.CoffeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final CoffeeRepository coffeeRepository;

    @Override
    public void run(String... args) throws Exception {
        if (coffeeRepository.count() == 0) {
            loadSampleCoffees();
        }
    }

    private void loadSampleCoffees() {
        // Ethiopian Yirgacheffe
        Coffee ethiopianYirgacheffe = Coffee.builder()
                .name("Ethiopian Yirgacheffe")
                .description("A light roast coffee with bright acidity and floral notes.")
                .imageUrl("/images/coffee/ethiopian-yirgacheffe.jpg")
                .price(new BigDecimal("24.99"))
                .weightGrams(250)
                .stockQuantity(100)
                .roastLevel(Coffee.RoastLevel.LIGHT)
                .acidityLevel(85)
                .bodyLevel(50)
                .caffeineType(Coffee.CaffeineType.REGULAR)
                .originType(Coffee.OriginType.SINGLE_ORIGIN)
                .originCountry("Ethiopia")
                .originRegion("Yirgacheffe")
                .roastDate(LocalDate.now().minusDays(3))
                .flavorNotes("Floral, Citrus, Bright")
                .brewingRecommendation("Pour over or drip brewing recommended")
                .isFeatured(true)
                .isAvailable(true)
                .build();

        // Colombian Supremo
        Coffee colombianSupremo = Coffee.builder()
                .name("Colombian Supremo")
                .description("Medium roast with balanced flavor and rich body.")
                .imageUrl("/images/coffee/colombian-supremo.jpg")
                .price(new BigDecimal("22.99"))
                .weightGrams(250)
                .stockQuantity(150)
                .roastLevel(Coffee.RoastLevel.MEDIUM)
                .acidityLevel(60)
                .bodyLevel(75)
                .caffeineType(Coffee.CaffeineType.REGULAR)
                .originType(Coffee.OriginType.SINGLE_ORIGIN)
                .originCountry("Colombia")
                .originRegion("Huila")
                .roastDate(LocalDate.now().minusDays(2))
                .flavorNotes("Chocolate, Caramel, Nuts")
                .brewingRecommendation("Versatile - suitable for any brewing method")
                .isFeatured(true)
                .isAvailable(true)
                .build();

        // Decaf Sumatra
        Coffee decafSumatra = Coffee.builder()
                .name("Decaf Sumatra")
                .description("Full-bodied decaffeinated coffee with earthy undertones.")
                .imageUrl("/images/coffee/decaf-sumatra.jpg")
                .price(new BigDecimal("26.99"))
                .weightGrams(250)
                .stockQuantity(80)
                .roastLevel(Coffee.RoastLevel.DARK)
                .acidityLevel(30)
                .bodyLevel(90)
                .caffeineType(Coffee.CaffeineType.DECAF)
                .originType(Coffee.OriginType.SINGLE_ORIGIN)
                .originCountry("Indonesia")
                .originRegion("Sumatra")
                .roastDate(LocalDate.now().minusDays(1))
                .flavorNotes("Earthy, Herbal, Full-bodied")
                .brewingRecommendation("French press or espresso")
                .isFeatured(true)
                .isAvailable(true)
                .build();

        // House Blend
        Coffee houseBlend = Coffee.builder()
                .name("House Blend")
                .description("Our signature blend combining beans from multiple origins.")
                .imageUrl("/images/coffee/house-blend.jpg")
                .price(new BigDecimal("19.99"))
                .weightGrams(250)
                .stockQuantity(200)
                .roastLevel(Coffee.RoastLevel.MEDIUM)
                .acidityLevel(55)
                .bodyLevel(65)
                .caffeineType(Coffee.CaffeineType.REGULAR)
                .originType(Coffee.OriginType.BLEND)
                .originCountry("Multiple")
                .originRegion("Various")
                .roastDate(LocalDate.now())
                .flavorNotes("Balanced, Smooth, Approachable")
                .brewingRecommendation("Perfect for drip coffee makers")
                .isFeatured(true)
                .isAvailable(true)
                .build();

        coffeeRepository.save(ethiopianYirgacheffe);
        coffeeRepository.save(colombianSupremo);
        coffeeRepository.save(decafSumatra);
        coffeeRepository.save(houseBlend);
    }
} 