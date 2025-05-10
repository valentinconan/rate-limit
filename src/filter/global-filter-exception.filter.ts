import {Catch, ExceptionFilter, ExecutionContext} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ExecutionContext) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        // Log the error (optional)
        console.error(exception.message);

        // Return an HTTP error response
        const errorResponse = {
            statusCode: 500,
            message: 'Internal Server Error',
            error: 'Internal Server Error',
        };
        response.status(500);
        response.json(errorResponse);

        // Do not re-throw the error)
        return;
    }
}