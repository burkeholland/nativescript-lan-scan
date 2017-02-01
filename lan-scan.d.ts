declare module 'nativescript-lan-scan' {

    import { View } from "ui/core/view";
    import { EventData } from "data/observable";
    import * as dependencyObservable from 'ui/core/dependency-observable';

    export class LanScan extends View {
        public static foundNewDeviceEvent: string;
        public static foundNewAddressEvent: string;
        public static scanningFinishedEvent: string;
        public static scanningFailedEvent: string;
        public static progressPingedEvent: string;

        public ios: any;


    }

    export class Address {
        ip: string;
        macAddress: string;
        hostName: string;
    }

    export interface AddressEventData extends EventData {
        address: Address;
    }
}