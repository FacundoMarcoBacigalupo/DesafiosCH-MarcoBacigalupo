import { Router } from "express";
import { addLogger } from "../helpers/logger.js";


const router = Router();
const logger = addLogger();


router.get("/", (req, res) =>{
    logger.verbose("Mesj level verbose")
    logger.http("Msj level http")
    logger.info("Msj level info")
    logger.warn("Mesj level warn")
    logger.error("Msj level error")

    res.send("request received")
});



export { router as loggerTestRouter };