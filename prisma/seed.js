const { PrismaClient } = require("@prisma/client");
const faker = require("@faker-js/faker").faker;

const prisma = new PrismaClient();

async function main() {
  const usedNames = new Set();

  const documents = Array.from({ length: 100 }).map(() => {
    let name;

    // Pastikan name unik
    do {
      name = faker.lorem.word();
    } while (usedNames.has(name));

    usedNames.add(name);

    return {
      name,
      type: faker.system.fileType(),
      url_file: faker.internet.url(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
  });

  await prisma.document.createMany({
    data: documents,
  });

  console.log("Seeded 100 documents.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
