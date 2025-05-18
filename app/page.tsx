import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Coffee, Gift, Truck } from "lucide-react";
import FeaturedProducts from "@/components/home/featured-products";
import TestimonialSection from "@/components/home/testimonial-section";
import HowItWorks from "@/components/home/how-it-works";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-[#f8f3e9] py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                  개인화된 커피 경험
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  당신의 취향에 맞는 커피
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  당신의 독특한 취향에 맞는 커피 원두를 발견하세요. 우리의
                  지능형 플랫폼이 사용자의 취향 프로필을 분석하여 다음을
                  제공합니다 완벽한 양조주, 바로 집 앞까지.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-800 hover:bg-amber-900"
                >
                  <Link href="/taste-profile">완벽한 매칭 찾기</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/catalog">카탈로그 찾아보기</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Coffee beans and brewing equipment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-none shadow-sm bg-amber-50">
            <CardHeader className="pb-2">
              <Coffee className="h-12 w-12 text-amber-800" />
              <CardTitle className="text-xl">개인화된 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                우리의 알고리즘은 당신의 취향 선호도를 분석하여 고유한 프로필에
                맞는 커피 원두를 추천합니다.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-amber-50">
            <CardHeader className="pb-2">
              <Truck className="h-12 w-12 text-amber-800" />
              <CardTitle className="text-xl">유연한 배송</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                주간, 2주마다, 월간 중에서 선택할 수 있습니다. 언제든지
                일시정지, 수정 또는 취소할 수 있습니다.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-amber-50">
            <CardHeader className="pb-2">
              <Gift className="h-12 w-12 text-amber-800" />
              <CardTitle className="text-xl">항상 신선함</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                우리는 주문에 따라 로스팅하여 당신의 커피가 항상 최적의 신선도를
                유지합니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Products */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            인기 있는 커피 선택
          </h2>
          <p className="text-gray-500">
            우리의 인기 있는 커피 선택을 발견하세요.
          </p>
        </div>
        <FeaturedProducts />
        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/catalog" className="flex items-center gap-2">
              모든 제품 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="bg-amber-800 text-white py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            커피 여정을 시작하세요
          </h2>
          <p className="max-w-[600px] mx-auto mb-8 text-amber-100">
            우리의 맛 퀴즈를 참여하고 당신의 취향에 맞는 커피 원두를 발견하세요.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/register">계정 생성</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
