let postsInfo = [
    {
        id: 1,
        username: "propsUser",
        data: "22/01/2024",
        texto: "esse é o primeiro texto personalizado do app",
        reposts: 7,
        comentarios: 3,
        likes: 45,
        repostado: false,
        curtido: true
    },

    {
        id: 2,
        username: "segundo323",
        data: "10/01/2024",
        texto: "esse é o segundo texto personalizado do app",
        reposts: 2,
        comentarios: 9,
        likes: 14,
        repostado: false,
        curtido: false
    },
    {
        id: 3,
        username: "User033",
        data: "10/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos inventore, cum in doloribus eveniet! Autem, adipisci.",
        reposts: 5,
        comentarios: 11,
        likes: 90,
        repostado: false,
        curtido: false
    },

    {
        id: 4,
        username: "Diego_Alc",
        data: "16/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        reposts: 1,
        comentarios: 17,
        likes: 126,
        repostado: true,
        curtido: true
    },
    {
        id: 5,
        username: "infinity",
        data: "12/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos.",
        reposts: 1,
        comentarios: 13,
        likes: 11,
        repostado: false,
        curtido: false
    },
    {
        id: 6,
        username: "infinity",
        data: "12/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos.",
        reposts: 1,
        comentarios: 13,
        likes: 11,
        repostado: false,
        curtido: false
    },

    {
        id: 7,
        username: "Diego_Alc",
        data: "26/01/2024",
        texto: "Agora tudo aparece no perfil certinho",
        reposts: 9,
        comentarios: 29,
        likes: 203,
        repostado: false,
        curtido: true
    },
    {
        id: 8,
        username: "Diego_Alc",
        data: "26/01/2024",
        texto: "Carregar os posts por username da menos problema q por id",
        reposts: 2,
        comentarios: 12,
        likes: 93,
        repostado: true,
        curtido: false
    }
];


let userInfoDb = [
    {
        username: "Você",
        seguidores: 94,
        seguindo: 11,
        sigo: true,
        recado: "Personalizado",
        cadastro: "01/02/2024",
        idPostsCriados: []
    },
    {
        username: "Diego_Alc",
        seguidores: 50,
        seguindo: 2,
        sigo: true,
        recado: "Primeiro recado",
        cadastro: "01/01/2024",
        idPostsCriados: [4, 7]
    },
    {
        username: "propsUser",
        seguidores: 20,
        seguindo: 5,
        sigo: false,
        recado: "Recado de teste",
        cadastro: "09/01/2024",
        idPostsCriados: [1]
    },
    {
        username: "infinity",
        seguidores: 20,
        seguindo: 5,
        sigo: true,
        recado: "infinity stones",
        cadastro: "10/01/2024",
        idPostsCriados: [5, 6]
    },
    {
        username: "User033",
        seguidores: 20,
        seguindo: 5,
        sigo: false,
        recado: "mensagem do user",
        cadastro: "04/01/2024",
        idPostsCriados: [3]
    },
    {
        username: "segundo323",
        seguidores: 20,
        seguindo: 5,
        sigo: false,
        recado: "Recado do segundo",
        cadastro: "17/01/2024",
        idPostsCriados: [2]
    }

]

let donoPerfil = userInfoDb[0]

export { postsInfo, userInfoDb, donoPerfil };