import type { PaginationInfo } from "./Pagination";
import type { BaseResponse } from "./global";

interface TermoValue {
    value: number;
    isValid: boolean;
}

interface TermoData {
    time: string;
    objectId: string;
    sensorType: string;
    status: boolean;
    data: { [depth: string]: TermoValue | undefined; };
    state: string;
    criticalTemperature: number;
    minDepth: number;
    maxDepth: number;
    averageTemperature: number;
}

interface TermoDataResponse extends BaseResponse, PaginationInfo {
    data: TermoData[];
}

interface TermoTrend {
    points: Record<string, number>;
    startDate: string;
    criticalEndDate?: string;
}

interface TermoTrendResponse extends BaseResponse {
    data: TermoTrend;
}


export type { TermoData, TermoTrend, TermoDataResponse, TermoTrendResponse }