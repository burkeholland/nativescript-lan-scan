# NativeScript LanScan [Beta]
(iOS Only)
## Getting started
This plugin is a wrapper around the iOS MMLanScan library:
[https://github.com/mavris/MMLanScan](https://github.com/mavris/MMLanScan)

To use this plugin in a NativeScript app:

1. Run: `tns plugin add nativescript-lan-scan`

## What does it do?
This plugin will scan a local network and return an array of all detected IP and MAC addresses. See the original [MMLanScan](https://github.com/mavris/MMLanScan) for more details.

![lan-scan-demo](https://cloud.githubusercontent.com/assets/686963/22609186/d5020ff8-ea25-11e6-8b34-7636f3b01109.gif)

## How do you use it?

Add the plugin to your NativeScript app

```
tns plugin add nativescript-lan-scan
```

Include the plugin in your application. You will need to include a few of the event classes as well if you are using TypeScript - just so TypeScript is happy. 

```
import { LanScan, FoundDeviceEventData, DeviceInfo, PingProgressEvent, PingProgress }

var lanScan = new LanScan();

// Wire up callback events from the Lan Scanner

// Fires whenever a devices is discovered
this._lanScan.on(LanScan.foundNewDeviceEvent, (args: FoundDeviceEventData) => {
    // Device info is found on the args.deviceInfo object...
    // args.deviceInfo.ipAddress
    // args.deviceInfo.macAddress
});

// Fires everytime an address on the subnet is pinged
this._lanScan.on(LanScan.progressPingedEvent, (args: PingProgressEventData) => {
    // args.pingProgress.overallHosts - total number hosts that the scanner will ping through
    // args.pingProgress.pingedHosts - current number of hosts that have been pinged
});

this._lanScan.on(LanScan.scanningFinishedEvent, (args) => {
    // Status: enum...
    // 0: Finished
    // 1: Stopped
});

// Start the Lan Scanner
lanScan.start();


// If, in the middle of the operation you want to stop the scan
lanScan.stop();

// Get the SSID
// Note that this doesn't work in the simulator,
// it will say "No Wifi Available"
let ssid = lanScan.fetchSSIDInfo();

```
