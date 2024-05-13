import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  intrestStart: number = 1;
  additionFactor: number = 0.25;
  maxIntrest: number = 3;

  // Field values
  additionalInterst: number = 1;
  prinicipalAmount: number = 100000;
  numberOfMonths: number = 3;
  segmentValue: string = "intrest";

  tableData: IntrestTable[] = [];
  intrestTable: IntrestTable[] = [];
  compoundIntrestTable: IntrestTable[] = [];

  OnValueEntred(){
    this.intrestTable = [];
    this.compoundIntrestTable = [];
    do{
      let roi = (this.intrestStart / 100);
      //roi = Math.trunc(roi / 0.01) * 0.01;
      this.CalculateIntrest(roi);
      this.CalculateCompoundIntrest(roi);
      this.intrestStart += this.additionFactor;
    } while(this.intrestStart <= this.maxIntrest);
    this.OnSegmentChanged();
    this.intrestStart = 1;
  }

  CalculateIntrest(roi: number){
    // Add formula
    /* PTR/100 */
    let intrest = (this.prinicipalAmount*this.numberOfMonths*roi);
    let totAmount = (this.prinicipalAmount + intrest).toFixed(2) as unknown as number;
    let iObj = new IntrestTable((roi*100).toFixed(2) as unknown as number, intrest.toFixed(2) as unknown as number, totAmount);
    this.intrestTable.push(iObj);
  }

  CalculateCompoundIntrest(roi: number){
    // Add formula for compund intrests
    /* P((1+(r/n))^(nt) -1) */
    let compoundIntrest = (this.prinicipalAmount * Math.pow(1+(roi), (this.numberOfMonths))) - this.prinicipalAmount;
    let totAmount = (this.prinicipalAmount + compoundIntrest).toFixed(2) as unknown as number;
    let ciObj = new IntrestTable((roi*100).toFixed(2) as unknown as number, compoundIntrest.toFixed(2) as unknown as number, totAmount);
    this.compoundIntrestTable.push(ciObj);
  }

  OnSegmentChanged(){
    switch(this.segmentValue){
      case "intrest":
        this.tableData = this.intrestTable;
        break;
      case "compound_intrest":
        this.tableData = this.compoundIntrestTable;
        break;
    }
  }
}

export class IntrestTable{
  intrestRate: number;
  intrestAmount: number;
  totalAmount: number;

  /**
   *
   */
  constructor(ir: number, intrest: number, totalAmount: number) {
    this.intrestRate = ir;
    this.intrestAmount = intrest;
    this.totalAmount = totalAmount;
  }
}
