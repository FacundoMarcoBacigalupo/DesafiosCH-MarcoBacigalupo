export const config = {
    server:{
        port:8080,
        secretSession:"claveSuperSecreta"
    },
    mongo:{
        url:"mongodb+srv://Facundo:Metalero120@cluster0.lxndxty.mongodb.net/bcryptDB?retryWrites=true&w=majority"
    },
    github:{
        clientID: "Iv1.4fcd41fa39808e5d",
        clienteSecret: "9faabfee560dc731420811af289bf098dde5569f",
        callbackUrl: "http://localhost:8080/api/sessions/github-callback"
    }
}