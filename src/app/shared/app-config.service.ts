import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  private config!: Config;
  constructor(private http: HttpClient) {}

  async load() {
    const sub$ = this.http.get<Config>("/assets/config.json");
    this.config = await firstValueFrom<Config>(sub$);
  }

  getConfig(): Config {
    return this.config;
  }
}

export type Config = {
  albumUrl: string;
};
