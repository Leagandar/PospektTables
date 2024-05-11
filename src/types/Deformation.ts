import type { PaginationInfo } from "./Pagination";
import type { BaseResponse } from "./global";

interface Deformation {
    time: string;
    objectId: string;
    sensorType: string;
    status: boolean;
    data: {
        value: number;
        isValid: boolean;
        delta?: number;
    };
    state: string;
    criticalDelta: number;
}

interface DeformationResponse extends BaseResponse, PaginationInfo {
    data: Deformation[];
}

interface DeformationTrend {
    objectId: string;
    points: Record<string, number>;
    startDate: string;
    endDate: string;
    criticalEndDate?: string;
}

interface DeformationTrendResponse extends BaseResponse {
    data: DeformationTrend;
}

export type { Deformation, DeformationTrend, DeformationResponse, DeformationTrendResponse }