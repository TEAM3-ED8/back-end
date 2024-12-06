export const SEED_DATA = {
  santa: {
    id: 1,
    totalCookies: 0,
    totalConsumed: 0,
    totalCalories: 0
  },
  elves: [
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
  ],
  addresses: [
    {
      lat: "8.9714493",
      lng: "-79.5341802",
      display_name: "Panama City, Calidonia, Distrito de Panamá, Panamá Province, 0843, Panama"
    },
    {
      lat: "12.6090157",
      lng: "-85.2936911",
      display_name: "Nicaragua"
    }
  ],
  reindeers: {
    name: "Rudolph",
    type: "Master",
    skills: [
      {
        skill: "Flying",
        value: 100
      },
      {
        skill: "Navigation",
        value: 95
      }
    ]
  },
  reindeerOrganizations: {
    name: "A-Team",
    isSelected: true,
    isAvailable: true
  },
  childrens: [
    {
      "id": 1,
      "name": "Ryan",
      "behavior": "Kind",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 2,
      "name": "Gabriel",
      "behavior": "Kind",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 3,
      "name": "Nicholas",
      "behavior": "Curious",
      "levelBehavior": "Bad",
      "gift": true
    },
    {
      "id": 4,
      "name": "Noel",
      "behavior": "Kind",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 5,
      "name": "Joseph",
      "behavior": "Respectful",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 6,
      "name": "Roberto",
      "behavior": "Helpful",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 7,
      "name": "Emmanuel",
      "behavior": "Kind",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 8,
      "name": "Rudolph",
      "behavior": "Curious",
      "levelBehavior": "Bad",
      "gift": false
    },
    {
      "id": 9,
      "name": "Raydberg",
      "behavior": "Respectful",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 10,
      "name": "Balthazar",
      "behavior": "Helpful",
      "levelBehavior": "Bad",
      "gift": false
    },
    {
      "id": 11,
      "name": "Jesus",
      "behavior": "Respectful",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 12,
      "name": "Angel",
      "behavior": "Helpful",
      "levelBehavior": "Good",
      "gift": true
    },
    {
      "id": 13,
      "name": "Christopher",
      "behavior": "Curious",
      "levelBehavior": "Bad",
      "gift": false
    },
    {
      "id": 14,
      "name": "Maximus",
      "behavior": "Kind",
      "levelBehavior": "Regular",
      "gift": true
    },
    {
      "id": 15,
      "name": "Maxwell",
      "behavior": "Helpful",
      "levelBehavior": "Regular",
      "gift": false
    },
    {
      "id": 16,
      "name": "Pedro",
      "behavior": "Kind",
      "levelBehavior": "Regular",
      "gift": true
    },
    {
      "id": 17,
      "name": "Holly",
      "behavior": "Lazy",
      "levelBehavior": "Regular",
      "gift": false
    },
    {
      "id": 18,
      "name": "Winter",
      "behavior": "Respectful",
      "levelBehavior": "Regular",
      "gift": true,
    },
    {
      "id": 19,
      "name": "Clement",
      "behavior": "Helpful",
      "levelBehavior": "Regular",
      "gift": true
    },
    {
      "id": 20,
      "name": "Joy",
      "behavior": "Lazy",
      "levelBehavior": "Good",
      "gift": false
    }
  ],
  cards: [
    {
      "id": 1,
      "content": "Merry Christmas, Santa! I hope you and the reindeer are doing well. This year, I've tried my best to be good. I would love a new bike with cool colors and a basket, so I can ride around the neighborhood with my friends.",
      "create_at": "2024-11-24T19:43:52.781Z",
      "children_id": 1,
      "isRead": false

    },
    {
      "id": 2,
      "content": "Hola Santa, espero que estés muy bien y que los renos estén felices. Este año me gustaría mucho una muñeca que hable y muchas galletas para compartir con mi familia. ¡Gracias por todo lo que haces!",
      "create_at": "2024-11-24T19:44:52.781Z",
      "children_id": 2,
      "isRead": false
    },
    {
      "id": 3,
      "content": "Feliz Natal, Papai Noel! Quero muito um jogo de tabuleiro divertido para jogar com meus amigos e também muitos doces para compartilhar com minha família, pois o Natal é tempo de alegria e união!",
      "create_at": "2024-11-24T19:45:52.781Z",
      "children_id": 3,
      "isRead": false
    },
    {
      "id": 4,
      "content": "Dear Santa, I have been really good this year and helped my parents a lot. Can I please have a puppy, one that is fluffy and loves to play? I promise to take care of it and share my toys too!",
      "create_at": "2024-11-24T19:46:52.781Z",
      "children_id": 4,
      "isRead": false
    },
    {
      "id": 5,
      "content": "Querido Santa, este año me porté muy bien y ayudé en casa. Me gustaría una bicicleta nueva para poder pasear con mis amigos y disfrutar del aire libre. ¡Espero que tengas un buen viaje repartiendo regalos!",
      "create_at": "2024-11-24T19:47:52.781Z",
      "children_id": 5,
      "isRead": false
    },
    {
      "id": 6,
      "content": "Merry Christmas! I hope you like the cookies we left for you. This year, I’ve been really good and I would love a new game console to play with my friends. Thank you for bringing joy every year!",
      "create_at": "2024-11-24T19:48:52.781Z",
      "children_id": 6,
      "isRead": false
    },
    {
      "id": 7,
      "content": "Hola Papá Noel, quiero un robot de juguete que pueda hablar y moverse. También quiero muchas sorpresas para compartir con mis amigos. Gracias por hacer que la Navidad sea tan especial para todos nosotros.",
      "create_at": "2024-11-24T19:49:52.781Z",
      "children_id": 7,
      "isRead": false
    },
    {
      "id": 8,
      "content": "Feliz Natal, Santa! Quero um ursinho de pelúcia bem grande para abraçar e me sentir seguro. Também desejo muitos chocolates e doces que posso compartilhar com minha família durante a ceia de Natal.",
      "create_at": "2024-11-24T19:50:52.781Z",
      "children_id": 8,
      "isRead": false
    },
    {
      "id": 9,
      "content": "Dear Santa, I wish for a telescope so I can see the stars and planets at night. I promise to take good care of it and share what I learn in school with my friends. Thank you for all the magic you bring!",
      "create_at": "2024-11-24T19:51:52.781Z",
      "children_id": 9,
      "isRead": false
    },
    {
      "id": 10,
      "content": "Querido Santa, me gustaría recibir un libro de cuentos que pueda leer cada noche antes de dormir. Así podré soñar con aventuras mágicas. Gracias por ser tan generoso y hacer feliz a cada niño en el mundo.",
      "create_at": "2024-11-24T19:52:52.781Z",
      "children_id": 10,
      "isRead": false
    },
    {
      "id": 11,
      "content": "Merry Christmas, Santa! Can I get a new game console? I would love to play with my friends and have fun together. I promise to keep my room clean and help around the house more this year!",
      "create_at": "2024-11-24T19:53:52.781Z",
      "children_id": 11,
      "isRead": false
    },
    {
      "id": 12,
      "content": "Hola Santa, quiero un set de arte con muchos colores y pinceles. Me encanta dibujar y quiero hacer hermosas obras para mi familia. ¡Espero que podamos compartir momentos creativos y divertidos esta Navidad!",
      "create_at": "2024-11-24T19:54:52.781Z",
      "children_id": 12,
      "isRead": false
    },
    {
      "id": 13,
      "content": "Feliz Natal, Papai Noel! Desejo um kit de ciência para experimentar em casa e aprender sobre o mundo. Quero fazer experiências legais e mostrar aos meus amigos como é divertido aprender e descobrir!",
      "create_at": "2024-11-24T19:55:52.781Z",
      "children_id": 13,
      "isRead": false
    },
    {
      "id": 14,
      "content": "Dear Santa, I want a magic set to perform tricks for my family and friends! I promise to practice a lot and make everyone smile. Thank you for bringing happiness and joy to every Christmas season!",
      "create_at": "2024-11-24T19:56:52.781Z",
      "children_id": 14,
      "isRead": false
    },
    {
      "id": 15,
      "content": "Querido Santa, me encantaría recibir una guitarra para aprender a tocar música. La música hace que la vida sea más alegre y me gustaría compartirla con todos mis amigos y familiares. ¡Gracias por todo!",
      "create_at": "2024-11-24T19:57:52.781Z",
      "children_id": 15,
      "isRead": false
    },
    {
      "id": 16,
      "content": "Merry Christmas! I hope you bring lots of toys for all the kids. I also wish for a fun adventure book to read during the winter break. Thank you for spreading joy and happiness every year!",
      "create_at": "2024-11-24T19:58:52.781Z",
      "children_id": 16,
      "isRead": false
    },
    {
      "id": 17,
      "content": "Hola Papá Noel, quiero ver a los elfos en tu taller y aprender a hacer juguetes. Me gustaría ayudar a hacer sonreír a otros niños en Navidad. Espero que tengas un viaje seguro y mágico este año.",
      "create_at": "2024-11-24T19:59:52.781Z",
      "children_id": 17,
      "isRead": false
    },
    {
      "id": 18,
      "content": "Feliz Natal, Santa! Quero uma bicicleta rosa que eu possa usar para passear no parque. Espero que traga muitas alegrias e momentos felizes para mim e para meus amigos neste Natal!",
      "create_at": "2024-11-24T20:00:52.781Z",
      "children_id": 18,
      "isRead": false
    },
    {
      "id": 19,
      "content": "Dear Santa, thank you for last year's gifts. I hope you can visit again this year! I would love to have some new board games to play with my family during the holidays. You make Christmas so special!",
      "create_at": "2024-11-24T20:01:52.781Z",
      "children_id": 19,
      "isRead": false
    },
    {
      "id": 20,
      "content": "Querido Santa, me gustaría que todos los niños del mundo sean felices y tengan regalos en Navidad. Espero que sigas trayendo alegría a todos y que tú también tengas un hermoso viaje repartiendo amor.",
      "create_at": "2024-11-24T20:02:52.781Z",
      "children_id": 20,
      "isRead": false
    }
  ],
  members: [
    {
      name: "Roberto Vargas",
      image: "https://media.licdn.com/dms/image/v2/C4E03AQEPjro6DWwS_g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1552840536368?e=1738800000&v=beta&t=3TuWHJFoc5tEtXmIq2P76y54hcXDLMYbn3FQc_i-xxU",
      role: "Backend Developer",
      message: "I wish you all a Merry Christmas and a Happy New Year! Hoping this page brings you joy and festive cheer.",
      github: "https://github.com/RVSolutionsplus507",
      linkedin: "https://www.linkedin.com/in/roberto-j-vargas-d-69631159/"
    },
    {
      name: "Pedro",
      image: "https://avatars.githubusercontent.com/u/91698863?v=4",
      role: "Backend Developer",
      message: "May the magic of Christmas fill your home with love and gratitude and give you a year full of success and happiness. Happy holidays!",
      github: "https://github.com/puriihuaman",
      linkedin: "https://www.linkedin.com/in/puriihuaman/"
    },
    {
      name: "Máximo",
      image: "https://github.com/maximoev.png",
      role: "Frontend Developer",
      message: "Merry Christmas! Wishing you joy, peace, and love this holiday season.",
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
      message: "Merry Christmas! May your days be filled with joy, your home with love, and your heart with peace this holiday season.",
      github: "https://github.com/Raydberg",
      linkedin: "https://www.linkedin.com/in/raydbergchuquival"
    }
  ]
}