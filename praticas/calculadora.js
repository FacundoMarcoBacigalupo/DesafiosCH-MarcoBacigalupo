const suma = (num1, sumador) =>{
    return new Promise((resolve, reject) =>{
        if(num1 && sumador === 0){
            reject("Operacion innecesaria")
        }
        else if(num1 && sumador === -1){
            reject("Operacion erronea")
        }
        else{
            resolve(num1 + sumador)
        }
    })
}


const restar = (num1, restador) =>{
    return new Promise((resolve, reject) => {
        if(num1 && restador === 0){
            reject("Operacion invalida")
        }
        else if(num1 && restador === -1){
            reject("Introduzca valores positivos")
        }
        else{
            resolve(num1 - restador)
        }
    })
}


const multiplicar = (num1, multiplicador) =>{
    return new Promise((resolve, reject) => {
        if(num1 && multiplicador === -1){
            reject("Introduzca valores positivos")
        }
        else{
            resolve(num1 * multiplicador)
        }
    })
}


const dividir = (dividiendo, divisor) =>{
    return new Promise((resolve, reject) => {
        if(divisor === 0){
            reject("No se puede dividir entre cero(0)")
        }
        else{
            resolve(dividiendo / divisor)
        }
    })
}




const calculos = async() =>{
    try{
        let resultadoSuma = await suma(10,20)
        console.log("Suma:",resultadoSuma)

        let resultadoResta = await restar(10,5)
        console.log("Resta:",resultadoResta)

        let resultadoMultiplicar = await multiplicar(5,2)
        console.log("Multiplicación:",resultadoMultiplicar)

        let resultadoDividir = await dividir(4,2)
        console.log("Divición:",resultadoDividir)
    }

    catch(error){
        console.log(error)
    }
}
calculos()