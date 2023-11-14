import chai from "chai";
import { createHash, isValidPassword } from "../src/utils.js"


const expect = chai.expect;



describe("The hash has to be effective, the result has to be different from the original password", async function(){
    const passOriginal = "test"
    const hashTest = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g
    const hash = await createHash(passOriginal)
    
    expect(hashTest.test(hash)).to.be.equal(true)
});


describe("The hasheo must be verifiable with the original password, it must return true", async function(){
    const passOriginal = "test"
    const hash = await createHash(passOriginal)

    const mockUser = {
        password: hash,
    }

    const result = await isValidPassword(mockUser, passOriginal)

    expect(result).to.be.equal(true)
});