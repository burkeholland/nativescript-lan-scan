import * as definition from 'lanscan';
export declare abstract class LanScan implements definition.LanScan {
    lanScanner: any;
    abstract start(): void;
    abstract pingAddress(): void;
    abstract: any;
}
