import { parse } from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filepath: string) {
        const config = parse(fs.readFileSync(filepath));
        this.envConfig = { ...config };
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    isEnv(env: string): boolean {
        return this.envConfig.APP_ENV === env;
    }
}