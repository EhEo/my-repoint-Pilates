export type ApiConfig = {
    baseUrl: string;
};
export declare const apiConfig: ApiConfig;
export declare function apiGet<T>(path: string): Promise<T>;
export declare function apiPost<T>(path: string, body: unknown): Promise<T>;
