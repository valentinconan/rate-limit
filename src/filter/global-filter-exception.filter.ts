import {Catch, ExceptionFilter, ExecutionContext, Logger} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

    private logger = new Logger(GlobalExceptionFilter.name)

    catch(exception: any, host: ExecutionContext) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        // Log the error (optional)
        this.logger.error(exception.message);

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