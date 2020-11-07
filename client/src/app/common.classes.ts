export class FilterParams {

    CustId: string 
    CustName: string
    Type: number | string = ''
    From: string
    To: string
    IncludeDeleted: boolean

    constructor(){}
}