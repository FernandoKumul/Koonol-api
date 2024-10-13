import { Request, Response } from "express";
import Action from "../models/actionModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class ActionController{
    static getActions = async (req: Request, res: Response) =>{
        try {
            const actions = await Action.find();
            res.status(200).json(ApiResponse.successResponse("Acciones encontradas", actions));
          }catch(error){
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            res.status(500).json(ApiResponse.errorResponse(errorMessage, 500))
        }
    }

    static createAction = async(req: Request, res: Response)=>{
        try{
            const {name} = req.body
            const newAction = new Action({name})
            const savedAction = await newAction.save()
            res.status(201).json(ApiResponse.successResponse('Acción creada con éxito', savedAction))
        }catch(error){
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            res.status(400).json(ApiResponse.errorResponse(errorMessage));
      }
    }
}