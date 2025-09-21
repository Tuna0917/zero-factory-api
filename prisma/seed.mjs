// prisma/seed.mjs
import { PrismaClient } from '@prisma/client';
import { PlaceType } from '@prisma/client/edge';

const prisma = new PrismaClient();

// const KAIST_LAT = 36.3731;
// const KAIST_LNG = 127.362;

// 10개 샘플 좌표 (무작위로 생성된, KAIST 기준 반경 <= ~100m)
const pois = [
  { name: '샘플 POI 1', lat: 36.372819, lng: 127.362679 },
  { name: '샘플 POI 2', lat: 36.373224, lng: 127.361378 },
  { name: '샘플 POI 3', lat: 36.372701, lng: 127.36256 },
  { name: '샘플 POI 4', lat: 36.37274, lng: 127.361534 },
  { name: '샘플 POI 5', lat: 36.373556, lng: 127.361597 },
  { name: '샘플 POI 6', lat: 36.373208, lng: 127.362909 },
  { name: '샘플 POI 7', lat: 36.373058, lng: 127.362432 },
  { name: '샘플 POI 8', lat: 36.373078, lng: 127.361984 },
  { name: '샘플 POI 9', lat: 36.373376, lng: 127.362873 },
  { name: '샘플 POI 10', lat: 36.373097, lng: 127.361978 },
];

async function main() {
  console.log('Seeding: creating temp member and 10 POIs...');

  // 1) 임시 Member (deviceId는 임의값)
  const member = await prisma.member.create({
    data: {
      deviceId: `temp-device-${Date.now()}`,
      pointBalance: 100,
    },
  });
  console.log('Created member:', member.id);

  // 2) POI들 삽입 (geography(Point,4326) 사용)
  for (let i = 0; i < pois.length; i++) {
    const p = pois[i];
    // 안전한 파라미터 바인딩 방식 (템플릿 리터럴 안에 ${}로 넣으면 Prisma가 바인딩 처리)
    await prisma.$executeRaw`
      INSERT INTO "Place" ("name", "type", "address", "location", "createdAt", "updatedAt")
      VALUES (
        ${p.name},
        ${PlaceType.FACILITY}::"PlaceType",
        ${'대전 유사 주소'},
        ST_SetSRID(ST_MakePoint(${p.lng}, ${p.lat}), 4326)::geography,
        now(),
        now()
      );
    `;
    console.log(`Inserted POI ${i + 1}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
