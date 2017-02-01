var LanScan = require("nativescript-lan-scan").LanScan;
var lanScan = new LanScan();

// TODO replace 'functionname' with an acual function name of your plugin class and run with 'npm test <platform>'
describe("functionname", function() {
  it("exists", function() {
    expect(lanScan.functionname).toBeDefined();
  });

  it("returns a promise", function() {
    expect(lanScan.functionname()).toEqual(jasmine.any(Promise));
  });
});