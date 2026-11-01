import {
    ApiEndpoint,
    HttpMethod,
    HttpStatusCode,
    RequestOptions,
    RequestParams,
    ResponseCallback,
} from '../../types/types';

class Loader {
    private readonly baseLink: string;
    private readonly options: RequestParams;

    constructor(baseLink: string, options: RequestParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestOptions,
        callback: ResponseCallback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatusCode.Unauthorized || res.status === HttpStatusCode.NotFound) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestParams, endpoint: ApiEndpoint | string): string {
        const urlOptions: RequestParams = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: ApiEndpoint | string,
        callback: ResponseCallback<T>,
        options: RequestParams = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;