# PRD: 필라테스 회원 관리 및 예약 시스템

## 1. 개요

### 1.1 프로젝트 비전
필라테스 센터 운영자와 회원 모두에게 편리한 회원 관리 및 예약 시스템을 제공하여, 센터 운영 효율성을 높이고 회원 만족도를 향상시킨다.

### 1.2 프로젝트 목표
- 회원 정보의 체계적인 관리
- 실시간 예약 및 취소 기능 제공
- 강사 스케줄 및 수업 관리 자동화
- 회원권/이용권 관리 및 결제 처리
- 운영 현황 분석을 위한 대시보드 제공

### 1.3 핵심 가치
| 가치 | 설명 |
|------|------|
| 편의성 | 직관적인 UI로 누구나 쉽게 사용 |
| 신뢰성 | 정확한 예약 관리와 데이터 보호 |
| 효율성 | 반복 업무 자동화로 운영 효율 향상 |
| 확장성 | 다양한 센터 규모에 맞는 유연한 구조 |

---

## 2. 사용자 정의

### 2.1 주요 사용자 그룹

#### 센터 관리자 (Admin)
- 센터 전체 운영 관리
- 강사/회원 관리
- 매출 및 통계 확인
- 시스템 설정 권한

#### 강사 (Instructor)
- 본인 스케줄 관리
- 담당 수업 확인
- 회원 출결 관리
- 회원 피드백 기록

#### 회원 (Member)
- 수업 예약/취소
- 본인 회원권 확인
- 예약 내역 조회
- 개인정보 관리

### 2.2 사용자 페르소나

**관리자 - 김센터장 (45세, 센터 운영 10년차)**
> "하루에 수십 명의 예약을 수기로 관리하다 보니 실수가 잦아요. 자동화된 시스템이 절실합니다."

**강사 - 이필라 (32세, 필라테스 강사 5년차)**
> "회원별 진도와 주의사항을 쉽게 확인하고 싶어요. 수업 전 빠르게 체크할 수 있으면 좋겠어요."

**회원 - 박회원 (28세, 직장인)**
> "퇴근 후 시간이 불규칙해서 모바일로 간편하게 예약하고 싶어요."

---

## 3. 핵심 기능 요구사항

### 3.1 회원 관리

#### 3.1.1 회원 등록
| 항목 | 필수여부 | 설명 |
|------|----------|------|
| 이름 | 필수 | 실명 |
| 연락처 | 필수 | 휴대폰 번호 |
| 이메일 | 선택 | 알림 수신용 |
| 생년월일 | 선택 | 연령대 분석용 |
| 성별 | 선택 | 통계용 |
| 등록일 | 자동 | 시스템 자동 기록 |
| 메모 | 선택 | 건강상태, 주의사항 등 |

#### 3.1.2 회원 조회/검색
- 이름, 연락처로 검색
- 회원 상태별 필터 (활성/휴면/만료)
- 회원권 종류별 필터
- 담당 강사별 필터

#### 3.1.3 회원 정보 수정/삭제
- 개인정보 수정
- 회원 상태 변경
- 회원 삭제 (soft delete)

#### 3.1.4 신체 평가 및 운동 처방 관리

회원의 신체 상태를 주기적으로 측정/평가하고, 맞춤형 운동 처방을 기록하여 장기적인 변화를 추적 관리하는 기능

##### 신체 측정 항목
| 카테고리 | 측정 항목 | 단위 | 설명 |
|----------|-----------|------|------|
| **기본 신체** | 키 | cm | 신장 |
| | 체중 | kg | 현재 체중 |
| | BMI | kg/m² | 자동 계산 |
| | 체지방률 | % | 인바디 등 측정 |
| | 근육량 | kg | 골격근량 |
| **체형 분석** | 어깨 너비 | cm | 좌우 균형 확인 |
| | 골반 너비 | cm | 골반 정렬 상태 |
| | 다리 길이 (좌/우) | cm | 좌우 차이 확인 |
| | 척추 측만 | 각도 | 측만 정도 |
| **유연성** | 전굴 | cm | 앞으로 숙이기 |
| | 고관절 가동범위 (좌/우) | 각도 | 고관절 유연성 |
| | 어깨 가동범위 (좌/우) | 각도 | 어깨 유연성 |
| | 햄스트링 유연성 (좌/우) | 각도 | 뒷허벅지 |
| **근력 평가** | 코어 근력 | 1-5점 | 플랭크 등 평가 |
| | 상체 근력 | 1-5점 | 푸시업 등 평가 |
| | 하체 근력 | 1-5점 | 스쿼트 등 평가 |
| | 균형 능력 | 1-5점 | 한발 서기 등 |
| **자세 분석** | 거북목 정도 | 1-5점 | 전방 두부 자세 |
| | 라운드 숄더 | 1-5점 | 어깨 말림 정도 |
| | 골반 기울기 | 전방/후방/정상 | 골반 틸트 |
| | 무릎 정렬 | O형/X형/정상 | 하지 정렬 |
| **통증/불편** | 통증 부위 | 텍스트 | 복수 선택 가능 |
| | 통증 강도 | 1-10점 | NRS 척도 |
| | 병력/수술력 | 텍스트 | 기존 질환/수술 |

##### 운동 처방 기능
| 기능 | 설명 |
|------|------|
| **목표 설정** | 회원별 운동 목표 설정 (체중감량, 자세교정, 재활, 근력강화 등) |
| **처방 작성** | 권장 운동, 주의 운동, 금지 운동 지정 |
| **프로그램 설계** | 주차별/단계별 운동 프로그램 설계 |
| **강도 조절** | 기구별 스프링 세팅, 반복 횟수, 세트 수 기록 |
| **주의사항** | 운동 시 주의할 점, 제한 동작 기록 |
| **홈케어 안내** | 집에서 할 수 있는 운동/스트레칭 안내 |

##### 변화 추적 및 분석
| 기능 | 설명 |
|------|------|
| **이력 관리** | 측정 날짜별 전체 기록 보관 |
| **비교 분석** | 초기 평가 vs 현재 vs 목표 비교 |
| **그래프 시각화** | 체중, 체지방, 근육량 등 변화 그래프 |
| **리포트 생성** | 회원용 평가 결과 리포트 PDF 출력 |
| **사진 기록** | 전신 사진 촬영 및 Before/After 비교 |
| **진행률 표시** | 목표 대비 달성률 시각화 |

##### 평가 주기 및 알림
| 항목 | 기본값 | 설명 |
|------|--------|------|
| 정기 평가 주기 | 4주 | 권장 재평가 주기 |
| 평가 알림 | 평가일 3일 전 | 강사/회원에게 알림 |
| 목표 달성 알림 | 자동 | 목표 수치 도달 시 축하 알림 |

### 3.2 회원권 관리

#### 3.2.1 회원권 종류
| 유형 | 설명 | 예시 |
|------|------|------|
| 횟수권 | 정해진 횟수만큼 이용 | 10회권, 20회권, 50회권 |
| 기간권 | 정해진 기간 동안 무제한 | 1개월, 3개월, 6개월, 12개월 |
| 혼합권 | 기간 + 횟수 제한 | 3개월 내 30회 |

#### 3.2.2 회원권 기능
- 회원권 등록/연장
- 잔여 횟수/기간 자동 계산
- 만료 임박 알림 (7일, 3일, 1일 전)
- 회원권 일시정지 (홀딩)
- 회원권 양도 (관리자 승인)

### 3.3 수업 관리

#### 3.3.1 수업 유형
| 유형 | 정원 | 설명 |
|------|------|------|
| 개인 레슨 | 1명 | 1:1 맞춤 수업 |
| 듀엣 | 2명 | 2인 수업 |
| 그룹 | 4-8명 | 소그룹 수업 |
| 대그룹 | 10명+ | 대형 그룹 수업 |

#### 3.3.2 수업 설정
- 수업명, 수업 유형
- 담당 강사
- 수업 시간 (시작/종료)
- 정원
- 수업 난이도 (초급/중급/고급)
- 사용 기구 (리포머, 캐딜락, 체어 등)

### 3.4 예약 관리

#### 3.4.1 예약 기능
- 수업 예약 (회원/관리자)
- 예약 취소 (취소 정책 적용)
- 예약 변경
- 대기자 등록

#### 3.4.2 예약 정책
| 정책 | 기본값 | 설명 |
|------|--------|------|
| 예약 가능 기간 | 7일 전 ~ 1시간 전 | 예약 가능 시점 |
| 취소 가능 기간 | 24시간 전 | 무료 취소 기한 |
| 노쇼 패널티 | 1회 차감 | 무단 결석 시 차감 |
| 최대 예약 건수 | 주 5회 | 동시 예약 제한 |

#### 3.4.3 예약 상태
```
예약완료 → 출석 → 수업완료
         → 결석 (노쇼)
         → 취소

대기중 → 예약완료 (자동 전환)
      → 취소
```

### 3.5 강사 관리

#### 3.5.1 강사 정보
- 기본 정보 (이름, 연락처, 이메일)
- 자격증 정보
- 담당 수업 유형
- 근무 스케줄
- 수업료 정보

#### 3.5.2 스케줄 관리
- 주간/월간 스케줄 설정
- 휴무일 등록
- 대강 신청/승인

### 3.6 결제 관리

#### 3.6.1 결제 방식
- 현금
- 카드 (신용/체크)
- 계좌이체
- 간편결제 (카카오페이, 네이버페이 등)

#### 3.6.2 결제 기능
- 회원권 결제
- 추가 상품 결제 (용품, PT 등)
- 환불 처리
- 할부 결제
- 영수증 발행

### 3.7 알림 시스템

#### 3.7.1 알림 유형
| 알림 | 대상 | 시점 |
|------|------|------|
| 예약 확인 | 회원 | 예약 즉시 |
| 수업 리마인더 | 회원 | 수업 2시간 전 |
| 회원권 만료 | 회원 | 7일, 3일, 1일 전 |
| 대기 → 예약 전환 | 회원 | 전환 즉시 |
| 신규 예약 | 강사 | 예약 즉시 |
| 취소 알림 | 강사 | 취소 즉시 |

#### 3.7.2 알림 채널
- 앱 푸시 알림
- SMS
- 카카오 알림톡
- 이메일

### 3.8 대시보드 및 리포트

#### 3.8.1 관리자 대시보드
- 오늘의 예약 현황
- 주간/월간 매출
- 회원 현황 (신규/활성/휴면/만료)
- 강사별 수업 현황
- 인기 수업 분석

#### 3.8.2 리포트 종류
- 매출 리포트 (일/주/월/년)
- 회원 분석 리포트
- 수업 분석 리포트
- 강사 실적 리포트
- 예약률/취소율 리포트

---

## 4. 사용자 스토리

### 4.1 회원 스토리

```
US-M01: 회원으로서, 앱에서 빈 시간대를 확인하고 수업을 예약하고 싶다.
        ∵ 전화하지 않고 편하게 예약하기 위해

US-M02: 회원으로서, 예약한 수업을 24시간 전까지 취소하고 싶다.
        ∵ 일정 변경 시 횟수 차감 없이 취소하기 위해

US-M03: 회원으로서, 내 회원권 잔여 횟수와 만료일을 확인하고 싶다.
        ∵ 회원권 연장 시기를 파악하기 위해

US-M04: 회원으로서, 선호하는 강사의 수업만 필터링해서 보고 싶다.
        ∵ 원하는 강사 수업을 빠르게 예약하기 위해

US-M05: 회원으로서, 원하는 수업이 만석일 때 대기 등록을 하고 싶다.
        ∵ 취소 발생 시 자동으로 예약되기 위해

US-M06: 회원으로서, 내 신체 측정 결과와 변화 추이를 확인하고 싶다.
        ∵ 운동 효과를 직접 확인하고 동기부여 받기 위해

US-M07: 회원으로서, 강사가 처방한 운동 프로그램을 확인하고 싶다.
        ∵ 집에서도 권장 운동을 따라하기 위해

US-M08: 회원으로서, 초기 평가와 현재 상태를 비교한 리포트를 받고 싶다.
        ∵ 그동안의 성과를 확인하고 목표를 재설정하기 위해
```

### 4.2 강사 스토리

```
US-I01: 강사로서, 오늘 내 수업 스케줄과 회원 목록을 확인하고 싶다.
        ∵ 수업 준비를 효율적으로 하기 위해

US-I02: 강사로서, 회원별 주의사항과 메모를 확인하고 싶다.
        ∵ 개인 맞춤 수업을 제공하기 위해

US-I03: 강사로서, 휴가나 개인 일정으로 인한 휴무를 등록하고 싶다.
        ∵ 해당 시간에 예약이 잡히지 않도록 하기 위해

US-I04: 강사로서, 수업 후 회원 출석을 체크하고 싶다.
        ∵ 정확한 출결 관리를 위해

US-I05: 강사로서, 회원의 신체 측정 결과를 기록하고 싶다.
        ∵ 회원의 현재 상태를 정확하게 파악하기 위해

US-I06: 강사로서, 측정 결과를 바탕으로 운동 처방을 작성하고 싶다.
        ∵ 회원에게 맞춤형 운동 프로그램을 제공하기 위해

US-I07: 강사로서, 회원의 이전 측정 기록과 현재를 비교하고 싶다.
        ∵ 회원의 신체 변화를 추적하고 프로그램 효과를 확인하기 위해

US-I08: 강사로서, 수업 전 회원의 처방 내용과 주의사항을 확인하고 싶다.
        ∵ 안전하고 효과적인 수업을 진행하기 위해
```

### 4.3 관리자 스토리

```
US-A01: 관리자로서, 신규 회원을 등록하고 회원권을 발급하고 싶다.
        ∵ 회원 관리를 시작하기 위해

US-A02: 관리자로서, 회원의 결제 내역과 잔액을 확인하고 싶다.
        ∵ 정확한 회계 관리를 위해

US-A03: 관리자로서, 전체 예약 현황을 한눈에 보고 싶다.
        ∵ 센터 운영 상황을 파악하기 위해

US-A04: 관리자로서, 월별 매출 및 회원 통계를 확인하고 싶다.
        ∵ 경영 의사결정에 활용하기 위해

US-A05: 관리자로서, 강사별 수업 실적을 확인하고 싶다.
        ∵ 강사 급여 산정 및 평가를 위해
```

---

## 5. 화면 설계 (와이어프레임)

### 5.1 주요 화면 구성

```
┌─────────────────────────────────────────────────────────────┐
│                        관리자 웹                            │
├─────────────────────────────────────────────────────────────┤
│  대시보드 │ 회원관리 │ 예약관리 │ 수업관리 │ 강사관리 │ 설정│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│   │ 오늘    │  │  주간   │  │  매출   │  │ 회원    │        │ 
│   │ 예약    │  │ 예약률  │  │ 현황    │  │ 현황    │        │
│   │  24건   │  │  85%    │  │ ₩2.5M   │  │ 156명   │        │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│                                                             │
│   ┌─────────────────────────────────────────────────┐       │
│   │             오늘의 스케줄 (타임라인)            │       │
│   │  09:00  │  10:00  │  11:00  │  12:00  │ ...     │       │
│   │  [개인] │  [그룹] │  [듀엣] │  [점심] │ ...     │       │
│   └─────────────────────────────────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      회원 모바일 앱                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐       │
│  │  🏠 홈    📅 예약    📋 내역    👤 마이페이지 │       │
│  └──────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   안녕하세요, 박회원님!                                     │
│                                                             │
│   ┌─────────────────────────────────────────────────┐       │
│   │  남은 횟수: 15회  │  만료일: 2024.03.15         │       │
│   └─────────────────────────────────────────────────┘       │
│                                                             │
│   다가오는 수업                                             │
│   ┌─────────────────────────────────────────────────┐       │
│   │  12/15 (금) 19:00                               │       │
│   │  개인 리포머 │ 이필라 강사                      │       │
│   │  [취소하기]                                     │       │
│   └─────────────────────────────────────────────────┘       │
│                                                             │
│   [+ 새 예약하기]                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 예약 화면 플로우

```
[날짜 선택] → [시간대 선택] → [수업/강사 선택] → [예약 확인] → [완료]
     │              │               │                │
     ▼              ▼               ▼                ▼
 캘린더뷰       타임테이블      가용 수업 목록    예약 상세 확인
```

---

## 6. 기술 요구사항

### 6.1 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                      클라이언트                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │  관리자 웹    │  │  회원 앱      │  │  강사 앱      │    │
│  │  (React)      │  │  (React       │  │  (React       │    │
│  │               │  │   Native)     │  │   Native)     │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       API Gateway                           │
│                    (Authentication)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      백엔드 서버                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ 회원    │  │ 예약    │  │ 결제    │  │ 알림    │         │
│  │ 서비스  │  │ 서비스  │  │ 서비스  │  │ 서비스  │         │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘         │
│                    (Node.js / NestJS)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       데이터 계층                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ PostgreSQL  │  │   Redis     │  │    S3       │          │
│  │  (주 DB)    │  │  (캐시)     │  │ (파일저장)  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 기술 스택 (권장)

| 영역 | 기술 | 선택 이유 |
|------|------|-----------|
| 프론트엔드 (웹) | React + TypeScript | 컴포넌트 재사용, 타입 안정성 |
| 프론트엔드 (앱) | React Native | 크로스 플랫폼, 코드 공유 |
| 백엔드 | Node.js + NestJS | TypeScript 통일, 구조화된 아키텍처 |
| 데이터베이스 | PostgreSQL | 관계형 데이터, 안정성 |
| 캐시 | Redis | 세션, 실시간 데이터 |
| 인증 | JWT + OAuth2 | 보안, 소셜 로그인 |
| 결제 | Toss Payments | 국내 결제 지원, 간편 연동 |
| 알림 | Firebase FCM | 푸시 알림 |
| 배포 | AWS / Vercel | 확장성, 안정성 |

### 6.3 데이터베이스 스키마 (핵심)

```sql
-- 회원
CREATE TABLE members (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100),
    birth_date DATE,
    gender VARCHAR(10),
    status VARCHAR(20) DEFAULT 'active',
    memo TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 회원권
CREATE TABLE memberships (
    id UUID PRIMARY KEY,
    member_id UUID REFERENCES members(id),
    type VARCHAR(20) NOT NULL, -- 'count', 'period', 'mixed'
    total_count INT,
    remaining_count INT,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 강사
CREATE TABLE instructors (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 수업
CREATE TABLE classes (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'private', 'duet', 'group'
    instructor_id UUID REFERENCES instructors(id),
    max_capacity INT NOT NULL,
    duration INT NOT NULL, -- minutes
    level VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
    created_at TIMESTAMP DEFAULT NOW()
);

-- 수업 스케줄
CREATE TABLE schedules (
    id UUID PRIMARY KEY,
    class_id UUID REFERENCES classes(id),
    instructor_id UUID REFERENCES instructors(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- 예약
CREATE TABLE reservations (
    id UUID PRIMARY KEY,
    member_id UUID REFERENCES members(id),
    schedule_id UUID REFERENCES schedules(id),
    status VARCHAR(20) DEFAULT 'confirmed', -- 'confirmed', 'cancelled', 'attended', 'no_show', 'waiting'
    reserved_at TIMESTAMP DEFAULT NOW(),
    cancelled_at TIMESTAMP,
    attended_at TIMESTAMP
);

-- 결제
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    member_id UUID REFERENCES members(id),
    membership_id UUID REFERENCES memberships(id),
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'completed',
    paid_at TIMESTAMP DEFAULT NOW()
);

-- 신체 평가
CREATE TABLE physical_assessments (
    id UUID PRIMARY KEY,
    member_id UUID REFERENCES members(id),
    instructor_id UUID REFERENCES instructors(id),
    assessment_date DATE NOT NULL,
    assessment_type VARCHAR(20) DEFAULT 'regular', -- 'initial', 'regular', 'final'

    -- 기본 신체
    height DECIMAL(5,1),              -- 키 (cm)
    weight DECIMAL(5,2),              -- 체중 (kg)
    bmi DECIMAL(4,2),                 -- BMI (자동 계산)
    body_fat_percentage DECIMAL(4,1), -- 체지방률 (%)
    muscle_mass DECIMAL(5,2),         -- 근육량 (kg)

    -- 체형 분석
    shoulder_width DECIMAL(5,1),      -- 어깨 너비 (cm)
    pelvis_width DECIMAL(5,1),        -- 골반 너비 (cm)
    leg_length_left DECIMAL(5,1),     -- 왼쪽 다리 길이 (cm)
    leg_length_right DECIMAL(5,1),    -- 오른쪽 다리 길이 (cm)
    scoliosis_angle DECIMAL(4,1),     -- 척추 측만 각도

    -- 유연성
    forward_bend DECIMAL(5,1),        -- 전굴 (cm)
    hip_rom_left DECIMAL(4,1),        -- 고관절 가동범위 좌 (각도)
    hip_rom_right DECIMAL(4,1),       -- 고관절 가동범위 우 (각도)
    shoulder_rom_left DECIMAL(4,1),   -- 어깨 가동범위 좌 (각도)
    shoulder_rom_right DECIMAL(4,1),  -- 어깨 가동범위 우 (각도)
    hamstring_left DECIMAL(4,1),      -- 햄스트링 유연성 좌 (각도)
    hamstring_right DECIMAL(4,1),     -- 햄스트링 유연성 우 (각도)

    -- 근력 평가 (1-5점)
    core_strength INT CHECK (core_strength BETWEEN 1 AND 5),
    upper_body_strength INT CHECK (upper_body_strength BETWEEN 1 AND 5),
    lower_body_strength INT CHECK (lower_body_strength BETWEEN 1 AND 5),
    balance_ability INT CHECK (balance_ability BETWEEN 1 AND 5),

    -- 자세 분석 (1-5점)
    forward_head_posture INT CHECK (forward_head_posture BETWEEN 1 AND 5),
    round_shoulder INT CHECK (round_shoulder BETWEEN 1 AND 5),
    pelvic_tilt VARCHAR(20),          -- 'anterior', 'posterior', 'normal'
    knee_alignment VARCHAR(20),        -- 'varus', 'valgus', 'normal'

    -- 통증/불편
    pain_areas TEXT,                  -- JSON 배열로 복수 부위 저장
    pain_level INT CHECK (pain_level BETWEEN 0 AND 10),
    medical_history TEXT,             -- 병력/수술력

    -- 메모
    notes TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 신체 평가 사진
CREATE TABLE assessment_photos (
    id UUID PRIMARY KEY,
    assessment_id UUID REFERENCES physical_assessments(id),
    photo_type VARCHAR(20) NOT NULL,  -- 'front', 'side', 'back'
    photo_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 운동 처방
CREATE TABLE exercise_prescriptions (
    id UUID PRIMARY KEY,
    member_id UUID REFERENCES members(id),
    instructor_id UUID REFERENCES instructors(id),
    assessment_id UUID REFERENCES physical_assessments(id),

    -- 목표 설정
    primary_goal VARCHAR(50),         -- 'weight_loss', 'posture', 'rehab', 'strength', etc.
    secondary_goals TEXT,             -- JSON 배열
    target_weight DECIMAL(5,2),
    target_body_fat DECIMAL(4,1),
    target_date DATE,

    -- 처방 내용
    recommended_exercises TEXT,       -- 권장 운동 (JSON)
    caution_exercises TEXT,           -- 주의 운동 (JSON)
    prohibited_exercises TEXT,        -- 금지 운동 (JSON)

    -- 프로그램 설정
    weekly_frequency INT,             -- 주간 권장 횟수
    session_duration INT,             -- 1회 권장 시간 (분)
    program_duration_weeks INT,       -- 프로그램 기간 (주)

    -- 상세 내용
    special_instructions TEXT,        -- 특별 지시사항
    home_exercise_guide TEXT,         -- 홈케어 운동 안내

    status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'cancelled'
    start_date DATE NOT NULL,
    end_date DATE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 운동 처방 상세 (주차별/단계별 프로그램)
CREATE TABLE prescription_details (
    id UUID PRIMARY KEY,
    prescription_id UUID REFERENCES exercise_prescriptions(id),
    week_number INT,                  -- 주차
    phase VARCHAR(20),                -- 'warmup', 'main', 'cooldown'
    exercise_name VARCHAR(100) NOT NULL,
    equipment VARCHAR(50),            -- 사용 기구
    spring_setting VARCHAR(50),       -- 스프링 세팅
    sets INT,
    reps INT,
    duration_seconds INT,
    rest_seconds INT,
    notes TEXT,
    order_index INT,                  -- 운동 순서
    created_at TIMESTAMP DEFAULT NOW()
);

-- 회원 목표 달성 기록
CREATE TABLE goal_achievements (
    id UUID PRIMARY KEY,
    member_id UUID REFERENCES members(id),
    prescription_id UUID REFERENCES exercise_prescriptions(id),
    goal_type VARCHAR(50) NOT NULL,
    initial_value DECIMAL(10,2),
    target_value DECIMAL(10,2),
    achieved_value DECIMAL(10,2),
    achieved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 7. 비기능 요구사항

### 7.1 성능

| 항목 | 목표치 |
|------|--------|
| API 응답 시간 | < 200ms (평균) |
| 페이지 로드 시간 | < 3초 |
| 동시 접속자 | 500명 이상 |
| 데이터베이스 쿼리 | < 100ms |

### 7.2 가용성

- 서비스 가용성: 99.9% (연간 다운타임 8.76시간 이내)
- 자동 장애 복구 (Auto-healing)
- 실시간 모니터링 및 알림

### 7.3 보안

| 영역 | 요구사항 |
|------|----------|
| 인증 | JWT 토큰 기반, 토큰 만료 관리 |
| 암호화 | 비밀번호 bcrypt, 전송 시 TLS |
| 개인정보 | 개인정보보호법 준수, 암호화 저장 |
| 접근제어 | 역할 기반 접근 제어 (RBAC) |
| 감사 | 주요 작업 로그 기록 |

### 7.4 확장성

- 수평 확장 가능한 아키텍처
- 마이크로서비스 전환 가능 구조
- 멀티테넌트 지원 (추후)

---

## 8. MVP 범위 정의

### 8.1 Phase 1: MVP (8주)

**핵심 기능만 포함**

| 카테고리 | 기능 | 우선순위 |
|----------|------|----------|
| 회원관리 | 회원 CRUD | P0 |
| 회원관리 | 회원권 등록/관리 | P0 |
| 예약관리 | 예약 생성/취소 | P0 |
| 예약관리 | 예약 현황 조회 | P0 |
| 수업관리 | 수업 CRUD | P0 |
| 수업관리 | 스케줄 설정 | P0 |
| 강사관리 | 강사 CRUD | P1 |
| 대시보드 | 기본 현황 | P1 |
| 알림 | SMS 알림 | P1 |
| **신체평가** | **기본 측정 기록** | **P1** |
| **신체평가** | **운동 처방 작성** | **P1** |

### 8.2 Phase 2: 확장 (4주)

| 카테고리 | 기능 | 우선순위 |
|----------|------|----------|
| 결제 | 온라인 결제 연동 | P1 |
| 알림 | 푸시 알림 | P1 |
| 알림 | 카카오 알림톡 | P2 |
| 리포트 | 매출 리포트 | P2 |
| 리포트 | 회원 분석 | P2 |
| **신체평가** | **측정 이력 비교/분석** | **P1** |
| **신체평가** | **변화 그래프 시각화** | **P2** |
| **신체평가** | **회원용 리포트 PDF** | **P2** |

### 8.3 Phase 3: 고도화 (4주)

| 카테고리 | 기능 | 우선순위 |
|----------|------|----------|
| 회원앱 | 모바일 앱 출시 | P2 |
| 강사앱 | 강사 전용 앱 | P2 |
| 대기자 | 대기자 관리 | P2 |
| 양도 | 회원권 양도 | P3 |
| 멀티센터 | 다중 센터 지원 | P3 |
| **신체평가** | **Before/After 사진 비교** | **P2** |
| **신체평가** | **주차별 프로그램 관리** | **P2** |
| **신체평가** | **목표 달성 알림/축하** | **P3** |
| **신체평가** | **홈케어 운동 영상 연동** | **P3** |

---

## 9. 성공 지표 (KPI)

### 9.1 비즈니스 지표

| 지표 | 목표 | 측정 방법 |
|------|------|-----------|
| 예약 전환율 | > 80% | 예약 완료 / 예약 시도 |
| 노쇼율 | < 5% | 노쇼 / 총 예약 |
| 회원 재등록률 | > 70% | 재등록 / 만료 회원 |
| 월 활성 사용자 | > 90% | MAU / 전체 회원 |

### 9.2 기술 지표

| 지표 | 목표 | 측정 방법 |
|------|------|-----------|
| 시스템 가용성 | > 99.9% | 업타임 모니터링 |
| 평균 응답시간 | < 200ms | APM 측정 |
| 에러율 | < 0.1% | 에러 로그 분석 |
| 사용자 만족도 | > 4.5/5 | 앱스토어 평점 |

---

## 10. 리스크 및 대응 방안

| 리스크 | 영향도 | 발생확률 | 대응방안 |
|--------|--------|----------|----------|
| 개인정보 유출 | 높음 | 낮음 | 암호화, 접근 로그, 보안 감사 |
| 예약 중복 | 중간 | 중간 | 트랜잭션 처리, 동시성 제어 |
| 시스템 장애 | 높음 | 낮음 | 이중화, 자동 복구, 백업 |
| 결제 오류 | 높음 | 낮음 | PG사 이중 연동, 수동 처리 프로세스 |
| 사용자 이탈 | 중간 | 중간 | UX 개선, 피드백 수집, 빠른 대응 |

---

## 11. 부록

### 11.1 용어 정의

| 용어 | 정의 |
|------|------|
| 회원권 | 회원이 수업을 이용할 수 있는 권리 |
| 횟수권 | 정해진 횟수만큼 수업 이용 가능한 회원권 |
| 기간권 | 정해진 기간 동안 무제한 이용 가능한 회원권 |
| 홀딩 | 회원권 일시 정지 |
| 노쇼 | 예약 후 연락 없이 불참 |
| 대기자 | 만석 수업에 취소 발생 시 자동 예약되는 대기 회원 |

### 11.2 참고 자료

- [개인정보보호법 가이드라인](https://www.privacy.go.kr)
- [전자결제 관련 법규](https://www.fss.or.kr)

---

## 12. 변경 이력

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0.0 | 2024-12-11 | - | 최초 작성 |
| 1.1.0 | 2024-12-11 | - | 신체 평가 및 운동 처방 관리 기능 추가 (3.1.4절, 사용자 스토리, DB 스키마, MVP 범위) |

---

*이 문서는 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
