let postsInfoDb = [
    {
        id: "1",
        username: "propsUser",
        data: "22/01/2024",
        texto: "esse é o primeiro texto personalizado do app",
        likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
        repostado: false,
        comentariosArray: [
            {
                id: "1.1",
                username: "propsUser",
                data: "22/01/2024",
                texto: "comentario numero 1",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: false,
            },
            {
                id: "1.2",
                username: "infinity",
                data: "22/01/2024",
                texto: "comentario numero 2",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: true,
            }
        ]
    },

    {
        id: "2",
        username: "segundo323",
        data: "10/01/2024",
        texto: "esse é o segundo texto personalizado do app",
        likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
        repostado: false,
        curtido: false,
        comentariosArray: []
    },
    {
        id: "3",
        username: "User033",
        data: "10/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos inventore, cum in doloribus eveniet! Autem, adipisci.",
        likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
        repostado: false,
        curtido: false,
        comentariosArray: []
    },

    {
        id: "4",
        username: "Diego_Alc",
        data: "16/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
        repostado: true,
        curtido: true,
        comentariosArray: [
            {
                id: "4.1",
                username: "infinity",
                data: "22/01/2024",
                texto: "esse só 1",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: true,
            }
        ]
    },
    {
        id: "5",
        username: "infinity",
        data: "12/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos.",
        likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
        repostado: false,
        curtido: false,
        comentariosArray: [
            {
                id: "5.1",
                username: "propsUser",
                data: "22/01/2024",
                texto: "comentario numero 1",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: false,
            },
            {
                id: "5.2",
                username: "infinity",
                data: "22/01/2024",
                texto: "comentario numero 2",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: true,
            }
        ]
    },
    {
        id: "6",
        username: "infinity",
        data: "12/01/2024",
        texto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ullam ut ex quasi nulla aliquid quo culpa, magnam sapiente soluta atque minima quos.",
        likes: ["propsUser", "infinity","segundo323"],
        repostado: false,
        curtido: false,
        comentariosArray: []
    },

    {
        id: "7",
        username: "Diego_Alc",
        data: "26/01/2024",
        texto: "Agora tudo aparece no perfil certinho",
        likes: ["propsUser", "infinity", "Diego_Alc","segundo323"],
        repostado: false,
        curtido: true,
        comentariosArray: [
            {
                id: "7.1",
                username: "exemploAccount",
                data: "22/01/2024",
                texto: "comentario numero 1",
                likes: ["infinity", "Diego_Alc","segundo323", "User033"],
                curtido: false,
            },
        ]
    },
    {
        id: "8",
        username: "Diego_Alc",
        data: "26/01/2024",
        texto: "Carregar os posts por username da menos problema q por id",
        likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
        repostado: true,
        curtido: false,
        comentariosArray: [
            {
                id: "8.1",
                username: "propsUser",
                data: "22/01/2024",
                texto: "comentario numero 1",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: false,
            },
            {
                id: "8.2",
                username: "infinity",
                data: "22/01/2024",
                texto: "comentario numero 2",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: true,
            },
            {
                id: "8.3",
                username: "Diego_Alc",
                data: "20/01/2024",
                texto: "esse tem até 3",
                likes: ["propsUser", "infinity", "Diego_Alc","segundo323", "User033"],
                curtido: false,
            }
        ]
    }
];


let userInfoDb = [
    {
        username: "exemploAccount",
        email: "exemploAccount",
        seguidores: [],
        seguindo: [],
        recado: "Personalizado",
        cadastro: "01/02/2024",
    },
    {
        username: "Diego_Alc",
        email: "Diego_Alc",
        seguidores: [],
        seguindo: [],
        recado: "Primeiro recado",
        cadastro: "01/01/2024",
    },
    {
        username: "propsUser",
        email: "propsUser",
        seguidores: [],
        seguindo: [],
        recado: "Recado de teste",
        cadastro: "09/01/2024",
    },
    {
        username: "infinity",
        email: "infinity",
        seguidores: [],
        seguindo: [],
        recado: "infinity stones",
        cadastro: "10/01/2024",
    },
    {
        username: "User033",
        email: "User033",
        seguidores: [],
        seguindo: [],
        recado: "mensagem do user",
        cadastro: "04/01/2024",
    },
    {
        username: "segundo323",
        email: "segundo323",
        seguidores: [],
        seguindo: [],
        recado: "Recado do segundo",
        cadastro: "17/01/2024",
    }

]

let donoPerfil = userInfoDb[5]

export { postsInfoDb, userInfoDb, donoPerfil };