declare module RootObject {

     interface a {
        mainBrunch: string;
        secondaryBrunch: string;
        productType: string;
        insuranceCompany: string;
        premia: string;
        premiaType: string;
        policyNumber: string;
        programType: string;
        insuranceStartDate: number;
        insuranceEndDate: number;
    }

     interface z {
        mainBrunch: string;
        secondaryBrunch: string;
        productType: string;
        insuranceCompany: string;
        premia: string;
        premiaType: string;
        policyNumber: string;
        programType: string;
        insuranceStartDate: number;
        insuranceEndDate: number;
    }

     interface HbJson {
        b: a[];
        x: z[];
        fileDate: string;
    }
    
    export class RootObject {
        status: string;
        errmsg: string;
        hbJson: HbJson;
    }

}

