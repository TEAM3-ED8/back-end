import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function cleanDatabase() {
  await prisma.positions.deleteMany()
  await prisma.skills.deleteMany()
  await prisma.cookie.deleteMany()
  await prisma.santaCalories.deleteMany()
  await prisma.members.deleteMany()
  await prisma.reindeerOrganizations.deleteMany()
  await prisma.reindeers.deleteMany()
  await prisma.addresses.deleteMany()
  await prisma.elves.deleteMany()

  console.log("Base de datos limpiada exitosamente")
}

async function main() {
  await cleanDatabase()
  //Santa
  await prisma.santaCalories.create({
    data: {
      id: 1,
      totalCookies: 0,
      totalConsumed: 0,
      totalCalories: 0
    }
  })

  // Elves
  await prisma.elves.createMany({
    data: [
      {
        name: "Legolas",
        age: "2",
        address: "Bosque Negro",
        height: "1.85",
        email: "legolas@elfmail.com",
        isDeleted: false
      },
      {
        name: "Galadriel",
        age: "10",
        address: "Lothlórien",
        height: "1.93",
        email: "galadriel@elfmail.com",
        isDeleted: false
      },
      {
        name: "Nimue",
        age: "3",
        address: "Direccion6",
        height: "10.5",
        email: "duene6@gmail.com",
        isDeleted: true
      },
      {
        name: "Gimli",
        age: "8",
        address: "Direccion7",
        height: "15.0",
        email: "duene7@gmail.com",
        isDeleted: false
      },
      {
        name: "Aria",
        age: "2",
        address: "Direccion8",
        height: "9.0",
        email: "duene8@gmail.com",
        isDeleted: true
      }
    ]
  })

  // Addresses
  await prisma.addresses.createMany({
    data: [
      {
        lat: "8.9714493",
        lng: "-79.5341802",
        display_name:
          "Panama City, Calidonia, Distrito de Panamá, Panamá Province, 0843, Panama"
      },
      {
        lat: "12.6090157",
        lng: "-85.2936911",
        display_name: "Nicaragua"
      }
    ]
  })

  // Childrens
  //   const children = await prisma.childrens.create({
  //     data: {
  //       name: "Timmy",
  //       behavior: "Kind",
  //       levelBehavior: "Good",
  //       gift: false,
  //       cards: {
  //         create: [
  //           {
  //             content: "Querido Santa...",
  //             isRead: false
  //           }
  //         ]
  //       }
  //     }
  //   })

  //Reindeers
  const reindeer = await prisma.reindeers.create({
    data: {
      name: "Rudolph",
      type: "Flying",
      skills: {
        create: [
          {
            skill: "Flying",
            value: 100
          },
          {
            skill: "Navigation",
            value: 95
          }
        ]
      }
    }
  })

  // ReindeerOrganizations con Positions
  await prisma.reindeerOrganizations.create({
    data: {
      name: "A-Team",
      isSelected: true,
      isAvailable: true,
      positions: {
        create: [
          {
            position: 1,
            reindeerId: reindeer.id
          }
        ]
      }
    }
  })

  // Members
  await prisma.members.createMany({
    data: [
      {
        name: "Roberto Vargas",
        image:
          "https://media.licdn.com/dms/image/v2/C4E03AQEPjro6DWwS_g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1552840536368?e=1738800000&v=beta&t=3TuWHJFoc5tEtXmIq2P76y54hcXDLMYbn3FQc_i-xxU",
        role: "Backend Developer",
        message:
          "I wish you all a Merry Christmas and a Happy New Year! Hoping this page brings you joy and festive cheer.",
        github: "https://github.com/RVSolutionsplus507",
        linkedin: "https://www.linkedin.com/in/roberto-j-vargas-d-69631159/"
      },
      {
        name: "Pedro",
        image: "https://avatars.githubusercontent.com/u/91698863?v=4",
        role: "Backend Developer",
        message:
          "May the magic of Christmas fill your home with love and gratitude and give you a year full of success and happiness. Happy holidays!",
        github: "https://github.com/puriihuaman",
        linkedin: "https://www.linkedin.com/in/puriihuaman/"
      },
      {
        name: "Máximo",
        image: "https://github.com/maximoev.png",
        role: "Frontend Developer",
        message:
          "Merry Christmas! Wishing you joy, peace, and love this holiday season.",
        github: "https://github.com/maximoev",
        linkedin: "https://www.linkedin.com/in/maximoev"
      },
      {
        name: "Emmanuel Van Dick",
        image: "https://i.postimg.cc/hPdn8BMt/emma-vandick.png",
        role: "Frontend Developer",
        message: "Merry Christmas Developers",
        github: "https://github.com/emmanuel-vandyk",
        linkedin: "https://linkedin.com/in/emmanuel-vandyk/"
      },
      {
        name: "Luis Eduardo",
        image: "https://avatars.githubusercontent.com/u/110699874?v=4",
        role: "Backend Developer",
        message: "Merry Christmas to all!",
        github: "https://github.com/LUISEDOCCOR",
        linkedin: "https://www.linkedin.com/in/luiseduardoocegueda/"
      },
      {
        name: "Raydberg",
        image: "https://avatars.githubusercontent.com/u/144204205?v=4",
        role: "Backend Developer",
        message:
          "Merry Christmas! May your days be filled with joy, your home with love, and your heart with peace this holiday season.",
        github: "https://github.com/Raydberg",
        linkedin: "https://www.linkedin.com/in/raydbergchuquival"
      }
    ]
  })

  console.log("Base de datos sembrada exitosamente")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
