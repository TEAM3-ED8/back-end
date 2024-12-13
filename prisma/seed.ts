import { PrismaClient } from "@prisma/client"
import { SEED_DATA } from "./seed-data"

const prisma = new PrismaClient()

async function cleanDatabase() {
  try {
    await prisma.$transaction([
      prisma.positions.deleteMany(),
      prisma.skills.deleteMany(),
      prisma.cookie.deleteMany(),
      prisma.santaCalories.deleteMany(),
      prisma.members.deleteMany(),
      prisma.reindeerOrganizations.deleteMany(),
      prisma.reindeers.deleteMany(),
      prisma.addresses.deleteMany(),
      prisma.elves.deleteMany()
    ])
    console.log("✅ Base de datos limpiada exitosamente")
  } catch (error) {
    console.error("❌ Error limpiando base de datos:", error)
    throw error
  }
}

async function seedSantaAndElves() {
  try {
    await prisma.$transaction([
      prisma.santaCalories.create({ data: SEED_DATA.santa }),
      prisma.elves.createMany({ data: SEED_DATA.elves }),
      prisma.addresses.createMany({ data: SEED_DATA.addresses })
    ])
    console.log("✅ Santa y elfos creados exitosamente")
  } catch (error) {
    console.error("❌ Error creando Santa y elfos:", error)
    throw error
  }
}

async function seedReindeersAndOrganizations() {
  try {
    const reindeer = await prisma.reindeers.create({
      data: {
        ...SEED_DATA.reindeers,
        skills: { create: SEED_DATA.reindeers.skills }
      }
    })

    await prisma.reindeerOrganizations.create({
      data: {
        ...SEED_DATA.reindeerOrganizations,
        positions: {
          create: [{ position: 1, reindeerId: reindeer.id }]
        }
      }
    })
    console.log("✅ Renos y organizaciones creados exitosamente")
  } catch (error) {
    console.error("❌ Error creando renos y organizaciones:", error)
    throw error
  }
}

async function seedMembers() {
  try {
    await prisma.members.createMany({ data: SEED_DATA.members })
    console.log("✅ Miembros creados exitosamente")
  } catch (error) {
    console.error("❌ Error creando miembros:", error)
    throw error
  }
}

async function main() {
  console.log("🌱 Iniciando proceso de seeding...")
  
  try {
    await cleanDatabase()
    await seedSantaAndElves()
    await seedReindeersAndOrganizations()
    await seedMembers()
    
    console.log("✨ Proceso de seeding completado exitosamente")
  } catch (error) {
    console.error("💥 Error durante el proceso de seeding:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })