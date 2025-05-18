import { CheckCircle, Coffee, Truck, UserCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col gap-2 text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">커피 구독 방법</h2>
        <p className="text-muted-foreground mx-auto max-w-[700px]">
          개인화된 커피 구독을 시작하는 데 필요한 간단한 단계를 따르세요.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-4">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <UserCircle className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">프로필 생성</h3>
          <p className="text-muted-foreground">
            커피 취향을 파악하기 위해 우리의 맛 퀴즈를 참여하세요.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Coffee className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">추천 제공</h3>
          <p className="text-muted-foreground">
            당신의 취향 프로필에 맞는 커피 원두를 추천합니다.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <CheckCircle className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">배송 주기 선택</h3>
          <p className="text-muted-foreground">
            배송 주기를 선택하고 구독을 사용자 정의하세요.
          </p>
        </div>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Truck className="h-8 w-8 text-amber-800" />
          </div>
          <h3 className="text-xl font-semibold">신선한 커피 즐기기</h3>
          <p className="text-muted-foreground">
            신선하게 로스팅된 커피 원두가 당신의 문 앞에 도착합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
