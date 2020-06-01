
export class slaDTO{
    zmSlaDTO :[{
                    id: number
                    zmRgMapId: number
                    slaRrFlag: number
                    slaDays: number
                    ratecardId: number
                }]
    safextSlaDTO :[{
                    id: number
                    safextCtgy: number
                    safextEntityId: number
                    slaRrFlag: number
                    slaDays : number
                    ratecardId: number
                }]
    zmCustomSlaDTO :[{
                    id: number
                    lkpSrcTypeId : number
                    lkpDestTypeId: number
                    srcId: string
                    destId: string
                    slaRrFlag: number
                    slaDays : number
                    ratecardId: number
                }]
    safextCustomSlaDTO :[{
                    id: number
                    safextCtgy: number
                    slaRrFlag: number
                    slaDays : number
                    ratecardId: number
                    safextSrcId: string
                    safextDestId: string
                 }]
}