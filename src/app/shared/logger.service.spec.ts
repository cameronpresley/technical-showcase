import { TestBed } from "@angular/core/testing";

import { LoggerService } from "./logger.service";

describe("LoggerService", () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should log to console when message received", () => {
    spyOn(console, "log");

    service.log("Kumquats");

    expect(console.log).toHaveBeenCalledWith("Kumquats");
  });
});
