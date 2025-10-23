import { NextResponse } from "next/server";

export async function GET (){
    try {
        const response  = NextResponse.json(
            {
                message:"Logout  Successful",
                status : 200,
                success : true,
            }
        )

        response.cookies.set("token" , "" , {httpOnly:true , expires:new Date(0)} )
        return response;    


    } catch (error) {
        return NextResponse.json({
          error: "Error occured while logging out ",
          status: 500,
        });
    }
}