declare module 'nativescript-lan-scan' {

    import { View } from "ui/core/view";
    import { Observable, EventData } from "data/observable";
    import * as dependencyObservable from 'ui/core/dependency-observable';

    export class LanScan extends Observable {
        public static foundNewDeviceEvent: string;
        public static foundNewAddressEvent: string;
        public static scanningFinishedEvent: string;
        public static scanningFailedEvent: string;
        public static progressPingedEvent: string;

        public ios: any;

        public start(): void;
    }

    export class Address {
        ip: string;
        macAddress: string;
        hostName: string;
    }

    export interface AddressEventData extends EventData {
        address: Address;
    }

    export class PingProgress {
        pingedHosts: number;
        overallHosts: number;
    }

    export interface PingProgressEventData extends EventData {
        pingProgress: PingProgress
    }

    export interface StatusEventData extends EventData {
        status: string;
    }

    export class DeviceInfo {
        ipAddress: string;
        macAddress: string;
        hostName: string;
    }

    export interface FoundDeviceEventData extends EventData {
        deviceInfo: DeviceInfo;
    }

}