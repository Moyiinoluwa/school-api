import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
        constructor (configService: ConfigService, private readonly authService: AuthService)  {
            super({
                jwtFromRequest: ExtractJwt.
            })
        }
    }