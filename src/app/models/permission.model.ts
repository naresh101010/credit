export interface Permission {
    message:string,
    data:{
        responseData:{      
                user: {
                    userId: string,
                    username: string,
                    userCategory: string,
                    defatultBranchId: number,
                    defatultBranchName: string,
                    isAdmin: boolean
                },
                menu:any
            }
        },
        status:string,
   
        errors:any 
    }

