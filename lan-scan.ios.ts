import { LanScan as LanScanCommon, Address, PingProgress } from './lan-scan.common';

class LanScanDelegateImpl extends NSObject implements MMLANScannerDelegate {
    public static ObjCProtocols = [MMLANScannerDelegate];

    public _owner: WeakRef<LanScan>;

    public static initWithOwner(owner: WeakRef<LanScan>): LanScanDelegateImpl {
        let handler = <LanScanDelegateImpl>LanScanDelegateImpl.new();
        handler._owner = owner;
        return handler;
    }

    public lanScanDidFindNewDevice(device: any) {
        // let owner = this._owner.get();
        // if (owner) {
        //     owner.notifyFoundNewDeviceEvent(device);
        // }
        console.log(`New Device Owner: ${this._owner}`);
    }

    public lanScanDidFinishScanning(status: any) {
        // let owner = this._owner.get();
        // if (owner) {
        //     owner.notifyScanningFinishedEvent(status);
        // }
        console.log(`Finish Scanning Owner: ${this._owner}`);
    }

    public lanScanDidFailedToScan() {
        // let owner = this._owner.get();
        // if (owner) {
        //     owner.notifyScanningFailedEvent(LanScanCommon.scanningFailedEvent);
        // }
        console.log(`Failed Owner: ${this._owner }`);
    }

    public lanScanDidFindNewAddressWithIPMACAddressAndHostname(ip: string, macAddress:string, hostName: string) {
        // let owner = this._owner.get();
        // if (owner) {
        //     let address: Address = { ip, macAddress, hostName };
        //     owner.notifyFoundNewAddressEvent(LanScanCommon.foundNewAddressEvent, address);
        // }
        console.log(`New Address Owner: ${this._owner}`);
    }

    public lanScanProgressPingedFrom(pingedHosts: number, overallHosts: number) {
        // let owner = this._owner.get();
        // if (owner) {
        //     console.log('pinged!');
        //     let pingProgress: PingProgress = { pingedHosts, overallHosts };
        //     owner.notifyProgressPingedEvent(LanScanCommon.progressPingedEvent, pingProgress);
        // }
        console.log(`Pinged Owner: ${this._owner}, pingedHosts: ${pingedHosts}, overallHosts: ${overallHosts}` );
    }
}

export class LanScan extends LanScanCommon {
    
    private _ios: MMLANScanner;
    private _delegate: NSObject;
    
    constructor() {
        super();
        
        this._delegate = LanScanDelegateImpl.initWithOwner(new WeakRef(this));
        this._ios = MMLANScanner.alloc().initWithDelegate(this._delegate);
        this._ios.delegate = this._delegate;
    }

    get ios(): MMLANScanner {
        return this._ios;
    }

    start() {
        this._ios.start();
    }

    pingAddress() {
        this._ios.pingAddress();
    }

    pingResult(PingResult: any) {
        this.pingResult(PingResult);
    }
}