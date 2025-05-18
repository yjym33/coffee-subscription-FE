import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "이영호",
    role: "커피 사랑꾼",
    content:
      "개인화된 구독이 내 아침 루틴을 완전히 바꾸었습니다. 그냥 커피 원두를 주문하는 것보다 훨씬 더 맛있습니다!",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "김지수",
    role: "집 바리스타",
    content:
      "구독이 내 피드백에 적응하는 것을 좋아합니다. 각 배송은 내 완벽한 커피를 더 가까이 가져옵니다.",
    rating: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "이진형",
    role: "일일 커피 마시는 사람",
    content:
      "여행 시 구독을 일시정지할 수 있는 유연함이 멋집니다. 그리고 내가 돌아오면 커피가 항상 신선합니다!",
    rating: 4,
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-2 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">고객의 소리</h2>
          <p className="text-muted-foreground mx-auto max-w-[700px]">
            수천 명의 커피 사랑꾼들이 자신의 완벽한 커피를 발견했습니다.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
