import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
}
export {};
