import {Observable} from 'data/observable';
import { LanScan } from 'nativescript-lan-scan';


export class HelloWorldModel extends Observable {
  public message: string;

  constructor() {
    super();

    var lanScan = new LanScan();

    lanScan.foundNewAddress = function(args) {
        console.log("OMG");
    }

    lanScan.start();
  }
}