# ☕️ 기획서 – 개인화 커피/티 구독 쇼핑몰 플랫폼

## 1. 프로젝트 개요

### 🎯 목표
사용자의 커피/티 취향 및 소비 패턴에 맞춰  
**개인화된 원두 구독 서비스를 제공하는 지능형 쇼핑몰 플랫폼** 개발

### 🧩 주요 기능
- 사용자 맞춤형 정기 구독 상품 추천 (맛, 향, 산미 기반 선호도 분석)
- 배송 주기 설정 및 자동 결제 기능
- 마이페이지 구독 관리 (일시 정지, 변경, 취소)
- 후기 기반 상품 추천 알고리즘
- 관리자 상품/구독 관리 기능
- 향후 추천 알고리즘/기계학습 기반 최적화 기능 연동

---

## 2. 구축 전략

### 2-1. 📦 정기 구독 중심 설계
- 구독은 반복성과 커스터마이징 요소가 핵심
- 초기: 사용자 설문 기반 추천 → 이후 리뷰 및 구매 이력 반영하여 지속적 개인화

### 2-2. 🧠 개인화 추천 기능
- 조건 기반 추천: 산미/바디감/카페인 유무 등 필터
- 확장: 행동 데이터 + 피드백 → 벡터 변환 후 유사 사용자 추천

**예시 시나리오:**
- “산미 있는 원두 + 오후에 마심” → 디카페인 과일향 원두 추천
- “블렌딩보단 싱글 오리진 선호” → 관련 상품 필터링 + 신상품 추천

### 2-3. 💳 정기 결제 자동화 및 유연한 관리
- 결제 주기: 1/2/4주 자동 스케줄링
- 마이페이지에서 사용자가 주문 일시정지 / 재개 / 변경 / 취소 가능

---

## 3. 도메인별 데이터 구성

### 3-1. ☕ 상품 도메인
- 원두명, 로스팅일자, 향미 노트, 산지
- 산미/바디감 지수, 카페인 유무, 적정 소비 시기
- 이미지 및 설명

### 3-2. 👤 사용자 도메인
- 취향 설문 데이터 (향미, 농도, 마시는 시간대 등)
- 구독 상태 (활성, 일시정지, 취소)
- 배송지, 리뷰 및 구매 이력

### 3-3. 🔁 구독/결제 도메인
- 구독 시작일, 주기 설정, 다음 결제일
- 결제 실패 처리 및 자동 재시도 로직 포함

---

## 4. 🛠 기술 스택 (예정)

| 범주         | 기술 스택 예시                                           |
|--------------|--------------------------------------------------------|
| **Frontend** | Next.js, React, TailwindCSS                            |
| **Backend**  | Spring Boot (MSA 확장 고려), 또는 초기 NestJS           |
| **DB**       | PostgreSQL                                              |
| **ORM**      | JPA (Spring) or TypeORM (NestJS)                        |
| **인증**      | JWT 기반 로그인                                         |
| **스케줄링**   | Spring Scheduler or 배치 기반 정기 처리                 |
| **추천 기능** | 필터 기반 추천 → 확장 시 FAISS/Qdrant + Embedding 적용 |
| **배포**      | Docker, Nginx, AWS EC2 or Render                       |

---

## 5. ✅ 기대 효과

- 커피 취향 파악부터 배송까지 **자동화된 구독 경험 제공**
- 커뮤니티 기반이 아닌 **개인화된 상품 큐레이션**
- 반복 주문의 편의성과 맞춤 추천 → **구매 전환율 및 충성도 향상**
- 추천 시스템과 스케줄링 등 기술적으로 완성도 높은 포트폴리오 구축 가능

---

## 6. 🔮 향후 계획

- **MVP**: 기본 CRUD + 정기 구독 관리 기능 구현 (Spring 또는 Nest 기반)
- 사용자 설문 기반 추천 기능 개발
- 결제 시스템 API 연동 (가상 결제 or 모의 처리 우선)
- 유저 기반 구매/후기 데이터 → 추천 기능 개선
- 멀티 벡터 기반 추천 알고리즘 실험 (RAG-like 구조 고려)
- 데이터/트래픽 증가 시 **MSA 아키텍처 도입 고려**

---

## 🔁 선택 시나리오 기반 확장 예시

| 사용자 행동             | 확장 기능 예시                                  |
|------------------------|-----------------------------------------------|
| 구독 취소/변경 많음      | UX 개선 + 추천 품질 향상                       |
| 특정 원두 선호 집중       | 인기 랭킹, 재입고 알림 시스템 도입             |
| 다양한 취향 요청 증가     | 상품 메타데이터 강화 + 추천 엔진 개선          |
| 단일 상품 반복 구매       | 단품 정기구매 기능 도입                        |

---

## 구현중인 이미지

![image](https://github.com/user-attachments/assets/e035fbb3-c77f-491d-bd2d-3fc56f5b1f6b)
![image](https://github.com/user-attachments/assets/66530211-7ebc-486d-b374-4a77b4a3baa4)
![image](https://github.com/user-attachments/assets/1b834b90-b082-4d5a-ad3d-065d806e2c76)
![image](https://github.com/user-attachments/assets/cd2ab4cd-f637-45cb-adc2-788c9a8744c4)
![image](https://github.com/user-attachments/assets/0717347f-c0d5-4f0c-b3b9-618e7335834c)


![image](https://github.com/user-attachments/assets/18182680-f4d5-4a20-a067-f20fa1b346c5)

![image](https://github.com/user-attachments/assets/f2badf5d-ec63-453d-ba3c-cdd54372fda7)

![image](https://github.com/user-attachments/assets/864141df-f099-45a8-96df-6188cd7cad58)

![image](https://github.com/user-attachments/assets/0f00897c-e030-4b23-a91e-b764dd819f49)

![image](https://github.com/user-attachments/assets/e4f397a0-b3b7-48a7-a973-2c03e87394f8)

![image](https://github.com/user-attachments/assets/7f956680-27f2-43cc-a37b-a584a11ece27)

