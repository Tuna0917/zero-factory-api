# START

## 전체 초기 세팅 (DB 실행 + 초기 마이그레이션 + Client 생성)

```bash
pnpm db:setup
```

## DB 컨테이너 실행

```bash
pnpm db:up
```

## DB 컨테이너 종료

```bash
pnpm db:down
```

## DB 완전 초기화 (볼륨 삭제 후 재시작)

```bash
pnpm db:reset
```

## 마이그레이션 실행 (예시)

```bash
pnpm prisma:migrate --name add-store-table
```

## Prisma Client 재생성

```bash
pnpm prisma:generate
```

## Prisma Studio (DB GUI) 실행

```bash
pnpm prisma:studio
```
