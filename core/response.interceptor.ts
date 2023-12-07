import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.getCustomMessage(context);

    return next.handle().pipe(
      map((data) => {
        // TODO: 数据类型为blob 需要处理
        return {
          code: 200,
          data,
          message,
        };
      }),
    );
  }

  private getCustomMessage(context: ExecutionContext): string {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const url = request.url;

    let msg = '操作成功';

    if (url?.includes('/remove')) {
      msg = '删除成功';
    }
    if (url?.includes('/update')) {
      msg = '更新成功';
    }
    if (url?.includes('/create')) {
      msg = '新建成功';
    }

    return msg;
  }
}
