import React from "react";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            커피 구독 정보
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            당신의 완벽한 커피/티 경험을 찾아드립니다.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-semibold">우리의 미션</h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              저희는 사용자의 섬세한 취향과 라이프스타일에 맞춰 최적의 커피와
              티를 추천하고, 정기 구독을 통해 편리하게 즐기실 수 있도록 돕는
              것을 목표로 합니다. 단순한 상품 판매를 넘어, 각자의 일상에 특별한
              향미와 휴식을 더하는 경험을 제공하고자 합니다.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold">우리의 가치</h2>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong className="font-medium">개인화 추천:</strong> 사용자의
                선호도(맛, 향, 산미 등)와 소비 패턴을 정밀하게 분석하여 맞춤형
                상품을 제안합니다.
              </li>
              <li>
                <strong className="font-medium">최고의 품질:</strong> 엄선된
                원두와 티를 사용하여 최상의 맛과 향을 보장합니다.
              </li>
              <li>
                <strong className="font-medium">편리한 구독:</strong> 간편한
                배송 주기 설정, 자동 결제, 유연한 구독 관리 기능을 통해 번거로움
                없이 서비스를 이용할 수 있습니다.
              </li>
              <li>
                <strong className="font-medium">지속적인 발전:</strong> 사용자
                피드백과 데이터 분석을 통해 추천 알고리즘을 지속적으로 개선하고,
                더욱 만족스러운 서비스를 제공하기 위해 노력합니다.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-center">우리의 약속</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            매일 마시는 커피와 티가 단순한 습관을 넘어, 당신의 하루를 더욱
            풍요롭게 만드는 특별한 순간이 될 수 있도록 최선을 다하겠습니다.
            지능형 추천 시스템과 함께 당신만의 완벽한 한 잔을 찾아보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
