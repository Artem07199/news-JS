export enum HttpStatusCode {
    Unauthorized = 401,
    NotFound = 404,
}

export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface SourceItem {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface NewsArticle {
    source: Pick<SourceItem, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: ReadonlyArray<SourceItem>;
}

export interface NewsResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: ReadonlyArray<NewsArticle>;
}

export type ResponseCallback<T> = (data: T) => void;

export type RequestParams = Record<string, string | number | undefined>;

export interface RequestOptions {
    endpoint: ApiEndpoint | string;
    options?: RequestParams;
}

export type HttpMethod = 'GET' | 'POST';