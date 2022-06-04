import { Injectable, NestMiddleware, Res } from '@nestjs/common';
import { defaultApp } from '../auth/firebaseAdmin';
import { UserService } from '../user/user.service';

@Injectable()
export class PreuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  use(req: any, res: any, next: (error?: any) => void): any {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodeToken) => {
          req['user'] = decodeToken;
          next();
        })
        .catch((error) => {
          console.error(error);
          this.accessDenied(req.url, res);
        });
    } else {
      this.accessDenied(req.url, res);
    }
  }
  private accessDenied(url: string, @Res() response) {
    response.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
