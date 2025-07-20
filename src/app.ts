import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome the ph-tour-management."})
})
app.use((req: Request, res: Response) => {
    res.status(404).json({message: "No route found!"})
})


// app.use((err, req: Request, res: Response, next: NextFunction) => {

// })

export default app;